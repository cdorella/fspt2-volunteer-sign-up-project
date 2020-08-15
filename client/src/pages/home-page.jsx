import React from "react";
import "./home-page.css";
import "bootstrap/dist/css/bootstrap.css";
import { Card, CardText, CardTitle, Button, Row } from "reactstrap";

import EventDetails from "../components/event-details";
import DisplayDate from "../components/display-date";

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

	getEventByID = eventId => () => {
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

		let displayEvents = events.map(event => {
			const { id, date, route } = event;
			return (
				<div key={id}>
					<li>
						<div className="content">
							<Row sm="4" className="row">
								<Card body>
									<CardTitle className="card_title">Date & Route:</CardTitle>
									<CardText className="card_text">
										<DisplayDate date={date} />
										{` - ${route} Route`}
									</CardText>
									<Button
										onClick={this.getEventByID(id)}
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
				{eventsLoaded && displayEvents}
				<br></br>
				{selectedEvent && <EventDetails {...eventDetails} />}
				<br></br>
			</div>
		);
	}
}

export default HomePage;
