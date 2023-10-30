import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";
import FormikAccount from "@/components/transitions/Forms/FormAccount/FormikAccount";
import ModalParallel from "@/components/transitions/Modal/ModalParallel";

export default async function SettingsModal({ params: { lang } }) {
	const dict = await getDictionaryElements(lang);
	const dictNotifi = await getDictionaryNotifi(lang);

	const translations = {
		trl_title: dict.settings.title,
		trl_changeEmail: dict.settings.changeEmail,
		trl_changePassword: dict.settings.changePassword,
		trl_changeAvatar: dict.settings.changeAvatar,
		trl_btn_confirm: dict.settings.btn_confirm,
		trl_error: dictNotifi.notifications.generalError,
	};

	return (
		<ModalParallel path='settings'>
			<FormikAccount dict={translations} lang={lang} />
		</ModalParallel>
	);
}
