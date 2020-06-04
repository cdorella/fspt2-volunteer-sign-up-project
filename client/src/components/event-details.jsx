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
			selectedTask: false,
			selectedTaskId: 0,
			// selectedTaskName: "",
		};
	}

	getRegistrationForm = task_id => {
		this.setState({
			selectedTask: true,
			selectedTaskId: task_id,
			// selectedTaskName: task_name,
		});
	};

	render() {
		const { date, route, tasks } = this.props;
		const { selectedTask, selectedTaskId } = this.state;
		let displayDate = date;
		displayDate = displayDate
			.split("-")
			.map(e => (e[0] === "0" ? e.slice(1) : e));
		displayDate = displayDate[2] + "/" + displayDate[1] + "/" + displayDate[0];

		return (
			<div>
				{selectedTask ? (
					<RegistrationForm id={selectedTaskId} />
				) : (
					// <RegistrationForm id={selectedTaskId} task_name={selectedTaskName}/>
					<div>
						<h6 className="small-title">Please select a task:</h6>
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
													<li>{`Volunteers Needed: ${task.spots_available}`}</li>
												</div>
												<Button
													className="card_button"
													onClick={() =>
														this.getRegistrationForm(task.id, task.task_name)
													}
												>
													{/*onClick={this.getRegistrationForm(task.id, task.task_name)}  */}
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
