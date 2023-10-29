import ModalParallel from "@/components/transitions/Modal/ModalParallel";
import { getServerSession } from "next-auth";

export default async function NotificationModal({ params: { lang } }) {
	const session = await getServerSession();
	const email = session?.user?.email;

	const notifications = await getData(email);

	return <ModalParallel>dasdasd</ModalParallel>;
}
