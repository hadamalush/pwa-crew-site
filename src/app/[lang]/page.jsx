import HomeStartContent from "@/components/Common/HomeStartContent";
import IconRender from "@/components/transitions/Icons/IconRender";
import Card from "@/components/transitions/Cards/Card";
import ImageLoader from "@/components/transitions/Image/ImageRender";
import WrapperSection from "@/components/transitions/Wrappers/WrapperSection";
import styles from "./page.module.scss";
import { getDictionaryHome } from "../dictionaries/home/dictionaries";
import Script from "next/script";
import CardInfo from "@/components/transitions/Cards/CardInfo";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionaryHome(lang);

  const infoData = await getInfo();

  const startContent = {
    title: dict.start_content.title,
    text: dict.start_content.text,
    btn_registration: dict.start_content.btn_registration,
    btn_events: dict.start_content.btn_events,
    btn_cooperation: dict.start_content.btn_cooperation,
  };

  return (
    <>
      <CardInfo data={infoData} />
      <main>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7DREEDL6C0" />
        <Script id="google-analytics">
          {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'G-7DREEDL6C0');
       `}
        </Script>

        <HomeStartContent
          title={startContent.title}
          text={startContent.text}
          btn_registration={startContent.btn_registration}
          btn_cooperation={startContent.btn_cooperation}
          btn_events={startContent.btn_events}
          lang={lang}
        />
        <WrapperSection id="history" className={styles.history}>
          <h3>{dict.section_history.section_title}</h3>
          <Card variant={"skew"}>
            <IconRender variant="history" />
            <h4>{dict.section_history.card_1.title}</h4>
            <p>{dict.section_history.card_1.text}</p>
          </Card>
          <Card variant={"skew"}>
            <IconRender variant="chartRadar" />
            <h4>{dict.section_history.card_2.title}</h4>
            <p>{dict.section_history.card_2.text}</p>
          </Card>
          <Card variant={"skew"}>
            <IconRender variant="friends" />
            <h4>{dict.section_history.card_3.title}</h4>
            <p>{dict.section_history.card_3.text}</p>
          </Card>
        </WrapperSection>
        <WrapperSection id="team" className={styles["aboutus"]}>
          <h3>{dict.section_aboutus.section_title}</h3>
          <Card variant={"normal"}>
            <h4>{dict.section_aboutus.card_1.title}</h4>
            <ImageLoader
              alt="Woman in the background of mountains"
              variant="basia"
              sizes={"(max-width: 768px) 90vw, (min-width: 1200px) 40vw"}
            />
            <h5> {dict.section_aboutus.card_1.desc_title} </h5>
            <p>{dict.section_aboutus.card_1.text}</p>
          </Card>
          <Card variant={"normal"}>
            <h4>{dict.section_aboutus.card_2.title}</h4>
            <ImageLoader
              alt="Man with a microphone"
              variant="marian"
              sizes={"(max-width: 768px) 90vw, (min-width: 1200px) 40vw"}
            />
            <h5> {dict.section_aboutus.card_2.desc_title} </h5>
            <p>{dict.section_aboutus.card_2.text}</p>
          </Card>
          <Card variant={"normal"}>
            <h4>{dict.section_aboutus.card_3.title}</h4>
            <ImageLoader
              alt="Mechanical brain surgery on a guy sitting in a chair"
              variant="neo"
              sizes={"(max-width: 768px) 90vw, (min-width: 1200px) 40vw"}
            />
            <h5> {dict.section_aboutus.card_3.desc_title} </h5>
            <p>{dict.section_aboutus.card_3.text}</p>
          </Card>
          <Card variant={"normal"}>
            <h4>{dict.section_aboutus.card_4.title}</h4>
            <ImageLoader
              alt="Woman against the background of the wall"
              variant="alicja"
              sizes={"(max-width: 768px) 90vw, (min-width: 1200px) 40vw"}
            />
            <h5> {dict.section_aboutus.card_4.desc_title} </h5>
            <p>{dict.section_aboutus.card_4.text}</p>
          </Card>
        </WrapperSection>
      </main>
    </>
  );
}

const getInfo = async () => {
  let data;

  try {
    const response = await fetch("http://localhost:3000/api/admin/settings/getAdditionalInfo", {
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      data = await response.json();
    } else {
      data = null;
    }
  } catch (err) {
    console.log(err);
  }

  return data;
};
