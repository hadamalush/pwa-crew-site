"use client";
import { useEffect, useRef, useState } from "react";
import ButtonMain from "../Button/ButtonMain";
import Heading from "../Elements/Heading";
import styles from "./CardInfo.module.scss";

const CardInfo = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const checkboxRef = useRef();
  const textHTML = `<p>siemano </p><img src='https://cdn.pixabay.com/photo/2023/11/06/02/16/butterfly-8368603_1280.jpg'/>`;

  useEffect(() => {
    const initialInfobox = JSON.parse(localStorage.getItem("infobox"))?.visibility;

    if (initialInfobox || initialInfobox === undefined) {
      setIsOpenInfo(true);
    }
  }, []);

  const handleCloseInfobox = (e) => {
    e.preventDefault();
    const isNoMore = checkboxRef.current.checked;
    setIsOpenInfo(false);

    if (isNoMore) {
      localStorage.setItem("infobox", JSON.stringify({ visibility: false }));
    }
  };

  return (
    <>
      {isOpenInfo && (
        <div className={styles.card}>
          <Heading as="h2" className={styles.card__heading}>
            Hello
          </Heading>
          <div className={styles.card__text} dangerouslySetInnerHTML={{ __html: textHTML }}></div>
          <form className={styles.card__action} onSubmit={handleCloseInfobox}>
            <div className={styles.card__mode}>
              <input
                type="checkbox"
                id="infostart"
                className={styles.card__checkbox}
                ref={checkboxRef}
              />
              <label htmlFor="infostart" className={styles.card__label}>
                Don't show more
              </label>
            </div>

            <ButtonMain className={styles.card__button} type="submit">
              Close
            </ButtonMain>
          </form>
        </div>
      )}
    </>
  );
};

export default CardInfo;
