import React from "react";
import "./image-container.css";
import "bootstrap/dist/css/bootstrap.css";

const ImageContainer = () => {
	return (
		<div className="about-container">
			<img
				id="image"
				src="https://cdn.stocksnap.io/img-thumbs/960w/hands-people_VJC05HAAMW.jpg"
				alt="hands"
				className="image-container"
			/>
		</div>
	);
};

export default ImageContainer;
