import styles from "../../styles/components/Footer/Footer.module.scss";
import IconRender from "../Icons/IconRender";
import ButtonMain from "../transitions/Button/ButtonMain";
import Input from "../transitions/Input/Input";

const Footer = props => {
	return (
		<footer className={styles.footer}>
			<h3>Dołącz do nas!</h3>
			<div className={styles.newsletter}>
				<label>
					Dołącz do naszego newslettera, aby być na bieżąco z naszymi koncertami
					i wydarzeniami hip-hopowymi!
				</label>

				<div className={styles["newsletter__input-box"]}>
					<Input placeholder='Podaj adres email' />
					<IconRender variant='email' />
				</div>

				<ButtonMain variant='btnSkewRight'>Subskrybuj</ButtonMain>
			</div>
		</footer>
	);
};

export default Footer;
