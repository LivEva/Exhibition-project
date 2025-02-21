import { useState } from "react";

const categories =  [

    { id: { harvardId: 17, vnaID: "THES48910" }, name: "Photographs" },
    { id: { harvardId: 19, vnaID: "THES49044" }, name: "Jewelry" },
    { id: { harvardId: 21, vnaID: "THES48966" }, name: "Drawings" },
    { id: { harvardId: 23, vnaID: "THES48903" }, name: "Prints" },
    { id: { harvardId: 26, vnaID: "THES48917" }, name: "Paintings" },
    { id: { harvardId: 30, vnaID: "THES48920" }, name: "Sculpture" },
    { id: { harvardId: 62, vnaID: "THES48885" }, name: "Textile Arts" },
    { id: { harvardId: 185, vnaID: "THES252988" }, name: "Manuscripts" },
    
  ];


const ObjectCategories = ({onSelect}) => {

    const [selectedCategories, setSelectedCategories] = useState("any");

    const handleChange = (event) => {

        const selectedCat = event.target.value;
      
        setSelectedCategories(selectedCat);

        if (selectedCat === "any") {
            onSelect(null);
          } else {
            const selectCat = categories.find(
              (cls) => JSON.stringify(cls.id) === selectedCat

            );

            onSelect(selectCat ? selectCat.id : null);
            
          }
    }

    return (

        <div>

        <select value={selectedCategories} onChange={handleChange}>
            <option value="any">All categories</option>
           {categories.map((cls) => (

            <option key={JSON.stringify(cls.id)} value={JSON.stringify(cls.id)}>{cls.name}</option>

           ))}
        </select>
        
        </div>
    )
}

export default ObjectCategories;