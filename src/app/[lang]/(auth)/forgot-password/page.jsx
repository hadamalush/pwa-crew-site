import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import FormikForgotPassword from "@/components/transitions/Forms/FormikForgotPassword/FormikForgotPassword";

export default async function ForgotPassPage({ params: { lang } }) {
	const dict = await getDictionaryElements(lang);
	console.log(dict.auth.forgotPass.btnReset);
	const forgotTranslation = {
		trl_title: dict.auth.forgotPass.title,
		trl_email: dict.auth.forgotPass.email,
		trl_btnReset: dict.auth.forgotPass.btnReset,
		trl_question: dict.auth.forgotPass.question,
		trl_questionLink: dict.auth.forgotPass.questionLink,
	};

	return <FormikForgotPassword dict={forgotTranslation} lang={lang} />;
}
