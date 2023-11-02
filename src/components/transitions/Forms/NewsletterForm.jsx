import styles from "../../../styles/components/transitions/Forms/Newsletter/NewsletterForm.module.scss";
import ButtonMain from "../Button/ButtonMain";
import InputTextMain from "../Input/Input";

const NewsletterForm = (props) => {
  const classes = `${styles.newsletter} ${props.className}`;

  return (
    <form className={classes}>
      <label htmlFor="newsletter">
        <h2 className={styles["newsletter__title"]}>Newsletter</h2>
        <em>Dołącz do nas!</em>
      </label>
      <InputTextMain
        className={styles["newsletter__text"]}
        id="newsletter"
        name="newsletter"
        placeholder="E-mail"
      />
      <ButtonMain variant="default" className={styles["newsletter__btn"]}>
        Subskrybuj
      </ButtonMain>
    </form>
  );
};

export default NewsletterForm;
