import "../styling/pagination.css";

const PaginationElement = ({ setEachPage, eachPage }) => {
	return (
		<div className="pagination-container">
			<button
				onClick={() => setEachPage((prev) => Math.max(prev - 1, 1))}
				disabled={eachPage === 1}
			>
				Previous
			</button>
			<span className="page-count">Page {eachPage}</span>
			<button onClick={() => setEachPage((prev) => prev + 1)}>Next</button>
		</div>
	);
};

export default PaginationElement;
