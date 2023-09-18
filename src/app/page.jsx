import HomeStartContent from "@/components/Content/HomeStartContent";
import IconRender from "@/components/Icons/IconRender";
import Cards from "@/components/transitions/Cards/Cards";
import Card from "@/components/transitions/Cards/Card";
import styles from "./page.module.scss";

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
			<Cards id='cards__hitory'>
				<Card title='Historia Hip-Hopu' icon={iconStory}>
					Hip-hop narodził się w Bronksie w latach 70. jako subkultura młodych
					ludzi, łącząca muzykę, taniec, graffiti i rap. Dziś jest globalnym
					fenomenem kształtującym kulturę i społeczeństwo.
				</Card>
				<Card
					title='Wartości Hip-hopu'
					icon={iconChartRadar}
					className={styles["second-card"]}>
					Hip-hop to nie tylko muzyka, to także filozofia życia. Obejmuje
					wartości takie jak samowiedza, wyrażanie siebie i walka z
					niesprawiedliwością społeczną.
				</Card>
				<Card title='Wielcy Hip-hopowi Artyści' icon={iconFriends}>
					Hip-hop to gatunek, który wydał na świat wielu niezapomnianych
					artystów, od Tupaca Shakura i Notorious B.I.G. po Kendricka Lamara i
					Cardi B. Ich muzyka inspiruje i podnosi świadomość społeczną.
				</Card>
			</Cards>
			<Cards id='cards__aboutus' className={styles["cards__aboutus"]}></Cards>

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
