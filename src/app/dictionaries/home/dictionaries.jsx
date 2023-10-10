import "server-only";

//importy
const dictionaries = {
	en: () => import("./en.json").then(module => module.default),
	pl: () => import("./pl.json").then(module => module.default),
};

export const getDictionaryHome = async locale => dictionaries[locale]();
