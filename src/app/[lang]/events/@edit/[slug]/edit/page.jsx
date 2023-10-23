import ModalParallel from "@/components/transitions/Modal/ModalParallel";
import FormikEvent from "@/components/transitions/Forms/FormikEvent/FormikEvent";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";

export default async function Test({
	params: { lang },
	searchParams,
	...props
}) {
	let dict, dictNotifi;

	try {
		dict = await getDictionaryElements(lang);
		dictNotifi = await getDictionaryNotifi(lang);
	} catch (err) {
		console.log(err);
	}

	const formTranslation = {
		// trl_title: dict.events.editEvent.form.title,
		trl_eventTitle: dict.events.newEvent.form.eventTitle,
		// trl_town: dict.events.newEvent.form.town,
		// trl_codePost: dict.events.newEvent.form.codePost,
		// trl_street: dict.events.newEvent.form.street,
		// trl_date: dict.events.newEvent.form.date,
		// trl_startTime: dict.events.newEvent.form.startTime,
		// trl_picture: dict.events.newEvent.form.picture,
		// trl_eventDesc: dict.events.newEvent.form.eventDesc,
		// trl_btn_createEvent: dict.events.editEvent.form.btn_confirm,
	};

	console.log(formTranslation);

	// console.log(dict);

	const trl_error = dictNotifi.notifications.newEvent.generalError;

	console.log(trl_error);

	return (
		<ModalParallel searchParams={searchParams}>
			{/* <FormikEvent
				dict={formTranslation}
				trl_error={trl_error}
				lang={lang}
				searchParams={searchParams}
				variant='edit'
				scroll='block'
			/> */}
			{lang}
		</ModalParallel>
	);
}
