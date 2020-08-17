import React from "react";
import "./home-page.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "reactstrap";

import EventDetails from "../components/event-details";
import DisplayEvents from "../components/display-events";

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			eventsLoaded: false,
			events: [],
			selectedEvent: false,
			eventDetails: {},
		};
	}

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

	idHandler = id => {
		this.getEventByID(id);
	};

	getEventByID = eventId => {
		fetch(`/api/events/${eventId}`)
			.then(response => response.json())
			.then(response => {
				this.setState({
					eventDetails: response,
					eventsLoaded: false,
					selectedEvent: true,
				});
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

	render() {
		const { events, eventsLoaded, selectedEvent, eventDetails } = this.state;

		return (
			<div>
				<h1>
					Esperança Project{" "}
					<span role="img" aria-label="four leaf clover">
						🍀
					</span>
				</h1>
				<hr />
				{eventsLoaded ? (
					<div>
						<h4>Next events:</h4>
					</div>
				) : (
					<div>
						<h5>Welcome to our sign up page!</h5>
						<div>
							<Button onClick={this.getEvents} color="success">
								Click here for future dates
							</Button>
						</div>
					</div>
				)}
				<hr />
				{eventsLoaded && (
					<DisplayEvents idHandler={this.idHandler} events={events} />
				)}
				<br></br>
				{selectedEvent && <EventDetails {...eventDetails} />}
				<br></br>
			</div>
		);
	}
}

export default HomePage;
