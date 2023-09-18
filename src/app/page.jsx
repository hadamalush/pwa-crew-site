import HomeStartContent from "@/components/Content/HomeStartContent";
import IconRender from "@/components/Icons/IconRender";
import Cards from "@/components/transitions/Cards/Cards";
import Card from "@/components/transitions/Cards/Card";
import styles from "./page.module.scss";
import ImageLoader from "@/components/transitions/Image/ImageRender";
import HeadingTag from "@/components/transitions/Topography/HeadingTag";

export default function Home() {
	return (
		<main>
			<HomeStartContent />
			<Cards id='history' className={styles.history}>
				<HeadingTag type='h3'>Trochę o Hip-hopie</HeadingTag>
				<Card variant={"skew"}>
					<IconRender variant='history' />
					<HeadingTag type='h4' size='1'>
						Historia Hip-Hopu
					</HeadingTag>

					<p className={styles["history__text"]}>
						Hip-hop narodził się w Bronksie w latach 70. jako subkultura młodych
						ludzi, łącząca muzykę, taniec, graffiti i rap. Dziś jest globalnym
						fenomenem kształtującym kulturę i społeczeństwo.
					</p>
				</Card>
				<Card variant={"skew"}>
					<IconRender variant='chartRadar' />
					<HeadingTag type='h4' size='1'>
						Wartości Hip-Hopu
					</HeadingTag>
					<p className={styles["history__text"]}>
						Hip-hop to nie tylko muzyka, to także filozofia życia. Obejmuje
						wartości takie jak samowiedza, wyrażanie siebie i walka z
						niesprawiedliwością społeczną.
					</p>
				</Card>
				<Card variant={"skew"}>
					<IconRender variant='chartRadar' />
					<HeadingTag type='h4' size='1'>
						Wielcy Hip-Hopowi Artyści
					</HeadingTag>
					<p className={styles["history__text"]}>
						Hip-hop to gatunek, który wydał na świat wielu niezapomnianych
						artystów, od Tupaca Shakura i Notorious B.I.G. po Kendricka Lamara i
						Cardi B. Ich muzyka inspiruje i podnosi świadomość społeczną.
					</p>
				</Card>
			</Cards>
			<Cards id='aboutus' className={styles["aboutus"]}>
				<HeadingTag type='h3'>Nasz team</HeadingTag>
				<Card variant={"normal"}>
					<h4>Baker</h4>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='baker'
					/>

					<h5> Weteran sceny, bitowy magik. </h5>
					<p>
						Legenda hiphopu, skomplikowane bity to jego igraszki. Ma w sobie
						magię tworzenia, co sprawia, że nie ma mu równych na scenie.
					</p>
				</Card>
				<Card variant={"normal"}>
					<h4>Marian</h4>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='marian'
					/>
					<h5> Szybki flow, uliczna poezja. </h5>
					<p>
						Wystrzałowy talent, rapuje z pasją i szybkością, jak uliczny poet.
						Jego teksty to esencja życia na ulicach miasta, bez owijania w
						bawełnę.
					</p>
				</Card>
				<Card variant={"normal"}>
					<h4>Neo</h4>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='neo'
					/>
					<h5> Technologiczny vibe.</h5>
					<p>
						Hiphop przyszłości, rymuje o technologii i przemianach społecznych.
						Jego flow jest równie futurystyczny jak teksty, które płyną jak
						strumień danych.
					</p>
				</Card>
				<Card variant={"normal"}>
					<h4>David</h4>
					<ImageLoader
						alt='Mężczyzna grający na gitarze, na koncercie'
						variant='david'
					/>
					<h5> Historie życiowe, głębokie teksty. </h5>
					<p>
						Opowiada o życiowych historiach, w jego rapach tkwi głębia emocji.
						Słowa Davida wnikają w duszę, przekazując prawdziwe doświadczenia z
						ulic.
					</p>
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
