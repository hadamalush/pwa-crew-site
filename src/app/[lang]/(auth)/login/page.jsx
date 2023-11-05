import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import FormikLogin from "@/components/transitions/Forms/FormikLogin";

export default async function LoginPage({ params: { lang } }) {
  const dict = await getDictionaryElements(lang);
  const dictNotifi = await getDictionaryNotifi(lang);

  const logTranslation = {
    trl_title: dict.auth.logging.title,
    trl_email: dict.auth.logging.email,
    trl_password: dict.auth.logging.password,
    trl_forgotPass: dict.auth.logging.forgotPass,
    trl_btn: dict.auth.logging.btn,
    trl_question: dict.auth.logging.question,
    trl_questionLink: dict.auth.logging.questionLink,
  };

  const notifiTranslation = {
    trl_err_404: dictNotifi.notifications.login.err_404,
    trl_err_422: dictNotifi.notifications.login.err_422,
    trl_generalError: dictNotifi.notifications.generalError,
    trl_welcome: dictNotifi.notifications.login.welcome,
  };

  return <FormikLogin dict={logTranslation} dictNotifi={notifiTranslation} lang={lang} />;
}
