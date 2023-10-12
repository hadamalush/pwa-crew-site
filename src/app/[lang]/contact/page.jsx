import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import WrapperFormWithContent from "@/components/transitions/Wrappers/WrapperFormWithContent";
import FormikContact from "@/components/transitions/Forms/FormikContact/FormikContact";
import styles from "../../../styles/components/Pages/ContactPage.module.scss";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";

export default async function ContactPage({ params: { lang } }) {
	const dict = await getDictionaryElements(lang);
	const dictNotifi = await getDictionaryNotifi(lang);

	const dataContentWrapper = {
		trl_title: dict.contact.wp_content.title,
		trl_textFirst: dict.contact.wp_content.textFirst,
		trl_textSecond: dict.contact.wp_content.textSecond,
		imageSrc: "/images/background/background-test.webp",
		trl_alt: dict.contact.wp_content.alt,
	};

	const dataContentForm = {
		trl_title: dict.contact.form.title,
		trl_email: dict.contact.form.email,
		trl_subject: dict.contact.form.subject,
		trl_message: dict.contact.form.message,
		trl_btn: dict.contact.form.btn,
	};

	const trl_error = dictNotifi.notifications.newEvent.generalError;

	return (
		<main>
			<WrapperStart className={styles["start"]}>
				<WrapperFormWithContent
					headingType='h3'
					title={dataContentWrapper.trl_title}
					textFirst={dataContentWrapper.trl_textFirst}
					textSecond={dataContentWrapper.trl_textSecond}
					imageSrc={dataContentWrapper.imageSrc}
					alt={dataContentWrapper.trl_alt}
					className={styles.box}>
					<FormikContact
						dict={dataContentForm}
						lang={lang}
						trl_error={trl_error}
					/>
				</WrapperFormWithContent>
			</WrapperStart>
		</main>
	);
}
