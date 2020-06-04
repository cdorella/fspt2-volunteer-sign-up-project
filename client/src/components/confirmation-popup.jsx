import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmationPopUp = props => {
	const { className, id } = props;

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const handleConfirmation = () => {
		toggle();
		props.saveUser();
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
					You have selected task {id}. Do you wish to confirm?
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
