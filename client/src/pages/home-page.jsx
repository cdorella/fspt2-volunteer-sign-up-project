import React from "react";
import "bootstrap/dist/css/bootstrap.css";
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
				<h1>ESPERANÇA PROJECT</h1>
				<button onClick={this.getEvents}>Click here for future events:</button>
				{displayEvents}
			</div>
		);
	}
}

export default HomePage;
