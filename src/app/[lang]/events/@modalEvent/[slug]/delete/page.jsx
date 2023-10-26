import ModalParallel from "@/components/transitions/Modal/ModalParallel";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import ModalDelete from "@/components/Tools/DeleteModal";

export default async function DeleteEventModal({
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

	const translationModalDelete = {
		trl_title: dict.events.deleteEvent.title,
		trl_btn_delete: dict.events.deleteEvent.btn_delete,
		trl_btn_cancel: dict.events.deleteEvent.btn_cancel,
		trl_err: dictNotifi.notifications.deleteEvent.generalError,
	};

	return (
		<ModalParallel small={true}>
			<ModalDelete
				lang={lang}
				dict={translationModalDelete}
				searchParams={searchParams}
				hSize='h2'
			/>
		</ModalParallel>
	);
}
