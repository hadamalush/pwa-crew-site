import IconRender from "../transitions/Icons/IconRender";
import ButtonMain from "../transitions/Button/ButtonMain";
import Input from "../transitions/Input/Input";
import Logo from "../transitions/Logo/Logo";
import WrapperInput from "../transitions/Wrappers/WrapperInput";
import Link from "next/link";
import SocialMedia from "../transitions/SocialMedia/SocialMedia";
import styles from "../../styles/components/Footer/Footer.module.scss";

const Footer = ({ props, dict }) => {
  const {
    trl_title,
    trl_text,
    trl_emailPlaceholder,
    trl_btnSubscribe,
    trl_navTitle,
    trl_navLink1,
    trl_navLink2,
    trl_navLink3,
    trl_navLink4,
    trl_eventsTitle,
    trl_eventsLink1,
    trl_eventsLink2,
    trl_addressTitle,
    trl_copyright,
  } = dict;

  return (
    <footer className={styles.footer}>
      <h3>{trl_title}</h3>
      <form className={styles.newsletter}>
        <label htmlFor="email-newsletter">{trl_text}</label>
        <WrapperInput>
          <Input
            type="text"
            name="email-newsletter"
            id="email-newsletter"
            placeholder={trl_emailPlaceholder}
          />
          <IconRender variant="email" />
        </WrapperInput>
        <ButtonMain>{trl_btnSubscribe}</ButtonMain>
      </form>

      <div className={styles["footer__box"]}>
        <h5>{trl_navTitle}</h5>
        <ul>
          <li>
            <Link href="#" scroll={true}>
              {trl_navLink1}
            </Link>
          </li>
          <li>
            <Link href="#team">{trl_navLink2}</Link>
          </li>
          <li>
            <Link href="#history">{trl_navLink3}</Link>
          </li>
          <li>
            <Link href="/contact">{trl_navLink4}</Link>
          </li>
        </ul>
      </div>

      <div className={styles["footer__box"]}>
        <h5>{trl_eventsTitle}</h5>
        <ul>
          <li>
            <Link href="/events">{trl_eventsLink1}</Link>
          </li>
          <li>
            <Link href="/events/new-event#form">{trl_eventsLink2}</Link>
          </li>
        </ul>
      </div>

      <div className={styles["footer__box"]}>
        <h5>{trl_addressTitle}</h5>
        <address className={styles["footer__address"]}>
          <ul>
            <li>
              <Link href="/">
                <IconRender variant="location" />
                Warszawa, ul. Dobra 2
              </Link>
            </li>
            <li>
              <Link href="mailto:webmaster@example.com">
                <IconRender variant="email" />
                example@gmail.com
              </Link>
            </li>
            <li>
              <Link href="tel:+48777777777">
                <IconRender variant="phone" />
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

      <p>&copy; {trl_copyright}</p>
    </footer>
  );
};

export default Footer;
