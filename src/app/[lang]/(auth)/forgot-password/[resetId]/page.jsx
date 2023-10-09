import FormikForgotPassword from "@/components/transitions/Forms/FormikForgotPassword/FormikForgotPassword";

export default async function ForgotPassPage({ params }) {
	const resetId = params.resetId;

	return <FormikForgotPassword resetId={resetId} />;
}
