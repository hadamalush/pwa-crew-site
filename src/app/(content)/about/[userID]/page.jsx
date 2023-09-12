"use client";

const AboutUserPage = ({ params }) => {
	console.log(params.userID); // dynamic taking parames
	return <h1>{params.userID}</h1>;
};

export default AboutUserPage;
