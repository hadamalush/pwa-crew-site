import styles from "../../../styles/components/transitions/SocialMedia/SocialMedia.module.scss";
import IconRender from "@/components/Icons/IconRender";

export default function SocialMedia() {
	return (
		<ul className={styles["social-media"]}>
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
				<IconRender variant='instagram' className={styles.check} />
			</li>
		</ul>
	);
}
