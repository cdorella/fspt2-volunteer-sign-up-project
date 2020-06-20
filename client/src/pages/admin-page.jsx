import React from "react";
import "./admin-page.css";
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
	Card,
	CardTitle,
	CardText,
} from "reactstrap";

import VolunteersList from "../components/volunteers-list";

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			formLoaded: false,
			formSubmitted: false,
			date: "",
			route: "",
			tasks: [
			   {
				task_name: "",
			    task_description: "",
				spots_available: "",
			  }
			],
			eventsLoaded: false,
			events: [],
			selectedEvent: false,
			volunteers: {},
		};
	}

	getForm = () => {
		this.setState({ formLoaded: true });
	};

	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		if (name !== "tasks") {
			this.setState({
			[name]: value,
		  });
		}
		
	};

	handleTasksChange = (event, index) => {
		let tasks = [...this.state.tasks]
		const currentTask = tasks[index]
		const name = event.target.name
		currentTask[name] = event.target.value

		this.setState({tasks: [...tasks]})

	}

	addTasks = e => {
		this.setState(prevState => ({
		  date: "",
		  route: "",
		  tasks: [
			...prevState.tasks,
			{ task_name: "", task_description: "", spots_available: "" }
		  ]
		}));
	  };

	handleSubmit = event => {
		event.preventDefault();
		this.addEvent();
		this.setState({
			formSubmitted: true,
			date: "",
			route: "",
			tasks: [
				{
		    	task_name: "",
				task_description: "",
				spots_available: "",
				}
			]
		});
	};

	addEvent = () => {
		const {
			date,
			route,
			tasks
		} = this.state;

		fetch("/api/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				date: date,
				route: route,
				tasks: tasks		
			}),
		})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(err => console.log(err));

	};

	getEvents = () => {
		fetch("/api/events")
			.then(response => response.json())
			.then(response => {
				this.setState({
					events: response,
					eventsLoaded: true,
					selectedEvent: false,
				});
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

	getEventVolunteersByID = eventId => () => {
		fetch(`/api/events/${eventId}/volunteers`)
			.then(response => response.json())
			.then(response => {
				this.setState({
					volunteers: response,
					eventsLoaded: false,
					selectedEvent: true,
				});
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

	render() {
		const {
			formLoaded,
			formSubmitted,
			date,
			route,
			tasks,
			events,
			eventsLoaded,
			selectedEvent,
			volunteers,
		} = this.state;

		let displayEvents = events.map(event => {
			const { id, date, route } = event;
			let displayDate = date;
			displayDate = displayDate
				.split("-")
				.map(e => (e[0] === "0" ? e.slice(1) : e));
			displayDate =
				displayDate[2] + "/" + displayDate[1] + "/" + displayDate[0];

			return (
				<div key={id}>
					<li>
						<div className="content">
							<Row sm="4" className="row">
								<Card body>
									<CardTitle className="card_title">Date & Route:</CardTitle>
									<CardText className="card_text">{`${displayDate} - ${route} Route`}</CardText>
									<Button
										onClick={this.getEventVolunteersByID(id)}
										className="card_button"
									>
										Select
									</Button>
								</Card>
							</Row>
						</div>
					</li>
				</div>
			);
		});

		return (
			<div>
				<h1>Admin Page</h1>
				<hr />
				{formLoaded ? (
					<h5>Please add information below:</h5>
				) : (
					<div>
						<h5>Welcome Admin!</h5>
						<div className="admin-buttons">
							<Button
								onClick={this.getForm}
								className="admin_button"
								color="success"
							>
								Click here to add new event
							</Button>
							<Button onClick={this.getEvents} color="success">
								Click here for list of events & volunteers
							</Button>
						</div>
					</div>
				)}
				<hr />
				{formSubmitted && (
					<Alert color="dark">
						Event added. Thank you!
						<p>
							{" "}
							<a href="/" className="alert-link">
								Back to Home Page
							</a>
						</p>
					</Alert>
				)}
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
						<div id="dynamicForm">
        					{tasks.map((task, idx) => (
        					<div key={idx}>
								<Row form className="row">
							<Col md={2}>
								<FormGroup>
									<Label for="task_name">Task Title:</Label>
									<Input
										type="text"
										name="task_name"
										value={task.task_name}
										onChange={(event) => this.handleTasksChange(event, idx)}
									/>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup>
									<Label for="spots_available">Volunteers Needed:</Label>
									<Input
										type="number"
										name="spots_available"
										value={task.spots_available}
										onChange={(event) => this.handleTasksChange(event, idx)}
									/>
								</FormGroup>
							</Col>
						 	<Col md={4}>
						 		<Label for="task_description">Task Description:</Label>
						 		<Input
						 			type="text"
						 			name="task_description"
						 			value={task.task_description}
						 			onChange={(event) => this.handleTasksChange(event, idx)}
						 		/>
						 	</Col>
						 </Row> 
						</div>
						 ))}
						 <Button onClick={this.addTasks}>Add new task to this event</Button>
						 </div>
						<br></br>
						<Button>Submit</Button>
						<hr />
						{eventsLoaded && (
							<div>
								<br></br>
								<h5>
									For a list of volunteers already signed up, please select
									event below:
								</h5>
							</div>
						)}
					</Form>
				)}
				{eventsLoaded && displayEvents}
				{selectedEvent && <VolunteersList {...volunteers} />}
				<br></br>
			</div>
		);
	}
}

export default Admin;
