import LinkAsBtn from "../transitions/Link/LinkAsBtn";
import Heading from "../transitions/Elements/Heading";
import WrapperStart from "../transitions/Wrappers/WrapperStart";
import styles from "../../styles/components/Error/Error.module.scss";

const NotFound = ({ dict }) => {
  return (
    <WrapperStart id="section_detail-event" className={styles.error}>
      <Heading as="h1" className={styles["error__heading"]}>
        Nie znaleziono strony
      </Heading>
      <p className={styles["error__text"]}>Strona nie istnieje lub została usunięta</p>

      <LinkAsBtn href="/" className={styles["error__link"]}>
        Home
      </LinkAsBtn>
    </WrapperStart>
  );
};

export default NotFound;
