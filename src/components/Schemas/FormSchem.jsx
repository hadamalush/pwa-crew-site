import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const SUPPORTED_FORMATS = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/jpg",
];

const message = {
	pl: {
		wrongEmail: "Proszę podać poprawny adres email!",
		passMin: "Hasło musi posiadać min. 7 znaków.",
		passStrong: "Min. 1 znak,1 cyfra ,1 duża i mała litera.",
		passIdentical: "Hasła muszą być udentyczne",
		terms: "Musisz zaakceptować warunki umowy",
		required: "Wymagane.",
	},
	en: {
		wrongEmail: "Please provide a valid email address!",
		passMin: "The password must have at least 7 char.",
		passStrong: "Min. 1 char. ,1 num, 1 upper. and lower",
		passIdentical: "Passwords must be udentical",
		terms: "You must accept the terms.",
		required: "Required.",
	},
};

export const registerSchema = lang => {
	return yup.object().shape({
		email: yup
			.string()
			.email(message[lang].wrongEmail)
			.required(message[lang].required),
		password: yup
			.string()
			.min(7, message[lang].passMin)
			.matches(passwordRules, message[lang].passStrong)
			.required(message[lang].required),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password")], message[lang].passIdentical)
			.required(message[lang].required),
		terms: yup.boolean().oneOf([true], message[lang].terms),
	});
};

export const loginSchema = lang => {
	return yup.object().shape({
		email: yup
			.string()
			.email(message[lang].wrongEmail)
			.required(message[lang].required),
		password: yup.string().required(message[lang].required),
	});
};

export const forgotLinkSchema = lang => {
	return yup.object().shape({
		email: yup
			.string()
			.email(message[lang].wrongEmail)
			.required(message[lang].required),
	});
};

export const forgotNewPasswordSchema = lang => {
	return yup.object().shape({
		password: yup
			.string()
			.min(7, message[lang].passMin)
			.matches(passwordRules, message[lang].passStrong)
			.required(message[lang].required),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password")], message[lang].passIdentical)
			.required(message[lang].required),
	});
};

export const contactSchema = lang => {
	const messageContact = {
		pl: {
			titleMinChar: "Minimum 10 znaków",
			titleMaxChar: "Maksimum 60 znaków.",
			messageMinChar: "Minimum 50 znaków",
			messageMaxChar: "Maksimum 800 znaków",
		},
		en: {
			titleMinChar: "Minimum 10 characters",
			titleMaxChar: "Maximum 60 characters.",
			messageMinChar: "Minimum 50 character",
			messageMaxChar: "Maximum 800 characters",
		},
	};

	return yup.object().shape({
		email: yup
			.string()
			.email(message[lang].wrongEmail)
			.required(message[lang].required),
		title: yup
			.string()
			.min(10, messageContact[lang].titleMinChar)
			.max(60, messageContact[lang].titleMaxChar)
			.required(message[lang].required),
		message: yup
			.string()
			.min(50, messageContact[lang].messageMinChar)
			.max(800, messageContact[lang].messageMaxChar)
			.required(message[lang].required),
	});
};

export const eventSchema = (lang, variant) => {
	const messageEvent = {
		pl: {
			titleMin: "Minimum 5 znaków",
			titleMax: "Tytuł nie może przekraczać 30 znaków",
			townMin: "Minimum 2 znaki",
			townMax: "Maksimum 30 znaków",
			codePostMin: "Minimum 5 znaków",
			codePostMax: "Minimum 6 znaków",
			streetMin: "Minimum 2 znaki",
			streetMax: "Maksimum 57 znaków",
			dateMin: "Nie można ustawić daty wstecz.",
			descriptionMin: "Minimum 50 znaków.",
			descriptionMax: "Minimum 300 znaków.",
			fileMaxSize: "Maksymalny rozmiar pliku to 4 MB",
			allowedFormats: "Dozwolone formaty: jpg, jpeg, png, webp",
		},
		en: {
			titleMin: "Minimum 5 characters",
			titleMax: "The title must not exceed 30 characters",
			townMin: "Minimum 2 characters",
			townMax: "Maximum 30 characters",
			codePostMin: "Minimum 5 characters",
			codePostMax: "Minimum 6 characters",
			streetMin: "Minimum 2 characters",
			streetMax: "Maximum 57 characters",
			dateMin: "Date cannot be set backwards.",
			descriptionMin: "Minimum 50 characters.",
			descriptionMax: "Minimum 300 characters.",
			fileMaxSize: "The maximum file size is 4 MB",
			allowedFormats: "Allowed formats: jpg, jpeg, png, webp",
		},
	};

	const fileImgIfIsEdit = yup.mixed().when("file", (val, schema) => {
		if (val?.length > 0) {
			return yup
				.mixed()
				.test("fileSize", messageEvent[lang].fileMaxSize, function (value) {
					if (value?.size) {
						return value?.size <= 4 * 1024 * 1024;
					}
					return true;
				})
				.test("fileType", messageEvent[lang].allowedFormats, function (value) {
					if (value?.type) {
						return SUPPORTED_FORMATS.includes(value.type);
					}
					return true;
				});
		} else {
			return yup.mixed().notRequired();
		}
	});

	const fileImgIfIsAdd = yup
		.mixed()
		.required(message[lang].required)
		.test("fileSize", messageEvent[lang].fileMaxSize, function (value) {
			return value && value.size <= 4 * 1024 * 1024;
		})
		.test("fileType", messageEvent[lang].allowedFormats, function (value) {
			return value && SUPPORTED_FORMATS.includes(value.type);
		});

	const fileImgDependsVariant = variant ? fileImgIfIsEdit : fileImgIfIsAdd;

	console.log("file! ", fileImgDependsVariant);

	return yup.object().shape({
		title: yup
			.string()
			.min(5, messageEvent[lang].titleMin)
			.max(30, messageEvent[lang].titleMax)
			.required(message[lang].required),
		town: yup
			.string()
			.min(2, messageEvent[lang].townMin)
			.max(30, messageEvent[lang].townMax)
			.required(message[lang].required),
		codePost: yup
			.string()
			.min(5, messageEvent[lang].codePostMin)
			.max(6, messageEvent[lang].codePostMax)
			.required(message[lang].required),
		street: yup
			.string()
			.min(2, messageEvent[lang].streetMin)
			.max(57, messageEvent[lang].streetMax)
			.required(message[lang].required),
		date: yup
			.date()
			.required(message[lang].required)
			.min(new Date(Date.now()), messageEvent[lang].dateMin),
		time: yup.string().required(message[lang].required),
		description: yup
			.string()
			.min(50, messageEvent[lang].descriptionMin)
			.max(300, messageEvent[lang].descriptionMax)
			.required(message[lang].required),
		fileImg: fileImgDependsVariant,
	});
};

//Separate schema for just inputFormiFile ,because it need an object for the validateAt function
export const fileSchema = yup.object().shape({
	fileImg: yup
		.mixed()
		.required("")
		.test("fileSize", "", function (value) {
			return value && value.size <= 4 * 1024 * 1024;
		})
		.test("fileType", "", function (value) {
			return value && SUPPORTED_FORMATS.includes(value.type);
		}),
});
