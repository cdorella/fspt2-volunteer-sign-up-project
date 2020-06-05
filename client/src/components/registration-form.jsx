import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./registration-form.css";
import { Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
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

	handleSubmit = async event => {
		event.preventDefault();
		const userInfo = await this.registerUser();
		this.saveUserToTask(userInfo.volunteer_id);
	};

	// POSTING NO LONGER WORKING :(
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
		fetch("api/registration", {
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

	render() {
		const { id, name, date, route } = this.props;
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
							saveUserToTask={this.saveUserToTask}
						>
							Submit
						</ConfirmationPopUp>
					}
				</Form>
			</div>
		);
	}
}
export default RegistrationForm;
