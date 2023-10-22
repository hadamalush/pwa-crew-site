import ModalText from "@/components/Containers/ModalText";
import FormikEvent from "@/components/transitions/Forms/FormikEvent/FormikEvent";

export default async function Test({ params: { lang } }) {
	const dictEventFormik = {
		trl_title: "title",
		trl_eventTitle: "dasdkoaskdok",
		trl_town: "Town",
		trl_codePost: "77777",
		trl_street: "Street",
		trl_eventDesc: "Description",
		trl_date: "Date",
		trl_picture: "Picture",
		trl_createEvent: "Create Event",
		trl_startTime: "Start event",
	};
	return <FormikEvent dict={dictEventFormik} lang={lang} scroll='block' />;
}
