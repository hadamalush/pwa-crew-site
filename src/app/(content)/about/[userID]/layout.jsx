import Navbar from "@/components/Navigation/NavbarDesktop";
const layout = props => {
	return (
		<div>
			<Navbar />
			{props.children}
		</div>
	);
};

export default layout;
