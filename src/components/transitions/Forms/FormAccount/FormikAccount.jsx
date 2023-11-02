"use client";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import ButtonMain from "../../Button/ButtonMain";
import InputFormik from "../../Input/InputFormik";
import InputFormikFile from "../../Input/InputFormikFile";
import Avatar from "../../Avatar/Avatar";
import styles from "../../../../styles/components/transitions/Forms/FormikAccount.module.scss";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { settingsSchema } from "@/components/Schemas/FormSchem";
import { showResult, loading } from "@/global/notification-slice";
import { closeModalWithAnimation } from "@/global/modal-slice";

/**
 * @description This component returns form for contact.
 * @param {String} className Enter some class as String
 * @param {Object} dict Enter object with dictionary, that object should include (trl_title, trl_subject, trl_email, trl_message, trl_btn, trl_error). All of properties are type of string. For example: trl_title: in eng - "Contact" or in pl -  "Kontakt". Should come from internationalization directory.
 * @param {String} lang Enter lang as String. For example: 'pl' or 'en' - but should come from params.
 * @returns Reuturns the whole form component. Should be wrapped with WrapperFormWithContent. However if you want you can pass this component without that wrapper.
 */

const FormikAccount = ({ className, dict, lang, ...props }) => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();
  const sessionEmail = session?.user?.email;

  const classes = `${styles.settings} ${className || ""}`;

  const {
    trl_title,
    trl_changeEmail,
    trl_changePassword,
    trl_changeAvatar,
    trl_btn_confirm,
    trl_error,
  } = dict;

  const onSubmit = async (values) => {
    dispatch(loading(true));
    const { email, password, fileImg: file } = values;
    let imgLink, data;

    if (!email && !password && !file) {
      return;
    }

    if (file) {
      try {
        const response = await fetch(`/api/upload/cloudinary?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        const data = await response.json();

        if (data.message) {
          imgLink = data.message;
        }
      } catch (error) {
        dispatch(loading(false));
        dispatch(
          showResult({
            message: "Something went wrong.",
            variant: "warning",
          })
        );
        return;
      }
    }

    try {
      const response = await fetch("/api/editSettings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, imgLink, lang }),
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

    if (email || imgLink) {
      const newSession = {
        ...session,
        user: {
          ...session?.user,
          ...(email && { email: email }),
          ...(imgLink && { picture: imgLink }),
        },
      };

      try {
        await update(newSession);
      } catch (err) {
        console.log(err);
      }
    }

    dispatch(loading(false));
    dispatch(
      showResult({
        message: data.message,
        variant: "success",
      })
    );

    closeModalWithAnimation(dispatch);
  };

  return (
    <FormContainerBlur className={classes} id="form">
      <Formik
        initialValues={{
          email: "",
          password: "",
          fileImg: "",
        }}
        onSubmit={onSubmit}
        validationSchema={settingsSchema(lang)}
      >
        {({ isSubmitting, setFieldTouched, setFieldValue, ...props }) => {
          return (
            <Form>
              <h1>{trl_title}</h1>
              <div className={styles.settings__user}>
                <Avatar className={styles.settings__avatar} />
                <p className={styles.settings__email}>{sessionEmail}</p>
              </div>
              <InputFormik
                name="email"
                placeholder={trl_changeEmail}
                aria-label={trl_changeEmail}
                type="text"
              />
              <InputFormik
                name="password"
                placeholder={trl_changePassword}
                aria-label={trl_changePassword}
                type="password"
              />
              <label name="fileImg">{trl_changeAvatar}</label>
              <InputFormikFile
                name="fileImg"
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />

              <ButtonMain type="submit" animation={!isSubmitting}>
                {trl_btn_confirm}
              </ButtonMain>
            </Form>
          );
        }}
      </Formik>
    </FormContainerBlur>
  );
};

export default FormikAccount;
