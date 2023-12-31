"use client";
import Link from "next/link";
import ButtonMain from "../Button/ButtonMain";
import InputFormik from "../Input/InputFormik";
import FormContainerBlur from "@/components/transitions/Containers/FormContainerBlur";
import styles from "../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Formik, Form } from "formik";
import { forgotLinkSchema, forgotNewPasswordSchema } from "@/components/Schemas/FormSchem";
import { showResult, loading } from "@/global/notification-slice";

/**
 * @description This component returns form for forgot-password with reset link or reset-password. Info: If you want use form with just link you have to forwards this params: dict, trl_error,lang or if you want form with reset password you should forwards in addition resetId - should come from url param.
 * @param {String} className Enter some class as String
 * @param {Object} dict Enter object with dictionary, that object should include (trl_title,trl_email, trl_btnReset, trl_question, trl_questionLink, trl_newPassword, trl_confirmPassword, trl_code, trl_btnChange). All of properties are type of string. For example: trl_title: "Sign up" or trl_title: "Rejestracja". Should come from internationalization directory.
 * @param {String} lang Enter lang as String. For example: 'pl' or 'en' - but should come from params.
 * @param {String} trl_error Enter dictionary of error - will be visible in notifications if an error occurs. For example: in eng: 'Something went wrong...' or in pl 'Coś poszło nie tak'. Should come from nextjs internationalization directory.
 * @returns Reuturns the whole form component. Should be wrapped with WrapperFormWithContent. However if you want you can pass this component without that wrapper.
 */

const FormikForgotPassword = ({ resetId, dict, trl_error, lang, className, ...props }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    trl_title,
    trl_email,
    trl_btnReset,
    trl_question,
    trl_questionLink,
    trl_newPassword,
    trl_confirmPassword,
    trl_code,
    trl_btnChange,
  } = dict;

  const classes = `${styles["logreg-box"]} ${className || ""}`;
  const isMediumScreen = useMediaQuery({
    query: "(min-width: 768px)",
  });

  useEffect(() => {
    if (!isMediumScreen) {
      window.scrollTo(0, 70);
    }
    if (status === "authenticated" && session) {
      router.push("/");
    }
  }, [session, status]);

  //resetForm - it is for check which page is now, for choose right api/route and right form.
  const resetForm = resetId ? true : false;

  const schema = resetForm ? forgotNewPasswordSchema(lang) : forgotLinkSchema(lang);

  const changeWebstiteHandler = async (event) => {
    event.preventDefault();

    const form = document.getElementById("form").classList.toggle(styles.active);

    setTimeout(() => {
      router.push("/registration");
    }, 500);
  };

  const onSubmit = async (values) => {
    dispatch(loading(true));
    const { email, password, confirmPassword, code } = values;
    let data;

    const sendData = !resetForm
      ? { email: email, status: resetForm, lang }
      : {
          password: password,
          confirmPassword: confirmPassword,
          code: code,
          status: resetForm,
          lang,
        };

    try {
      const response = await fetch(`/api/auth/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
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
          password: "",
          confirmPassword: "",
          code: resetId,
        }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting, ...props }) => (
          <Form>
            <h1>{trl_title}</h1>

            {!resetForm && (
              <InputFormik
                name="email"
                placeholder={trl_email}
                aria-label={trl_email}
                type="text"
              />
            )}
            {resetForm && (
              <>
                <InputFormik
                  name="password"
                  placeholder={trl_newPassword}
                  aria-label={trl_newPassword}
                  type="password"
                />
                <InputFormik
                  name="confirmPassword"
                  placeholder={trl_confirmPassword}
                  aria-label={trl_confirmPassword}
                  type="password"
                />
                <InputFormik name="code" placeholder={trl_code} aria-label={trl_code} type="text" />
              </>
            )}

            <ButtonMain type="submit" animation={!isSubmitting}>
              {resetForm ? trl_btnChange : trl_btnReset}
            </ButtonMain>

            <p>
              {trl_question}
              <Link href="/registration" onClick={changeWebstiteHandler}>
                {trl_questionLink}
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </FormContainerBlur>
  );
};

export default FormikForgotPassword;
