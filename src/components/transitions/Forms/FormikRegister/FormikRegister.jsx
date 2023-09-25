"use client";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import CheckboxFormik from "../../Input/CheckboxFormik";
import InputFormik from "../../Input/InputFormik";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { registerSchema } from "@/components/Schemas/FormSchem";
import { useDispatch } from "react-redux";
import { showResult } from "@/global/notification-slice";

const FormikRegister = ({ className, ...props }) => {
	const router = useRouter();
	const classes = `${styles["logreg-box"]} ${className}`;
	const dispatch = useDispatch(showResult);

	const changeWebstiteHandler = async event => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			router.push("/logowanie");
		}, 500);
	};

	const onSubmit = async (values, actions) => {
		const email = values.email;
		const password = values.password;
		const confirmPassword = values.confirmPassword;
		const terms = values.terms;

		try {
			const response = await fetch("/api/auth/registration", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, confirmPassword, terms }),
			});

			const data = await response.json();

			if (!response.ok) {
				dispatch(
					showResult({
						message: data.message,
						variant: "warning",
					})
				);
				return;
			}
		} catch (error) {
			console.log(error);
			return;
		}

		dispatch(
			showResult({
				message: "Udało się zarejestrować",
				variant: "success",
			})
		);
		router.push("/");
	};

	return (
		<div className={classes} id='form'>
			<Formik
				initialValues={{
					email: "",
					password: "",
					confirmPassword: "",
					terms: false,
				}}
				onSubmit={onSubmit}
				validationSchema={registerSchema}>
				{props => (
					<Form>
						<h1>Rejestracja</h1>

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
						<InputFormik
							name='confirmPassword'
							placeholder='Powtórz hasło'
							aria-label='Powtórz hasło'
							type='password'
						/>

						<CheckboxFormik
							name='terms'
							label='Akceptuje warunki umowy'
							type='checkbox'
						/>

						<ButtonMain type='submit' variant={"btnSkewRight"}>
							{" "}
							Zarejestruj{" "}
						</ButtonMain>

						<p>
							Masz konto?{" "}
							<Link href='/logowanie' onClick={changeWebstiteHandler}>
								Zaloguj
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormikRegister;
