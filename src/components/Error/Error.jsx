import WrapperSection from "../transitions/Wrappers/WrapperSection";
import LinkAsBtn from "../transitions/Link/LinkAsBtn";
import styles from "../../styles/components/Error/Error.module.scss";
import Heading from "../transitions/Elements/Heading";

const ErrorHandle = ({ hSize, title, text, linkFirst }) => {
	return (
		<WrapperSection id='section_detail-event' className={styles.error}>
			<Heading as={hSize} className={styles["error__heading"]}>
				{title}
			</Heading>
			{text && <p className={styles["error__text"]}>{text}</p>}

			<LinkAsBtn href='/events' className={styles["error__link"]}>
				{linkFirst}
			</LinkAsBtn>
			<LinkAsBtn href='/' className={styles["error__link"]}>
				Home
			</LinkAsBtn>
		</WrapperSection>
	);
};

export default ErrorHandle;
