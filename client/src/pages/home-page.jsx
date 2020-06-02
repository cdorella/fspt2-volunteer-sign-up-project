import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "reactstrap";
import "./home-page.css";

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			events: [],
			eventDetails: {},
		};
	}

	getEvents = () => {
		fetch("/api/events")
			.then(response => response.json())
			.then(response => {
				this.setState({ events: response });
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

	getEventByID(eventId) {
		fetch(`/api/events/${eventId}`)
			.then(response => response.json())
			.then(response => {
				this.setState({ eventDetails: response });
			})
			.catch(() => {
				this.setState({ error: true });
			});
	}

	render() {
		let displayEvents = this.state.events.map(event => {
			const { id, date, route } = event;
			return (
				<div key={id}>
					<ul>
						<li>
							{`${date} ${route}`}
							<button onClick={this.getEventByID(id)}>Select</button>
						</li>
					</ul>
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
				<h5>Welcome to our sign up page</h5>
				<br></br>
				<Button onClick={this.getEvents} color="success">
					Click here for future dates:
				</Button>{" "}
				{displayEvents}
			</div>
		);
	}
}

export default HomePage;
