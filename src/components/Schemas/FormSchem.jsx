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

const SUPPORTED_FORMATS = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/jpg",
];

export const eventSchema = yup.object().shape({
	title: yup
		.string()
		.min(5, "Minimum 5 znaków")
		.max(30, "Tytuł nie może przekraczać 30 znaków")
		.required("Wymagane"),
	town: yup
		.string()
		.min(2, "Minimum 2 znaki")
		.max(30, "Maksiumum 30 znaków")
		.required("Wymagane"),
	codePost: yup
		.string()
		.min(5, "Minimum 5 znaków")
		.max(6, "Maksimum 6 znaków")
		.required("Wymagane"),
	street: yup
		.string()
		.min(2, "Minimum 2 znaki")
		.max(57, "Maksimum 57 znaków")
		.required("Wymagane"),
	date: yup
		.date()
		.required("Wymagane")
		.min(new Date(Date.now()), "Nie można ustawić daty wstecz"),
	time: yup.string().required("Wymagane"),
	description: yup
		.string()
		.min(50, "Minimum 50 znaków.")
		.max(300, "Maksimum 300 znaków.")
		.required("Wymagane"),
	fileImg: yup
		.mixed()
		.required("Wymagane")
		.test("fileSize", "Maksymalny rozmiar pliku to 4 MB", function (value) {
			return value && value.size <= 4 * 1024 * 1024;
		})
		.test(
			"fileType",
			"Dozwolone formaty to: jpg, jpeg, png, webp",
			function (value) {
				return value && SUPPORTED_FORMATS.includes(value.type);
			}
		),
});
