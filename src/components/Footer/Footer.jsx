import styles from "../../styles/components/Footer/Footer.module.scss";
import IconRender from "../Icons/IconRender";
import ButtonMain from "../transitions/Button/ButtonMain";
import Input from "../transitions/Input/Input";
import WrapperInput from "../transitions/Wrappers/WrapperInput";
import Link from "next/link";

const Footer = props => {
	return (
		<footer className={styles.footer}>
			<h3>Dołącz do nas!</h3>
			<form className={styles.newsletter}>
				<label htmlFor='email'>
					Dołącz do naszego newslettera, aby być na bieżąco z naszymi koncertami
					i wydarzeniami hip-hopowymi!
				</label>
				<WrapperInput>
					<Input
						type='text'
						name='email'
						id='email'
						placeholder='Podaj adres email'
					/>
					<IconRender variant='email' />
				</WrapperInput>
				<ButtonMain variant='btnSkewRight'>Subskrybuj</ButtonMain>
			</form>

			<span className={styles["footer__box"]}>
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
						<Link href='/sklep'>Sklep</Link>
					</li>
					<li>
						<Link href='/kontakt'>Kontakt</Link>
					</li>
				</ul>
			</span>

			<span className={styles["footer__box"]}>
				<h5>Wydarzenia</h5>
				<ul>
					<li>
						<Link href='/wydarzenia'>Wszystkie wydarzenia</Link>
					</li>
					<li>
						<Link href='/wyderzenia/nadchodzace'>Nadchodzące wydarzenia</Link>
					</li>
				</ul>
			</span>

			<span className={styles["footer__box"]}>
				<h5>Address</h5>
				<address className={styles.address}>
					<ul>
						<li>
							<Link href='/wydarzenia'>
								<IconRender variant='location' />
								Neastved, KildeBakakken 8
							</Link>
						</li>
						<li>
							<Link href='mailto:webmaster@example.com'>
								<IconRender variant='email' />
								poncyman@gmail.com
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
			</span>
			<Link href='/' className={styles.logo}>
				<div className={styles["logo__box"]}>
					<IconRender variant='logo' className={styles["logo__icon"]} />
					<h2>
						Pwa
						<span>Crew</span>
					</h2>
				</div>
			</Link>

			<span className={styles["footer__box"]}>
				<h5>Social media</h5>
				<ul>
					<li>
						<IconRender variant='youtube' />
					</li>
					<li>
						<IconRender variant='facebook' />
					</li>
					<li>
						<IconRender variant='x' />
					</li>
					<li>
						<IconRender variant='instagram' />
					</li>
				</ul>
			</span>
		</footer>
	);
};

export default Footer;
