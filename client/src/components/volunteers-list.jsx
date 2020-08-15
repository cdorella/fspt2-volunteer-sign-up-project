import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, CardText, CardTitle, CardSubtitle, Row } from "reactstrap";
import DisplayDate from "./display-date";

const VolunteersList = ({ date, route, volunteers }) => {
	return (
		<div>
			<h5>Signed Up Volunteers:</h5>
			<li>
				<Row sm="4" className="row">
					<Card body className="text-center">
						<CardTitle className="card_title">
							{" "}
							<DisplayDate date={date} />
							{` - ${route} Route`}
						</CardTitle>

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
				</Row>
			</li>
		</div>
	);
};

export default VolunteersList;
