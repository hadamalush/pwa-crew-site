import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventItem from "@/components/transitions/Events/EventItem";
import ImgBgBlur from "@/components/transitions/Image/ImgBgBlur";
import ErrorHandle from "@/components/Common/Error";
import styles from "../../../../styles/components/Pages/EventPage.module.scss";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";

const EventPage = async ({ params: { slug, lang }, edit }) => {
  const dict = await getDictionaryElements(lang);

  const translationErr = {
    title: dict.events.error.title,
    text: dict.events.error.text,
    linkName: dict.events.error.linkPrev,
  };

  const eventId = slug.substring(slug.lastIndexOf("-") + 1);
  let event;
  try {
    event = await getEvent(eventId, lang);
  } catch (err) {
    console.log(err);
  }

  if (!event || event.error) {
    return (
      <ErrorHandle
        hSize="h2"
        title={translationErr.title}
        text={translationErr.text}
        linkFirst={translationErr.linkName}
      />
    );
  }

  const {
    title,
    town,
    code_post,
    street,
    date,
    time,
    description,
    user_email,
    targetSrc,
    uploadStorage,
  } = event?.message ? event.message : null;

  const translationEvent = {
    trl_startEvent: dict.events.event.startEvent,
    trl_address: dict.events.event.address,
    trl_description: dict.events.event.description,
    trl_btnEventDetails: dict.events.event.btn_seeDetails,
    trl_btnDelete: dict.events.event.btn_delete,
    trl_btnEdit: dict.events.event.btn_edit,
    trl_btnPreviousPage: dict.events.event.btn_previousPage,
  };

  const imageSrc = uploadStorage === "mega" ? `data:image/webp;base64,${targetSrc}` : targetSrc;

  return (
    <WrapperSection className={styles["section-detail"]} id="section_detail-event">
      {event.message && (
        <>
          <h1>{title}</h1>
          <ImgBgBlur src={imageSrc} className={styles["section-detail__img"]} />
          <EventItem
            id={eventId}
            title={title}
            date={date}
            town={town}
            street={street}
            codePost={code_post}
            time={time}
            description={description}
            image={targetSrc}
            upload={uploadStorage}
            owner={user_email}
            dict={translationEvent}
            lang={lang}
            className={styles["section-detail__item"]}
          />
        </>
      )}
    </WrapperSection>
  );
};

const getEvent = async (eventId, lang) => {
  let data;

  const apiUrl = `http://localhost:3000/api/event?eventId=${eventId}&lang=${lang}`;

  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    data = await response.json();

    if (!response.ok) {
      return { error: data.error };
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return data;
};

export default EventPage;
