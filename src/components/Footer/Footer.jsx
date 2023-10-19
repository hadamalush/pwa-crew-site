import IconRender from "../Icons/IconRender";
import ButtonMain from "../transitions/Button/ButtonMain";
import Input from "../transitions/Input/Input";
import Logo from "../transitions/Logo/Logo";
import WrapperInput from "../transitions/Wrappers/WrapperInput";
import Link from "next/link";
import SocialMedia from "../transitions/SocialMedia/SocialMedia";
import styles from "../../styles/components/Footer/Footer.module.scss";

const Footer = props => {
	return (
		<footer className={styles.footer}>
			<h3>Dołącz do nas!</h3>
			<form className={styles.newsletter}>
				<label htmlFor='email-newsletter'>
					Dołącz do naszego newslettera, aby być na bieżąco z naszymi koncertami
					i wydarzeniami hip-hopowymi!
				</label>
				<WrapperInput>
					<Input
						type='text'
						name='email-newsletter'
						id='email-newsletter'
						placeholder='Podaj adres email'
					/>
					<IconRender variant='email' />
				</WrapperInput>
				<ButtonMain>Subskrybuj</ButtonMain>
			</form>

			<div className={styles["footer__box"]}>
				<h5>Navigation</h5>
				<ul>
					<li>
						<Link href='#' scroll={true}>
							Home
						</Link>
					</li>
					<li>
						<Link href='#team'>O nas</Link>
					</li>
					<li>
						<Link href='#'>Kolekcja</Link>
					</li>
					<li>
						<Link href='/contact'>Kontakt</Link>
					</li>
				</ul>
			</div>

			<div className={styles["footer__box"]}>
				<h5>Wydarzenia</h5>
				<ul>
					<li>
						<Link href='/events'>Wszystkie wydarzenia</Link>
					</li>
					<li>
						<Link href='/events/new-event#form'>Utwórz wydarzenie</Link>
					</li>
				</ul>
			</div>

			<div className={styles["footer__box"]}>
				<h5>Address</h5>
				<address className={styles["footer__address"]}>
					<ul>
						<li>
							<Link href='/'>
								<IconRender variant='location' />
								Warszawa, ul. Dobra 2
							</Link>
						</li>
						<li>
							<Link href='mailto:webmaster@example.com'>
								<IconRender variant='email' />
								example@gmail.com
							</Link>
						</li>
						<li>
							<Link href='tel:+48777777777'>
								<IconRender variant='phone' />
								+48 777-777-777
							</Link>
						</li>
					</ul>
				</address>
			</div>

			<div className={styles["footer__box"]}>
				<Logo className={styles["footer__logo"]} />
				<h5>Social media</h5>
				<SocialMedia />
			</div>

			<p>&copy; 2023 PwaCrew - Wszystkie prawa zastrzeżone</p>
		</footer>
	);
};

export default Footer;
