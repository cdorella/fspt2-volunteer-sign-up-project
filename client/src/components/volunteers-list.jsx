import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
	Card,
	CardText,
	CardTitle,
	CardSubtitle,
	Button,
	Row,
	Col,
} from "reactstrap";

const VolunteersList = ({ date, route, volunteers }) => {
	let displayDate = date;
	displayDate = displayDate
		.split("-")
		.map(e => (e[0] === "0" ? e.slice(1) : e));
	displayDate = displayDate[2] + "/" + displayDate[1] + "/" + displayDate[0];

	return (
		<div>
			<h5 className="small-title">Signed Up Volunteers:</h5>
			<li>
				<Row className="row">
					<Col sm="4">
						<Card body className="text-center">
							<CardTitle className="card_title">{`${displayDate} - ${route} Route`}</CardTitle>

							{volunteers.map(volunteer => (
								<CardText className="text-center card_text">
									<div key={volunteer.id}>
										<CardSubtitle className="text-center card_subtitle">
											<li>{`${volunteer.task_name}`}</li>
										</CardSubtitle>
										<li>{`Name: ${volunteer.first_name} ${volunteer.last_name}`}</li>
										<li>{`Email: ${volunteer.email}`}</li>
										<li>{`Phone Number: ${volunteer.phone_number}`}</li>
									</div>
								</CardText>
							))}
						</Card>
					</Col>
				</Row>
			</li>
			<Button>
				<a href="/" className="back-to-home-link">
					Home Page
				</a>
			</Button>
		</div>
	);
};

export default VolunteersList;
