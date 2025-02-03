import { useParams } from "react-router";
import { getExhibitionItemById } from "../../API's/harvardApi";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const SingleExhibitionItem = () => {
	const [singleItem, setSingleItem] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { object_id } = useParams();

	useEffect(() => {
		getExhibitionItemById(object_id).then((response) => {
			setIsLoading(true);

			console.log(response.data);

			setSingleItem(response.data);

			console.log(singleItem, "singleitem");

			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <h2>Loading exhibition item...</h2>;
	}

	return (
		<>
			<Link to={`/exhibition/${object_id}`}></Link>

			<h1>{singleItem.title}</h1>
			<img src={singleItem.image} alt="" />
		</>
	);
};

export default SingleExhibitionItem;
