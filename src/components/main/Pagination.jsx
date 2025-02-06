import "../../styling/pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handleChange = (event) => {
		console.log(event.target.value);
		event.preventDefault();
		onPageChange(event);
	};
	return (
		<div className="pagination-container">
			<button onClick={handleChange}>Next</button>
			<button>1</button>
			<button>2</button>
			<button>3</button>
			<button>Previous</button>
		</div>
	);
};

export default Pagination;
