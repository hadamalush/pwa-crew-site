import { redirect } from "next/navigation";

const Wydarzenia = ({ params: { lang } }) => {
	redirect("/pl/login");

	return null;
};

export default Wydarzenia;
