"use client";
import { useEffect, useRef, useState } from "react";
import ButtonMain from "../Button/ButtonMain";
import Heading from "../Elements/Heading";
import styles from "./CardInfo.module.scss";

const CardInfo = ({ data }) => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const checkboxRef = useRef();
  const { textHTML, id, title } = data;

  useEffect(() => {
    const isVisibility = JSON.parse(localStorage.getItem("infobox"))?.visibility;
    const infoId = JSON.parse(localStorage.getItem("infobox"))?.id;

    if (((isVisibility || isVisibility === undefined) && data) || infoId !== id) {
      setIsOpenInfo(true);
    }
  }, []);

  const handleCloseInfobox = (e) => {
    e.preventDefault();
    const isNoMore = checkboxRef.current.checked;
    setIsOpenInfo(false);

    if (isNoMore) {
      localStorage.setItem("infobox", JSON.stringify({ visibility: false, id: id }));
    }
  };

  return (
    <>
      {isOpenInfo && (
        <div className={styles.card}>
          <Heading as="h2" className={styles.card__heading}>
            {title && title}
          </Heading>
          <div
            className={styles.card__text}
            dangerouslySetInnerHTML={{ __html: textHTML && textHTML }}
          ></div>
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
