"use client";
import Input from "../../Input/Input";
import WrapperInput from "../../Wrappers/WrapperInput";
import IconRender from "@/components/Icons/IconRender";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import styles from "../../../../styles/components/transitions/Forms/Login/LoginForm.module.scss";
import { useRouter } from "next/navigation";

const LoginForm = ({ className, ...props }) => {
	const router = useRouter();
	const classes = `${styles["logreg-box"]} ${className}`;

	const changeWebstiteHandler = async event => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			console.log("object");
			router.replace("/rejestracja");
		}, 500);
	};

	return (
		<div className={classes} id={"form"}>
			<form>
				<h1>Logowanie</h1>
				<WrapperInput className={styles["logreg-box__input-box"]}>
					<Input
						type='text'
						name='email'
						id='email'
						placeholder='Email'
						arialabel={"Email"}
					/>
					<IconRender variant='email' />
				</WrapperInput>
				<WrapperInput className={styles["logreg-box__input-box"]}>
					<Input
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						arialabel={"Password"}
					/>
					<IconRender variant='lock' />
				</WrapperInput>
				<WrapperInput className={styles["logreg-box__remember-forgot"]}>
					<input type='checkbox' />
					<label>Pamiętaj</label>
					<Link href='/'> Zapomniałeś hasła?</Link>
				</WrapperInput>
				<ButtonMain variant={"btnSkewRight"}> Zaloguj </ButtonMain>

				<p>
					Nie masz konta?{" "}
					<Link href='/rejestracja' onClick={changeWebstiteHandler}>
						Zarejestruj
					</Link>
				</p>
			</form>
		</div>
	);
};

export default LoginForm;
