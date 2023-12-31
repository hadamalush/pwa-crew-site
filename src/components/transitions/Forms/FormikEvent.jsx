"use client";
import FormContainerBlur from "@/components/transitions/Containers/FormContainerBlur";
import InputFormik from "../Input/InputFormik";
import InputFormikFile from "../Input/InputFormikFile";
import ButtonMain from "../Button/ButtonMain";
import TextareaFormik from "../Input/TextareaFormik";
import styles from "../../../styles/components/transitions/Forms/FormikEvent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { generalConfig } from "@/config/gerenalConfig";
import { Formik, Form } from "formik";
import { eventSchema } from "@/components/Schemas/FormSchem";
import { showResult, loading } from "@/global/notification-slice";
import { getCookie, setCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import { closeModalWithAnimation } from "@/global/modal-slice";

/**
 * @description This component returns form for event.
 * @param {String} className Enter some class as String
 * @param {Object} dict Enter object with dictionary, that object should include (trl_title,trl_eventTitle, trl_town, trl_codePost, trl_street, trl_eventDesc, trl_date, trl_startTime, trl_picture, trl_btn_createEvent). All of properties are type of string. For example: trl_title: "Events" or trl_eventTitle: "Event title". Should come from internationalization directory.
 * @param {String} lang Enter lang as String. For example: 'pl' or 'en' - but should come from params.
 * @returns Reuturns the whole form component. Should be wrapped with WrapperFormWithContent. However if you want you can pass this component without that wrapper.
 */

const FormikEvent = ({ className, style, dict, lang, trl_error, variant }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const dataEvent = useSelector((state) => state.modal.dataRootModal);
  const params = useSelector((state) => state.modal.params);

  const {
    trl_title,
    trl_eventTitle,
    trl_town,
    trl_codePost,
    trl_street,
    trl_eventDesc,
    trl_date,
    trl_startTime,
    trl_picture,
    trl_btn_createEvent,
  } = dict;

  //Switcher between initial values edit/add form
  const initialValuesForm = {
    title: variant ? dataEvent?.title : "",
    town: variant ? dataEvent?.town : "",
    codePost: variant ? dataEvent?.codePost : "",
    street: variant ? dataEvent?.street : "",
    date: variant ? dataEvent?.date : "",
    time: variant ? dataEvent?.time : "",
    description: variant ? dataEvent?.description : "",
    fileImg: "",
  };
  const classesForm = variant ? `${styles.form} ${styles.form__animation}` : styles.form;

  const addEventhandler = async (values) => {
    dispatch(loading(true));
    const file = values.fileImg;

    let dataStorage;

    try {
      const resFeedback = await fetch(
        "https://pwa-crew-site-demo.vercel.app/api/admin/settings/getStorage"
      );

      if (resFeedback.ok) {
        dataStorage = await resFeedback.json();
      } else {
        dataStorage = null;
      }
    } catch (err) {
      dataStorage = null;
    }

    const uploadDynamicStorage = dataStorage?.uploadStorage;

    const uploadStorage = uploadDynamicStorage
      ? uploadDynamicStorage
      : generalConfig.uploadImageStorageEvent;

    let imgSrcVercelBlob, imgSrcMega, imgSrcCld;

    //CHECKING VARIANT

    if ((variant && values.fileImg) || !variant) {
      //UPLOAD FILE TO CLOUDINARY

      if (uploadStorage === "cloudinary" || uploadStorage === "all") {
        try {
          const response = await fetch(`/api/upload/cloudinary?filename=${file.name}`, {
            method: "POST",
            body: file,
          });

          const data = await response.json();

          if (data.message) {
            imgSrcCld = data.message;
          }
        } catch (error) {
          console.log(error);
          dispatch(loading(false));
          dispatch(
            showResult({
              message: "Something went wrong.",
              variant: "warning",
            })
          );
          return;
        }
      }

      // UPLOAD FILE MEGA DIRECTORY

      if (uploadStorage === "mega" || uploadStorage === "all") {
        try {
          const response = await fetch(`/api/upload/mega?filename=${file.name}`, {
            method: "POST",
            body: file,
          });
          const data = await response.json();

          if (data.message) {
            imgSrcMega = data.message;
          }
        } catch (error) {
          dispatch(loading(false));
          dispatch(
            showResult({
              message: "Something went wrong.",
              variant: "warning",
            })
          );
          return;
        }
      }

      // // UPLOAD FILE TO VERCEL BLOB

      if (uploadStorage === "vercelBlob" || uploadStorage === "all") {
        try {
          const response = await fetch(`/api/upload/vercelBlob?filename=${file.name}`, {
            method: "POST",
            body: file,
          });

          if (response.ok) {
            const data = await response.json();
            imgSrcVercelBlob = data.url;
          }

          if (!response.ok && !imgSrcMega) {
            dispatch(loading(false));
            dispatch(
              showResult({
                message: "Something went wrong",
                variant: "warning",
              })
            );
            return;
          }
        } catch (error) {
          console.log(error);
          if (!imgSrcMega) {
            dispatch(loading(false));
            dispatch(
              showResult({
                message: "Something went wrong",
                variant: "warning",
              })
            );
            return;
          }
        }
      }
    }

    const apiLinkDependsVariant = variant
      ? `/api/editEvent?eventLink=${params?.event}`
      : "/api/addEvent";

    try {
      const response = await fetch(apiLinkDependsVariant, {
        method: variant ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          town: values.town,
          codePost: values.codePost,
          street: values.street,
          date: values.date,
          time: values.time,
          description: values.description,
          imageSrcVercelBlob: imgSrcVercelBlob,
          imageSrcMega: imgSrcMega,
          imageSrcCld: imgSrcCld,
          lang: lang,
          eventId: dataEvent?.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(loading(false));
        dispatch(showResult({ message: data.error, variant: "warning" }));
        return;
      }

      dispatch(loading(false));
      dispatch(showResult({ message: data.message, variant: "success" }));

      if (variant) {
        closeModalWithAnimation(dispatch);
      }

      const receivedNotices = await getCookie("newNotices");

      if (receivedNotices) {
        const quantityNotices = parseInt(receivedNotices?.value);

        await setCookie("newNotices", quantityNotices + 1);
      }

      !variant && data.link && router.push(data.link);

      return;
    } catch (error) {
      dispatch(loading(false));
      dispatch(
        showResult({
          message: trl_error,
          variant: "warning",
        })
      );
    }
  };

  return (
    <FormContainerBlur style={style || null}>
      <Formik
        initialValues={initialValuesForm}
        onSubmit={addEventhandler}
        validationSchema={eventSchema(lang, variant)}
        className={styles.form}
      >
        {({ setFieldValue, setFieldTouched, isSubmitting, ...props }) => {
          return (
            <Form className={classesForm} id="form">
              <h1>{trl_title}</h1>

              <InputFormik
                name="title"
                placeholder={trl_eventTitle}
                aria-label={trl_eventTitle}
                type="text"
              />
              <InputFormik name="town" placeholder={trl_town} aria-label={trl_town} type="text" />
              <InputFormik
                name="codePost"
                placeholder={trl_codePost}
                aria-label={trl_codePost}
                type="text"
              />
              <InputFormik
                name="street"
                placeholder={trl_street}
                aria-label={trl_street}
                type="text"
              />
              <InputFormik name="date" placeholder={trl_date} aria-label={trl_date} type="date" />
              <InputFormik
                name="time"
                placeholder={trl_startTime}
                aria-label={trl_startTime}
                type="time"
              />

              <TextareaFormik
                name="description"
                aria-label={trl_eventDesc}
                placeholder={trl_eventDesc}
                type="textarea"
              />

              <InputFormikFile
                name="fileImg"
                aria-label={trl_picture}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              <ButtonMain type="submit" animation={!isSubmitting}>
                {trl_btn_createEvent}
              </ButtonMain>
            </Form>
          );
        }}
      </Formik>
    </FormContainerBlur>
  );
};

export default FormikEvent;
