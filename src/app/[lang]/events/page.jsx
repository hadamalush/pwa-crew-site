import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import EventsList from "@/components/transitions/Events/EventsList";
import ImgBgBlur from "@/components/transitions/Image/ImgBgBlur";
import styles from "./page.module.scss";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import { cache } from "react";

export default async function Events({ params: { lang }, searchParams }) {
  const dict = await getDictionaryElements(lang);

  const translationEvent = {
    trl_startEvent: dict.events.event.startEvent,
    trl_address: dict.events.event.address,
    trl_description: dict.events.event.description,
    trl_btnEventDetails: dict.events.event.btn_seeDetails,
    trl_btnDelete: dict.events.event.btn_delete,
    trl_btnEdit: dict.events.event.btn_edit,
    trl_btnPreviousPage: dict.events.event.btn_previousPage,
  };

  const events = await getData();

  const trl_title = dict.events.title;

  return (
    <>
      <WrapperSection id="section-events" className={styles["section-events"]}>
        <ImgBgBlur src={"/images/background/background-events.webp"} />
        <h1>{trl_title}</h1>
        <EventsList
          events={events}
          className={styles["section-events__list"]}
          lang={lang}
          dict={translationEvent}
        />
      </WrapperSection>
    </>
  );
}

const getData = cache(async (id) => {
  let data;

  const timestamp = Date.now();
  const apiUrl = `https://pwa-crew-site-demo.vercel.app/api/events?timestamp=${timestamp}`;

  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 1200 },
    });

    data = await response.json();
  } catch (error) {
    console.log(error);
  }

  const events = data.message;

  return events;
});
