import { useSearchParams } from "react-router";
import "../styling/pagination.css";

const PaginationElement = ({ setEachPage, eachPage, totalPages }) => {

	const [searchParams, setSearchParams] = useSearchParams();

	const handlePageChange = (page) => {
		setEachPage(page);
		setSearchParams((prevParams) => {
			const newParams = new URLSearchParams(prevParams);
			newParams.set('page', page);
			return newParams;
		});
	};

	return (
		<div className="pagination-container">
			<button
				onClick={() => handlePageChange(eachPage - 1)}
				disabled={eachPage <= 1}
				className="pag-button"
			>
				Previous
			</button>
			<span className="page-count">Page {eachPage}</span>
			<button onClick={() => handlePageChange(eachPage + 1 )} className="pag-button">Next</button>
		</div>
	);
};

export default PaginationElement;
