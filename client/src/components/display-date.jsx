const DisplayDate = props => {
	let displayDate = props.date;
	displayDate = displayDate
		.split("-")
		.map(e => (e[0] === "0" ? e.slice(1) : e));
	displayDate = displayDate[2] + "/" + displayDate[1] + "/" + displayDate[0];

	return displayDate;
};

export default DisplayDate;
