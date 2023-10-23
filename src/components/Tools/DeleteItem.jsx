import React from "react";

const DeleteItem = ({ heading, children }) => {
	console.log(heading);
	const Heading = `h${heading}`;

	return (
		<>
			<Heading>{children}</Heading>
		</>
	);
};

export default DeleteItem;
