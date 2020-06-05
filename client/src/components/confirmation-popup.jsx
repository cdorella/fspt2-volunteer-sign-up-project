import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmationPopUp = props => {
	const { className, name, date, route } = props;

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const handleConfirmation = () => {
		toggle();
		props.handleFinalConfirmation();
		// props.registerUser();
		// props.saveUserToTask();
	};

	const handleCancellation = () => {
		toggle();
		window.location.reload();
	};

	return (
		<div>
			<Button className="card_button" onClick={toggle}>
				Submit
			</Button>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Confirmation</ModalHeader>
				<ModalBody>
					You have selected the following task: <br></br>
					<strong>{name}</strong> on <strong>{date}</strong> for{" "}
					<strong>{route}</strong> Route. <br></br>
					Do you wish to confirm?
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={handleConfirmation}>
						Yes, please
					</Button>{" "}
					<Button color="secondary" onClick={handleCancellation}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default ConfirmationPopUp;
