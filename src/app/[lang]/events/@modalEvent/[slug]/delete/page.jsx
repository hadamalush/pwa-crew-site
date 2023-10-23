import ModalParallel from "@/components/transitions/Modal/ModalParallel";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import DeleteItem from "@/components/Tools/DeleteItem";

export default async function EventEditModal({
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

	return (
		<ModalParallel searchParams={searchParams}>
			<DeleteItem heading='1'>Children</DeleteItem>
		</ModalParallel>
	);
}
