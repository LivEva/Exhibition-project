import "../../styling/pagination.css";

const Pagination = ({ setEachPage, eachPage }) => {
	return (
		<div>
			<button
				onClick={() => setEachPage((prev) => Math.max(prev - 1, 1))}
				disabled={eachPage === 1}
			>
				Previous
			</button>
			<span>Page {eachPage}</span>
			<button onClick={() => setEachPage((prev) => prev + 1)}>Next</button>
		</div>
	);
};

export default Pagination;
