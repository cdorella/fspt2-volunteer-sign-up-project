import React from "react";
import { Card, CardText, CardTitle, Button, Row } from "reactstrap";

import DisplayDate from "../components/display-date";

const DisplayEvents = ({ events, idHandler }) => {
	return (
		<div>
			<li>
				{events.map(event => (
					<div className="content">
						<div key={event.id}>
							<Row sm="4" className="row">
								<Card body>
									<CardTitle className="card_title">Date & Route:</CardTitle>
									<CardText className="card_text">
										<DisplayDate date={event.date} />
										{` - ${event.route} Route`}
									</CardText>
									<Button
										onClick={() => idHandler(event.id)}
										className="card_button"
									>
										Select
									</Button>
								</Card>
							</Row>
						</div>
					</div>
				))}
			</li>
		</div>
	);
};

export default DisplayEvents;
