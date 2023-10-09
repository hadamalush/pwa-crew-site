import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import FormikForgotPassword from "@/components/transitions/Forms/FormikForgotPassword/FormikForgotPassword";

export default async function ForgotPassResetPage({
	params: { lang, resetId },
}) {
	const dict = await getDictionaryElements(lang);

	const forgotTranslation = {
		trl_title: dict.auth.forgotPass.title,
		trl_email: dict.auth.forgotPass.email,
		trl_btnReset: dict.auth.forgotPass.btnReset,
		trl_question: dict.auth.forgotPass.question,
		trl_questionLink: dict.auth.forgotPass.questionLink,
		trl_newPassword: dict.auth.forgotResetPass.newPassword,
		trl_confirmPassword: dict.auth.forgotResetPass.confirmPassword,
		trl_code: dict.auth.forgotResetPass.code,
		trl_btnChange: dict.auth.forgotResetPass.btn,
	};

	return <FormikForgotPassword resetId={resetId} dict={forgotTranslation} />;
}
