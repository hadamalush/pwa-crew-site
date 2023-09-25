"use client";
import WrapperInput from "../../Wrappers/WrapperInput";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Formik, Form } from "formik";
import InputFormik from "../../Input/InputFormik";
import { formSchem } from "@/components/Schemas/FormSchem";
import CheckboxFormik from "../../Input/CheckboxFormik";

const FormikRegister = ({ className, ...props }) => {
	const router = useRouter();

	const classes = `${styles["logreg-box"]} ${className}`;

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
		try {
			const response = await fetch("/api/auth/registration", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, confirmPassword }),
			});

			console.log(response);
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
					confirmPassword: "",
					terms: false,
				}}
				onSubmit={onSubmit}
				validationSchema={formSchem}>
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
							Zaloguj{" "}
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
