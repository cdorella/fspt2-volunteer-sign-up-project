import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Alert, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";

import ConfirmationPopUp from "./confirmation-popup";

class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			userConfirmed: false,
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

	handleSubmit = event => {
		event.preventDefault();
	};

	handleFinalConfirmation = async () => {
		const id = this.props.id;
		const userInfo = await this.registerUser();
		this.saveUserToTask(userInfo.volunteer_id);
		this.adjustSpots(id);
		this.setState({
			userConfirmed: true,
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
		});
	};

	registerUser = async () => {
		const request = await fetch("api/registration", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				email: this.state.email,
				phone_number: this.state.phone_number,
			}),
		})
			.then(response => response.json())
			.catch(err => console.log(err));

		return request;
	};

	saveUserToTask = volunteer_id => {
		fetch("api/events/attend", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				selected_task_id: this.props.id,
				volunteer_id: volunteer_id,
			}),
		})
			.then(response => response.json())
			.catch(err => console.log(err));
	};

	adjustSpots = id => {
		fetch(`api/events/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				spots_available: this.props.spots,
			}),
		})
			.then(response => response.json())
			.catch(err => console.log(err));
	};

	render() {
		const { id, name, date, route } = this.props;
		const { userConfirmed } = this.state;
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<h5>Please add your details below:</h5>
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
					{
						<ConfirmationPopUp
							id={id}
							name={name}
							date={date}
							route={route}
							handleFinalConfirmation={this.handleFinalConfirmation}
						>
							Submit
						</ConfirmationPopUp>
					}
				</Form>

				{userConfirmed && (
					<Alert color="dark">
						Thank you! A confirmation email has been sent to you. If you need to
						cancel your participation, please let us know in advance by email:
						esperanca_barcelona@esperanca.com
						<p>
							{" "}
							<a href="/" className="alert-link">
								Back to Home Page
							</a>
						</p>
					</Alert>
				)}
			</div>
		);
	}
}
export default RegistrationForm;
