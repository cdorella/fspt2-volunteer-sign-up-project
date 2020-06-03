import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./selected-event.css";
//import RegistrationForm from "./registration-form";

import {
	Card,
	CardText,
	CardTitle,
	CardSubtitle,
	Button,
	Row,
	Col,
} from "reactstrap";

const EventDetails = ({ date, route, tasks }) => {
	let displayDate = date;
	displayDate = displayDate
		.split("-")
		.map(e => (e[0] === "0" ? e.slice(1) : e));
	displayDate = displayDate[2] + "/" + displayDate[1] + "/" + displayDate[0];

	return (
		<div>
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
									<Button className="card_button">Select</Button>
								</CardText>
							))}
						</Card>
					</Col>
				</Row>
			</li>
		</div>
	);
};

export default EventDetails;
