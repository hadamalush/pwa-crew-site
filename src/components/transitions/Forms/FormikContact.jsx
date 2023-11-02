"use client";
import FormContainerBlur from "@/components/transitions/Containers/FormContainerBlur";
import ButtonMain from "../Button/ButtonMain";
import InputFormik from "../Input/InputFormik";
import TextareaFormik from "../Input/TextareaFormik";
import IconRender from "@/components/transitions/Icons/IconRender";
import styles from "../../../styles/components/transitions/Forms/FormikContact.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Formik, Form } from "formik";
import { contactSchema } from "@/components/Schemas/FormSchem";
import { showResult, loading } from "@/global/notification-slice";

/**
 * @description This component returns form for contact.
 * @param {String} className Enter some class as String
 * @param {Object} dict Enter object with dictionary, that object should include (trl_title, trl_subject, trl_email, trl_message, trl_btn, trl_error). All of properties are type of string. For example: trl_title: in eng - "Contact" or in pl -  "Kontakt". Should come from internationalization directory.
 * @param {String} lang Enter lang as String. For example: 'pl' or 'en' - but should come from params.
 * @returns Reuturns the whole form component. Should be wrapped with WrapperFormWithContent. However if you want you can pass this component without that wrapper.
 */

const FormikContact = ({ className, dict, lang, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch(showResult);

  const { trl_title, trl_email, trl_subject, trl_message, trl_btn, trl_error } = dict;

  const classes = `${styles["logreg-box"]} ${className || ""}`;
  const isMediumScreen = useMediaQuery({
    query: "(min-width: 768px)",
  });

  useEffect(() => {
    if (!isMediumScreen) {
      window.scrollTo(0, 70);
    } else if (isMediumScreen) {
      window.scrollTo(0, 0);
    }
  }, []);

  const onSubmit = async (values) => {
    dispatch(loading(true));
    const { email, title: subject, message } = values;
    let data;

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message, lang }),
      });

      data = await response.json();

      if (!response.ok) {
        dispatch(loading(false));
        dispatch(
          showResult({
            message: data.error,
            variant: "warning",
          })
        );
        return;
      }
    } catch (error) {
      dispatch(loading(false));
      dispatch(
        showResult({
          message: trl_error,
          variant: "warning",
        })
      );
      return;
    }
    dispatch(loading(false));
    dispatch(
      showResult({
        message: data.message,
        variant: "success",
      })
    );
    router.push("/");
  };

  return (
    <FormContainerBlur className={classes} id="form">
      <Formik
        initialValues={{
          email: "",
          title: "",
          message: "",
        }}
        onSubmit={onSubmit}
        validationSchema={contactSchema(lang)}
      >
        {({ isSubmitting, ...props }) => {
          return (
            <Form>
              <h1>{trl_title}</h1>
              <InputFormik
                name="email"
                placeholder={trl_email}
                aria-label={trl_email}
                type="text"
              />
              <InputFormik
                name="title"
                placeholder={trl_subject}
                aria-label={trl_subject}
                type="text"
              />
              <label htmlFor="message" className={styles["logreg-box__message"]}>
                <IconRender variant="description" />
                <p>{trl_message}:</p>
              </label>
              <TextareaFormik name="message" id="message" />
              <ButtonMain type="submit" animation={!isSubmitting}>
                {trl_btn}
              </ButtonMain>
            </Form>
          );
        }}
      </Formik>
    </FormContainerBlur>
  );
};

export default FormikContact;
