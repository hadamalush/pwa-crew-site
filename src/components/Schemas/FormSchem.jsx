import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerSchema = yup.object().shape({
	email: yup
		.string()
		.email("Proszę podać poprawny adres email!")
		.required("Wymagane"),
	password: yup
		.string()
		.min(7, "Hasło musi posiadać przynajmniej 7 znaków")
		.matches(passwordRules, "Min. 1 znak,1 cyfra ,1 duża i mała litera")
		.required("Wymagane"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Hasła muszą być udentyczne.")
		.required("Wymagane"),
	terms: yup.boolean().oneOf([true], "Musisz zaakceptować warunki umowy"),
});

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email("Proszę podać poprawny adres email!")
		.required("Wymagane"),
	password: yup.string().required("Wymagane"),
});
