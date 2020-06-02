import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./about-page.css";

const About = () => {
	return (
		<div>
			<h1>About Us</h1>
			<hr />
			<h5>
				We are a community of volunteers that go out to neighborhoods of
				Barcelona to hand out food and talk to people living on the streets.
			</h5>
			<br></br>
			<h6>
				We go out every Saturday and Sunday evening between 6-8pm depending on
				the season, with two different central routes in Barcelona.{" "}
			</h6>
			<h6>To get involved, please sign up through our Home Page.</h6>
			<hr />
		</div>
	);
};

export default About;
