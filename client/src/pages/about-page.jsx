import React, { useState } from "react";
import "./about-page.css";
import ContactForm from "../components/contact-form";
import { Button, Modal, ModalBody } from "reactstrap";

const About = props => {
	const { className } = props;

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<div>
			<h1>About Us</h1>
			<hr />
			<h5>
				We are a community of volunteers that go out to neighborhoods of
				Barcelona to hand out food and talk to people living on the streets.
			</h5>
			<h5>
				We go out every Saturday and Sunday evening between 6-8pm depending on
				the season, with two different central routes in Barcelona.{" "}
			</h5>
			<h5>
				To get involved, please sign up through our{" "}
				<a href="/" className="homepage-link">
					Home Page
				</a>
				.
			</h5>
			<Button color="success" onClick={toggle}>
				Contact us
			</Button>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalBody>
					<ContactForm />
				</ModalBody>
			</Modal>
		</div>
	);
};

export default About;
