"use client";
import ImageFill from "../Image/ImageFill";
import LinkAsBtn from "../Link/LinkAsBtn";
import ButtonMain from "../Button/ButtonMain";
import styles from "../../../styles/components/transitions/Events/EventItem.module.scss";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { setIsShow, setModalComponent } from "@/global/modal-slice";
import FormikEvent from "../Forms/FormikEvent/FormikEvent";
import Link from "next/link";

/**
 *
 * @param {String} className Enter className as string,
 * @param {String} title Enter title as string
 * @param {String} date Enter date as string
 * @param {String} town Enter town as string
 * @param {String} street Enter street as string
 * @param {String} codePost Enter code post as string
 * @param {String} time Enter time as string
 * @param {String} image Enter image source as string
 * @param {String} upload Enter upload as string - available (mega,cloudinary,vercelBlob)
 * @param {String} description Enter description as string
 * @param {String} id enter id as string
 * @param {String} lang enter lang as string - should be from internationalization
 * @param {String} dict Enter the whole object - dict with params: trl_startEvent,trl_address,trl_description,trl_btnEventDetails,trl_btnDelete,trl_btnEdit,trl_btnPreviousPage - all params are type of string. Should be from internationalization.
 * @param {String} owner Enter owner of this event for allow acces to delete and edit events. Should be email.
 * @returns {JSX.Element} The entire event component. Returns a single list item.
 */

const EventItem = ({
	className,
	title,
	date,
	town,
	street,
	codePost,
	time,
	image,
	upload,
	description,
	id,
	lang,
	dict,
	owner,
	...props
}) => {
	const { data: session } = useSession();
	const pathname = usePathname();
	const dispatch = useDispatch();
	const router = useRouter();

	const isOwner = owner === session?.user.email;
	const replacedTitle = title.replaceAll(" ", "-");
	const isMediumScreen = useMediaQuery({ minWidth: 768 });
	const params = useParams();

	//dictionary elements EventItem
	const {
		trl_startEvent,
		trl_address,
		trl_description,
		trl_btnEventDetails,
		trl_btnDelete,
		trl_btnEdit,
		trl_btnPreviousPage,
	} = dict;

	////dictionary elements FormikEvent

	const dictEventFormik = {
		trl_title: "title",
		trl_eventTitle: "dasdkoaskdok",
		trl_town: "Town",
		trl_codePost: "77777",
		trl_street: "Street",
		trl_eventDesc: "Description",
		trl_date: "Date",
		trl_picture: "Picture",
		trl_createEvent: "Create Event",
		trl_startTime: "Start event",
	};

	useEffect(() => {
		if (isMediumScreen) {
			return window.scrollBy(0, -70);
		}
	}, []);

	// const lastPartOfLink = pathname.substring(pathname.lastIndexOf("/") + 1);
	let isDescription;

	// const url = `fsdfsdfsdf-653262315db34842102ac980/edit`;
	// const check = url.substring(url.lastIndexOf("-") + 1);

	// console.log(check);

	if (params?.slug) {
		const slug = params.slug;
		const eventId = slug.substring(slug.lastIndexOf("-") + 1);
		isDescription = id === eventId;
	}

	const urlLink_dependsPath = isDescription
		? `/events#${id + 7}`
		: `/events/${replacedTitle}-${id}#section_detail-item`;

	const classDNone = styles["event__element-invisible"];

	const classEvent = {
		details: isDescription
			? `${styles.event} ${styles["event--details"]}`
			: styles.event,
		address: isDescription
			? styles["event__address"]
			: `${styles["event__address"]} ${classDNone}`,
		time: isDescription ? "" : classDNone,
		text: isDescription
			? styles["event__text"]
			: `${styles["event__text"]} ${classDNone}`,
		img: isDescription
			? `${styles["event__img"]} ${styles["event__img--isSmall"]}`
			: styles["event__img"],
		link:
			isDescription && isOwner
				? `${styles["event__link-details"]} ${styles["event__link-details--isowner"]}`
				: styles["event__link-details"],
	};

	const imageSrc =
		upload === "mega" ? `data:image/webp;base64,${image}` : image;

	const editEventHandler = () => {
		// e.preventDefault();
		console.log("raz");

		dispatch(
			setModalComponent({
				modalComponent: (
					<FormikEvent dict={dictEventFormik} lang={lang} scroll='block' />
				),
			})
		);
		dispatch(setIsShow({ isShow: false }));
	};

	// const showEdit = e => {
	// 	e.preventDefault();

	// 	router.push(`/events/${replacedTitle}-${id}/edit`);
	// };

	return (
		<li className={classEvent.details} id={id + 7}>
			<ImageFill
				src={imageSrc}
				alt={title}
				sizes='(max-width: 568px) 80vw, (min-width: 568px) 30vw'
				className={classEvent.img}
			/>

			<div className={styles["event__informations"]}>
				<h2>{title}</h2>
				<address className={classEvent.address}>
					<h3>{trl_address}</h3>
					<p>{town}</p>
					<p>{codePost}</p>
					<p>{street}</p>
				</address>
				<time className={`${styles["event__time"]}`}>
					<h3>{trl_startEvent}</h3>
					<p>{date}</p>
					<p className={classEvent.time}>{time}</p>
				</time>
			</div>
			<div className={classEvent.text}>
				<h3>{trl_description}</h3>
				<p>{description}</p>
			</div>
			<div className={styles["event__tools"]}>
				<LinkAsBtn
					href={urlLink_dependsPath}
					scroll={false}
					className={classEvent.link}>
					{isDescription ? trl_btnPreviousPage : trl_btnEventDetails}
				</LinkAsBtn>
				<Link
					href={`/events/${replacedTitle}-${id}/edit?modal=true`}
					scroll={false}>
					dasdasd{" "}
				</Link>
				{isOwner && isDescription && (
					<div className={styles["event__btns"]}>
						<ButtonMain>{trl_btnDelete}</ButtonMain>
						<ButtonMain onClick={editEventHandler}>{trl_btnEdit}</ButtonMain>
					</div>
				)}
			</div>
		</li>
	);
};

export default EventItem;
