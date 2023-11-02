import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import FormikForgotPassword from "@/components/transitions/Forms/FormikForgotPassword";

export default async function ForgotPassPage({ params: { lang } }) {
  const dict = await getDictionaryElements(lang);
  const dictNotifi = await getDictionaryNotifi(lang);

  const forgotTranslation = {
    trl_title: dict.auth.forgotPass.title,
    trl_email: dict.auth.forgotPass.email,
    trl_btnReset: dict.auth.forgotPass.btnReset,
    trl_question: dict.auth.forgotPass.question,
    trl_questionLink: dict.auth.forgotPass.questionLink,
  };

  const trl_error = dictNotifi.notifications.generalError;

  return <FormikForgotPassword dict={forgotTranslation} trl_error={trl_error} lang={lang} />;
}
