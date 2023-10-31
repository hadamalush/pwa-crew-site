import LinkAsBtn from "@/components/transitions/Link/LinkAsBtn";
import WrapperStart from "@/components/transitions/Wrappers/WrapperStart";
import Heading from "@/components/transitions/Elements/Heading";
import styles from "../../../styles/components/Pages/NotFround.module.scss";

export default async function Page({ params }) {
	const lang = params?.lang;

	if (lang === "_next") {
		return null;
	}

	return (
		<WrapperStart className={styles.error}>
			<Heading as='h1' className={styles["error__heading"]}>
				{lang === "pl" ? "Nie znaleziono strony" : "Page not found"}
			</Heading>
			<p className={styles["error__text"]}>
				{lang === "pl"
					? "Strona być może została usunięta pzez administratora."
					: "The page can be deleted by the administrator"}
			</p>

			<LinkAsBtn href='/' className={styles["error__link"]}>
				Home
			</LinkAsBtn>
		</WrapperStart>
	);
}
