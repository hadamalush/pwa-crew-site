import FormikForgotPassword from "@/components/transitions/Forms/FormikForgotPassword/FormikForgotPassword";

export default async function ForgotPassPage({ params: { lang } }) {
	// const forgotTranslation = {
	// 	trl_title: dict.auth.logging.title,
	// 	trl_email: dict.auth.logging.email,
	// 	trl_password: dict.auth.logging.password,
	// 	trl_forgotPass: dict.auth.logging.forgotPass,
	// 	trl_btn: dict.auth.logging.btn,
	// 	trl_question: dict.auth.logging.question,
	// 	trl_questionLink: dict.auth.logging.questionLink,
	// };

	return <FormikForgotPassword />;
}
