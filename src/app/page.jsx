import HomeStartContent from "@/components/Content/HomeStartContent";
import IconRender from "@/components/Icons/IconRender";
import Cards from "@/components/transitions/Cards/Cards";
import Card from "@/components/transitions/Cards/Card";
import styles from "./page.module.scss";
import ImageLoader from "@/components/transitions/Image/ImageRender";

export default function Home() {
	const iconStory = (
		<IconRender variant='history' className={styles["card-icon"]} />
	);
	const iconChartRadar = (
		<IconRender variant='chartRadar' className={styles["card-icon"]} />
	);
	const iconFriends = (
		<IconRender variant='friends' className={styles["card-icon"]} />
	);

	return (
		<main>
			<HomeStartContent />
			<Cards id='hitory'>
				<Card title='Historia Hip-Hopu' icon={iconStory} variant={"skew"}>
					<p className={"card__text"}>
						Hip-hop narodził się w Bronksie w latach 70. jako subkultura młodych
						ludzi, łącząca muzykę, taniec, graffiti i rap. Dziś jest globalnym
						fenomenem kształtującym kulturę i społeczeństwo.
					</p>
				</Card>
				<Card
					title='Wartości Hip-hopu'
					icon={iconChartRadar}
					variant={"skew"}
					className={styles["second-card"]}>
					<p className={"card__text"}>
						Hip-hop to nie tylko muzyka, to także filozofia życia. Obejmuje
						wartości takie jak samowiedza, wyrażanie siebie i walka z
						niesprawiedliwością społeczną.
					</p>
				</Card>
				<Card
					title='Wielcy Hip-hopowi Artyści'
					icon={iconFriends}
					variant={"skew"}>
					<p className={"card__text"}>
						Hip-hop to gatunek, który wydał na świat wielu niezapomnianych
						artystów, od Tupaca Shakura i Notorious B.I.G. po Kendricka Lamara i
						Cardi B. Ich muzyka inspiruje i podnosi świadomość społeczną.
					</p>
				</Card>
			</Cards>
			<Cards id='aboutus' className={styles["aboutus"]}>
				<Card
					title='Marian'
					variant={"normal"}
					className={styles["aboutus__card"]}>
					<ImageLoader alt='Baker vokalista' variant='baker' />
				</Card>
				<Card
					title='Marian'
					variant={"normal"}
					className={styles["aboutus__card"]}>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='marian'
					/>
				</Card>
				<Card
					title='Marian'
					variant={"normal"}
					className={styles["aboutus__card"]}>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='neo'
					/>
				</Card>
				<Card
					title='Marian'
					variant={"normal"}
					className={styles["aboutus__card"]}>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='david'
					/>
				</Card>
			</Cards>
			<br></br>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</main>
	);
}
