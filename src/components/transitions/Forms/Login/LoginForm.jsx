import styles from "../../../../styles/components/transitions/Forms/Login/LoginForm.module.scss";
import Input from "../../Input/Input";
import WrapperInput from "../../Wrappers/WrapperInput";
import IconRender from "@/components/Icons/IconRender";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";

const LoginForm = ({ className, ...props }) => {
	const classes = `${styles["logreg-box"]} ${className}`;
	return (
		<>
			<div className={classes}>
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
						<label>Remember me</label>
						<Link href='/'> Forgot password?</Link>
					</WrapperInput>
					<ButtonMain variant={"btnSkewRight"}> Zaloguj </ButtonMain>

					<p>
						Don't have an account? <Link href='registration'>Register</Link>
					</p>
				</form>
			</div>
		</>
	);
};

export default LoginForm;
