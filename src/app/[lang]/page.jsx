import HomeStartContent from "@/components/Content/HomeStartContent";
import IconRender from "@/components/Icons/IconRender";
import Card from "@/components/transitions/Cards/Card";
import ImageLoader from "@/components/transitions/Image/ImageRender";
import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import styles from "./page.module.scss";
import { getDictionaryHome } from "../dictionaries/home/dictionaries";

export default async function Home({ params: { lang } }) {
	const dict = await getDictionaryHome(lang);

	const startContent = {
		title: dict.start_content.title,
		text: dict.start_content.text,
		btn_registration: dict.start_content.btn_registration,
		btn_events: dict.start_content.btn_events,
		btn_cooperation: dict.start_content.btn_cooperation,
	};

	return (
		<main>
			<HomeStartContent
				title={startContent.title}
				text={startContent.text}
				btn_registration={startContent.btn_registration}
				btn_cooperation={startContent.btn_cooperation}
				btn_events={startContent.btn_events}
			/>
			<WrapperSection id='history' className={styles.history}>
				<h3>{dict.section_history.section_title}</h3>
				<Card variant={"skew"}>
					<IconRender variant='history' />
					<h4>{dict.section_history.card_1.title}</h4>
					<p>{dict.section_history.card_1.text}</p>
				</Card>
				<Card variant={"skew"}>
					<IconRender variant='chartRadar' />
					<h4>{dict.section_history.card_2.title}</h4>
					<p>{dict.section_history.card_2.text}</p>
				</Card>
				<Card variant={"skew"}>
					<IconRender variant='chartRadar' />
					<h4>{dict.section_history.card_3.title}</h4>
					<p>{dict.section_history.card_3.text}</p>
				</Card>
			</WrapperSection>
			<WrapperSection id='team' className={styles["aboutus"]}>
				<h3>{dict.section_aboutus.section_title}</h3>
				<Card variant={"normal"}>
					<h4>{dict.section_aboutus.card_1.title}</h4>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='baker'
						sizes={"(max-width: 768px) 90vw, (min-width: 1200px) 40vw"}
					/>
					<h5> {dict.section_aboutus.card_1.desc_title} </h5>
					<p>{dict.section_aboutus.card_1.text}</p>
				</Card>
				<Card variant={"normal"}>
					<h4>{dict.section_aboutus.card_2.title}</h4>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='marian'
						sizes={"(max-width: 768px) 90vw, (min-width: 1200px) 40vw"}
					/>
					<h5> {dict.section_aboutus.card_2.desc_title} </h5>
					<p>{dict.section_aboutus.card_2.text}</p>
				</Card>
				<Card variant={"normal"}>
					<h4>{dict.section_aboutus.card_3.title}</h4>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='neo'
						sizes={"(max-width: 768px) 90vw, (min-width: 1200px) 40vw"}
					/>
					<h5> {dict.section_aboutus.card_3.desc_title} </h5>
					<p>{dict.section_aboutus.card_3.text}</p>
				</Card>
				<Card variant={"normal"}>
					<h4>{dict.section_aboutus.card_4.title}</h4>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='david'
						sizes={"(max-width: 768px) 90vw, (min-width: 1200px) 40vw"}
					/>
					<h5> {dict.section_aboutus.card_4.desc_title} </h5>
					<p>{dict.section_aboutus.card_4.text}</p>
				</Card>
			</WrapperSection>
		</main>
	);
}
