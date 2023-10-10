import FormikRegister from "@/components/transitions/Forms/FormikRegister/FormikRegister";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";

export default async function RegistrationPage({ params: { lang } }) {
	const dict = await getDictionaryElements(lang);

	const regTranslation = {
		trl_title: dict.auth.registration.title,
		trl_email: dict.auth.registration.email,
		trl_password: dict.auth.registration.password,
		trl_confirmPassword: dict.auth.registration.confirmPassword,
		trl_terms: dict.auth.registration.terms,
		trl_btn: dict.auth.registration.btn,
		trl_question: dict.auth.registration.question,
		trl_questionLink: dict.auth.registration.questionLink,
	};

	return <FormikRegister dict={regTranslation} lang={lang} />;
}
