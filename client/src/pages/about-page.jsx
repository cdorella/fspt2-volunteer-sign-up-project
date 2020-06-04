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
			<h5 className="small-title">
				We go out every Saturday and Sunday evening between 6-8pm depending on
				the season, with two different central routes in Barcelona.{" "}
			</h5>
			<h5 className="small-title">
				To get involved, please sign up through our{" "}
				<a href="/" className="homepage-link">
					Home Page
				</a>
				.
			</h5>
			<hr />
		</div>
	);
};

export default About;
