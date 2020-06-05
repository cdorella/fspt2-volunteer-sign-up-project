import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./event-details.css";
import RegistrationForm from "./registration-form";
import {
	Card,
	CardText,
	CardTitle,
	CardSubtitle,
	Button,
	Row,
	Col,
} from "reactstrap";

class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDate: "",
			selectedRoute: "",
			selectedSpotsAvailable: 0,
			selectedTask: false,
			selectedTaskId: 0,
			selectedTaskName: "",
		};
	}

	getRegistrationForm = (date, route, spots, id, name) => {
		const newSpots = spots - 1;
		this.setState({
			selectedDate: date,
			selectedRoute: route,
			selectedSpotsAvailable: newSpots,
			selectedTask: true,
			selectedTaskId: id,
			selectedTaskName: name,
		});
	};

	render() {
		const { date, route, tasks } = this.props;
		const {
			selectedDate,
			selectedRoute,
			selectedSpotsAvailable,
			selectedTask,
			selectedTaskId,
			selectedTaskName,
		} = this.state;

		let displayDate = date;
		displayDate = displayDate
			.split("-")
			.map(e => (e[0] === "0" ? e.slice(1) : e));
		displayDate = displayDate[2] + "/" + displayDate[1] + "/" + displayDate[0];

		return (
			<div>
				{selectedTask ? (
					<RegistrationForm
						date={selectedDate}
						route={selectedRoute}
						spots={selectedSpotsAvailable}
						id={selectedTaskId}
						name={selectedTaskName}
					/>
				) : (
					<div>
						<h5 className="small-title">Please select a task:</h5>
						<li>
							<Row className="row">
								<Col sm="4">
									<Card body className="text-center">
										<CardTitle className="card_title">{`${displayDate} - ${route} Route`}</CardTitle>
										{tasks.map(task => (
											<CardText className="text-center card_text">
												<div key={task.id}>
													<CardSubtitle className="text-center card_subtitle">
														<li>{`${task.task_name}`}</li>
													</CardSubtitle>
													<li>{`${task.task_description}`}</li>
													<li>
														{task.spots_available <= 0
															? "No spots left"
															: `Volunteers Needed: ${task.spots_available}`}
													</li>
												</div>
												<Button
													className="card_button"
													onClick={() =>
														this.getRegistrationForm(
															displayDate,
															route,
															task.spots_available,
															task.id,
															task.task_name
														)
													}
												>
													Select
												</Button>
											</CardText>
										))}
									</Card>
								</Col>
							</Row>
						</li>
					</div>
				)}
			</div>
		);
	}
}

export default EventDetails;
