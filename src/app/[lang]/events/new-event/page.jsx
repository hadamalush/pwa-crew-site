import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import WrapperFormWithContent from "@/components/transitions/Wrappers/WrapperFormWithContent";
import FormikEvent from "@/components/transitions/Forms/FormikEvent";
import Image from "next/image";
import styles from "../../../../styles/components/Pages/NewEventPage.module.scss";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import ImgBgBlur from "@/components/transitions/Image/ImgBgBlur";

const NewEventPage = async ({ params: { lang } }) => {
  const dict = await getDictionaryElements(lang);
  const dictNotifi = await getDictionaryNotifi(lang);

  const dataWrapper = {
    title: dict.events.newEvent.wp_content.title,
    textFirst: dict.events.newEvent.wp_content.textFirst,
    textSecond: dict.events.newEvent.wp_content.textSecond,
    imageSrc: "/images/background/background-new-event.webp",
    alt: dict.events.newEvent.wp_content.alt,
  };

  const formTranslation = {
    trl_title: dict.events.newEvent.form.title,
    trl_eventTitle: dict.events.newEvent.form.eventTitle,
    trl_town: dict.events.newEvent.form.town,
    trl_codePost: dict.events.newEvent.form.codePost,
    trl_street: dict.events.newEvent.form.street,
    trl_date: dict.events.newEvent.form.date,
    trl_startTime: dict.events.newEvent.form.startTime,
    trl_picture: dict.events.newEvent.form.picture,
    trl_eventDesc: dict.events.newEvent.form.eventDesc,
    trl_btn_createEvent: dict.events.newEvent.form.btn_createEvent,
  };

  const trl_error = dictNotifi.notifications.newEvent.generalError;

  return (
    <WrapperSection className={styles["section-newEvent"]}>
      <ImgBgBlur src={"/images/background/background-events.webp"} />
      <WrapperFormWithContent
        headingType="h3"
        title={dataWrapper.title}
        textFirst={dataWrapper.textFirst}
        textSecond={dataWrapper.textSecond}
        imageSrc={dataWrapper.imageSrc}
        alt={dataWrapper.alt}
        className={styles.container}
      >
        <FormikEvent dict={formTranslation} trl_error={trl_error} lang={lang} />
      </WrapperFormWithContent>
    </WrapperSection>
  );
};

export default NewEventPage;
