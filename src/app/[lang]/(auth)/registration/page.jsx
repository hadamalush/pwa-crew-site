import FormikRegister from "@/components/transitions/Forms/FormikRegister";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";

export default async function RegistrationPage({ params: { lang } }) {
  const dict = await getDictionaryElements(lang);
  const dictNotifi = await getDictionaryNotifi(lang);

  const regTranslation = {
    trl_title: dict.auth.registration.title,
    trl_email: dict.auth.registration.email,
    trl_username: dict.auth.registration.username,
    trl_password: dict.auth.registration.password,
    trl_confirmPassword: dict.auth.registration.confirmPassword,
    trl_terms: dict.auth.registration.terms,
    trl_btn: dict.auth.registration.btn,
    trl_question: dict.auth.registration.question,
    trl_questionLink: dict.auth.registration.questionLink,
  };

  const trl_error = dictNotifi.notifications.generalError;

  return <FormikRegister dict={regTranslation} lang={lang} trl_error={trl_error} />;
}
