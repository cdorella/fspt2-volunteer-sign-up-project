import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";

class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
		};
	}

	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit(event) {
		event.preventDefault();
		this.registerUser();
	}

	registerUser = () => () => {
		const { first_name, last_name, email, phone_number } = this.state;

		fetch("/api/registration", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				first_name: first_name,
				last_name: last_name,
				email: email,
				phone_number: phone_number,
			}),
		})
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.log(err));
	};

	render() {
		return (
			<Form>
				<h5>Please add your details:</h5>
				<Row form className="row">
					<Col md={4}>
						<FormGroup>
							<Label for="first_name">First Name:</Label>
							<Input
								type="text"
								name="first_name"
								value={this.state.first_name}
								onChange={this.handleInputChange}
							/>
						</FormGroup>
					</Col>
					<Col md={4}>
						<FormGroup>
							<Label for="last_name">Last Name:</Label>
							<Input
								type="text"
								name="last_name"
								value={this.state.last_name}
								onChange={this.handleInputChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form className="row">
					<Col md={4}>
						<FormGroup>
							<Label for="email">Email Address:</Label>
							<Input
								type="text"
								name="email"
								value={this.state.email}
								onChange={this.handleInputChange}
							/>
						</FormGroup>
					</Col>
					<Col md={4}>
						<FormGroup>
							<Label for="phone_number">
								Phone Number: (Only numbers please)
							</Label>
							<Input
								type="text"
								name="phone_number"
								value={this.state.phone_number}
								onChange={this.handleInputChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Button onSubmit={() => this.handleSubmit}>Submit</Button>
			</Form>
		);
	}
}
export default RegistrationForm;
