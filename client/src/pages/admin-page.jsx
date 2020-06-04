import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
	Alert,
	Col,
	Row,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import "./admin-page.css";

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			formLoaded: false,
			formSubmitted: false,
			date: "",
			route: "",
			task_name: "",
			task_description: "",
			spots_available: "",
		};
	}

	getForm = () => {
		this.setState({ formLoaded: true });
	};

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
		this.setState({
			formSubmitted: true,
		});
		this.addEvent();
	};

	addEvent = () => {
		const {
			date,
			route,
			task_name,
			task_description,
			spots_available,
		} = this.state;

		fetch("/api/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				date: date,
				route: route,
				task_name: task_name,
				task_description: task_description,
				spots_available: spots_available,
			}),
		})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(err => console.log(err));
	};

	render() {
		const {
			formLoaded,
			formSubmitted,
			date,
			route,
			task_name,
			task_description,
			spots_available,
		} = this.state;

		return (
			<div>
				<h1>Admin Page</h1>
				<hr />
				{formLoaded ? (
					<h5>Please add information below:</h5>
				) : (
					<div>
						<h5>Welcome Admin!</h5>
						<Button
							onClick={this.getForm}
							className="admin_button"
							color="success"
						>
							Click here to add new event:
						</Button>
					</div>
				)}
				<hr />
				{formLoaded && (
					<Form onSubmit={this.handleSubmit}>
						<Row form className="row">
							<Col md={2}>
								<FormGroup>
									<Label for="date">Date:</Label>
									<Input
										type="date"
										name="date"
										value={date}
										onChange={this.handleInputChange}
									/>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup>
									<Label for="route">Route:</Label>
									<Input
										type="text"
										name="route"
										value={route}
										onChange={this.handleInputChange}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row form className="row">
							<Col md={2}>
								<FormGroup>
									<Label for="task_name">Task Title:</Label>
									<Input
										type="text"
										name="task_name"
										value={task_name}
										onChange={this.handleInputChange}
									/>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup>
									<Label for="spots_available">Volunteers Needed:</Label>
									<Input
										type="number"
										name="spots_available"
										value={spots_available}
										onChange={this.handleInputChange}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Label for="task_description">Task Description:</Label>
								<Input
									type="text"
									name="task_description"
									value={task_description}
									onChange={this.handleInputChange}
								/>
							</Col>
						</Row>
						<br></br>
						<Button>Submit</Button>
					</Form>
				)}
				{formSubmitted && (
					<Alert color="dark">
						All set!
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

export default Admin;
