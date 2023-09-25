"use client";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../../../global/session-slice";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import InputFormik from "../../Input/InputFormik";
import { loginSchema } from "@/components/Schemas/FormSchem";

const FormikLogin = ({ className, ...props }) => {
	const router = useRouter();
	const dispatch = useDispatch(logIn);
	const { data: session, status } = useSession();

	const classes = `${styles["logreg-box"]} ${className}`;

	useEffect(() => {
		if (status === "authenticated" && session) {
			dispatch(logIn(session.user));

			router.push("/");
			console.log(session.user);
		}
	}, [session, status]);

	const changeWebstiteHandler = async event => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			router.push("/rejestracja");
		}, 500);
	};

	const onSubmit = async (values, actions) => {
		const email = values.email;
		const password = values.password;

		try {
			response = await signIn("credentials", {
				redirect: false,
				email: email,
				password: password,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={classes} id='form'>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={onSubmit}
				validationSchema={loginSchema}>
				{props => (
					<Form>
						<h1>Logowanie</h1>

						<InputFormik
							name='email'
							placeholder='Email'
							aria-label='Email'
							type='text'
						/>
						<InputFormik
							name='password'
							placeholder='Hasło'
							aria-label='Hasło'
							type='password'
						/>

						<ButtonMain type='submit' variant={"btnSkewRight"}>
							{" "}
							Zaloguj{" "}
						</ButtonMain>

						<p>
							Masz konto?{" "}
							<Link href='/rejestracja' onClick={changeWebstiteHandler}>
								Zaloguj
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormikLogin;
