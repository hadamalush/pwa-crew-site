import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import Carousel from "@/components/transitions/Carousel/Carousel";
import LinkAsBtn from "@/components/transitions/Link/LinkAsBtn";

import styles from "./page.module.scss";
import { headers } from "next/headers";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";

export default async function Layout({ params: { lang }, children, ...props }) {
	const dict = await getDictionaryElements(lang);
	const pathname = await getPathname();

	const btn_checkEvents = dict.events.btn_checkEvents;
	const btn_createEvents = dict.events.btn_createEvent;

	const newEventUrl =
		lang === "pl"
			? "/wydarzenia/nowe-wydarzenie#form"
			: "/events/new-event#form";
	const eventsUrl = lang === "pl" ? "/wydarzenia" : "/events";

	const btn_pathDependent = new RegExp(`(events|wydarzenia)`).test(pathname)
		? btn_createEvents
		: btn_checkEvents;

	const url_pathDependent = new RegExp(`(events|wydarzenia)`).test(pathname)
		? newEventUrl
		: eventsUrl;

	return (
		<main>
			<WrapperStart className={styles.container}>
				<Carousel />
				<LinkAsBtn
					href={`${url_pathDependent}`}
					variant='green'
					className={styles["container__link"]}>
					{pathname === "events" && btn_pathDependent}
				</LinkAsBtn>
			</WrapperStart>
			{children}
		</main>
	);
}

const getPathname = async () => {
	const path = headers().get("x-invoke-path");
	const afterSlash = path.split("/").pop();

	return afterSlash;
};
