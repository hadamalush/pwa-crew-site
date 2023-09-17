import Navbar from "@/components/Navigation/SideBar";
const layout = props => {
	return (
		<div>
			<Navbar />
			{props.children}
		</div>
	);
};

export default layout;
