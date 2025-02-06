import "../../styling/pagination.css";

const Pagination = (currentPage, totalPages, onPageChange) => {
	return (
		<div className="pagination-container">
			<button>Next</button>
			<button>1</button>
			<button>2</button>
			<button>3</button>
			<button>Previous</button>
		</div>
	);
};

export default Pagination;
