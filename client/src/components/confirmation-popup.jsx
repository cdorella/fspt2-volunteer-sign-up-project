import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmationPopUp = props => {
	const { className, name, date, route } = props;

	// I'm so proud!
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const handleConfirmation = () => {
		toggle();
		props.handleFinalConfirmation();
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
				<ModalHeader toggle={toggle} color="dark" className="modal-header">
					Confirmation
				</ModalHeader>
				<ModalBody className="modal-text">
					{/* nitpick: try to avoid using br for spacing, instead <p> or other ones might be better */}
					You have selected the following task: <br></br>
					<strong>{name}</strong> on <strong>{date}</strong> for{" "}
					<strong>{route}</strong> Route. <br></br>
					Do you wish to confirm?
				</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={handleConfirmation}>
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
