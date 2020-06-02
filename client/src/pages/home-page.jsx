import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, CardText, CardTitle, Button, Row, Col } from "reactstrap";
import "./home-page.css";

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			eventsLoaded: false,
			events: [],
			// selectedEvent: false,
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
				//console.log(response);
				this.setState({
					eventDetails: response,
					eventsLoaded: false,
					// selectedEvent: true,
				});
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

	render() {
		let displayEvents = this.state.events.map(event => {
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
						<Row className="row">
							<Col sm="3">
								<Card body>
									<CardTitle className="card_title">Date & Route:</CardTitle>
									<CardText className="card_text">{`${displayDate} - ${route} Route`}</CardText>
									<Button
										onClick={this.getEventByID(id)}
										className="card_button"
									>
										Select
									</Button>
								</Card>
							</Col>
						</Row>
					</li>
				</div>
			);
		});

		// let displaySelectEvent = Object.entries(this.state.eventDetails).map(
		// 	entry => {
		// 		const [key, value] = entry;

		// 		return (
		// 			<div>
		// 				<li key={key}>
		// 					{key}: {value}
		// 				</li>
		// 			</div>
		// 		);
		// 	}
		// );

		return (
			<div>
				<h1>
					Esperança Project{" "}
					<span role="img" aria-label="four leaf clover">
						🍀
					</span>
				</h1>
				<hr />
				<h5>Welcome to our sign up page</h5>
				<br></br>
				<Button
					onClick={this.getEvents}
					className="home_button"
					color="success"
				>
					Click here for future dates:
				</Button>{" "}
				<hr />
				{this.state.eventsLoaded && displayEvents}
				{/* {this.state.selectedEvent && displaySelectEvent} */}
			</div>
		);
	}
}

export default HomePage;
