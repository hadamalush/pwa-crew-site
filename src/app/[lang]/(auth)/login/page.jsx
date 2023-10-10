import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import FormikLogin from "@/components/transitions/Forms/FormikLogin/FormikLogin";

export default async function LoginPage({ params: { lang } }) {
	const dict = await getDictionaryElements(lang);

	const logTranslation = {
		trl_title: dict.auth.logging.title,
		trl_email: dict.auth.logging.email,
		trl_password: dict.auth.logging.password,
		trl_forgotPass: dict.auth.logging.forgotPass,
		trl_btn: dict.auth.logging.btn,
		trl_question: dict.auth.logging.question,
		trl_questionLink: dict.auth.logging.questionLink,
	};

	return <FormikLogin dict={logTranslation} lang={lang} />;
}
