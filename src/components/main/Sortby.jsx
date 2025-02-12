const SortBy = (props) => {
	const {
		setSearchParams,
		setSortByCriteria,
		setSortOrder,
		sortByCriteria,
		sortOrder,
	} = props;

	const handleSortBy = (event) => {
		const value = event.target.value;
		setSortByCriteria(value);
		setSearchParams({ sort_by: value, order: sortOrder });
	};

	const handleOrderBy = () => {
		const newOrder = sortOrder === "asc" ? "desc" : "asc";
		setSortOrder(newOrder);
		setSearchParams({ sort_by: sortByCriteria, order: newOrder });
	};

	return (
		<div>
			<select value={sortByCriteria} onChange={handleSortBy}>
				<option value="title">Title</option>
				<option value="date">Date</option>
				<option value="type">Type</option>
			</select>

			<button onClick={handleOrderBy}>
				{sortOrder === "asc" ? "Ascending" : "Descending"}
			</button>
		</div>
	);
};
export default SortBy;
