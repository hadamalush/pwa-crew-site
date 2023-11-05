"use client";
import FormContainerBlur from "@/components/transitions/Containers/FormContainerBlur";
import Link from "next/link";
import ButtonMain from "../Button/ButtonMain";
import CheckboxFormik from "../Input/CheckboxFormik";
import InputFormik from "../Input/InputFormik";
import styles from "../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Formik, Form } from "formik";
import { registerSchema } from "@/components/Schemas/FormSchem";
import { showResult, loading } from "@/global/notification-slice";
import { useEffect } from "react";

/**
 * @description This component returns form for registration.
 * @param {String} className Enter some class as String
 * @param {Object} dict Enter object with dictionary, that object should include (trl_title,trl_email, trl_password, trl_confirmPassword, trl_terms, trl_btn, trl_error, trl_question, trl_questionLink). All of properties are type of string. For example: trl_title: "Sign up" or trl_title: "Rejestracja". Should come from internationalization directory.
 * @param {String} lang Enter lang as String. For example: 'pl' or 'en' - but should come from params.
 * @param {String} trl_error Enter dictionary of error - will be visible in notifications if an error occurs. For example: in eng: 'Something went wrong...' or in pl 'Coś poszło nie tak'. Should come from nextjs internationalization directory.
 * @returns Reuturns the whole form component. Should be wrapped with WrapperFormWithContent. However if you want you can pass this component without that wrapper.
 */

const FormikRegister = ({ className, dict, lang, trl_error, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    trl_title,
    trl_email,
    trl_password,
    trl_confirmPassword,
    trl_terms,
    trl_btn,
    trl_question,
    trl_questionLink,
  } = dict;

  const classes = `${styles["logreg-box"]} ${className}`;
  const isMediumScreen = useMediaQuery({
    query: "(min-width: 768px)",
  });

  useEffect(() => {
    if (!isMediumScreen) {
      window.scrollTo(0, 70);
    }
  }, []);

  const changeWebstiteHandler = async (event) => {
    event.preventDefault();

    const form = document.getElementById("form").classList.toggle(styles.active);

    setTimeout(() => {
      router.push("login");
    }, 500);
  };

  const onSubmit = async (values, actions) => {
    dispatch(loading(true));
    const { email, password, confirmPassword, terms } = values;
    let data;

    try {
      const response = await fetch("/api/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword, terms, lang }),
      });

      data = await response.json();

      if (!response.ok) {
        dispatch(loading(false));
        dispatch(
          showResult({
            message: data.message,
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
    }
    dispatch(loading(false));
    dispatch(
      showResult({
        message: data.message,
        variant: "success",
      })
    );

    router.push("/login");
  };

  return (
    <FormContainerBlur className={classes} id="form">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        }}
        onSubmit={onSubmit}
        validationSchema={registerSchema(lang)}
      >
        {({ isSubmitting, ...props }) => (
          <Form>
            <h1>{trl_title}</h1>

            <InputFormik name="email" placeholder={trl_email} aria-label={trl_email} type="text" />
            <InputFormik
              name="password"
              placeholder={trl_password}
              aria-label={trl_password}
              type="password"
            />
            <InputFormik
              name="confirmPassword"
              placeholder={trl_confirmPassword}
              aria-label={trl_confirmPassword}
              type="password"
            />

            <CheckboxFormik name="terms" label={trl_terms} type="checkbox" />

            <ButtonMain type="submit" animation={!isSubmitting}>
              {trl_btn}
            </ButtonMain>

            <p>
              {trl_question}
              <Link href="/login" onClick={changeWebstiteHandler}>
                {trl_questionLink}
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </FormContainerBlur>
  );
};

export default FormikRegister;
