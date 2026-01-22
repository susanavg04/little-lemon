import { useEffect, useState } from "react";
import { addItemToCart } from "../Model/Cartservices";
import { getDishById } from "../Model/Database_SQLite";

export default function Usedishdetailviewmodel(dishId) {
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState([
    { name: "Feta", price: 1.0, selected: false },
    { name: "Parmesan", price: 1.0, selected: false },
    { name: "Dressing", price: 1.0, selected: false },
  ]);

  useEffect(() => {
    const fetchDish = async () => {
      const data = await getDishById(dishId);
      if (data) setDish(data);
      else console.warn("Dish not found:", dishId);
    };
    fetchDish();
  }, [dishId]);

  const toggleOption = (index) => {
    const newOptions = [...options];
    newOptions[index].selected = !newOptions[index].selected;
    setOptions(newOptions);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const addToCart = async () => {
    const selectedOptions = options.filter(o => o.selected);
        const item = {
      ...dish,
      quantity,
      options: selectedOptions,
    };
    try{
      await addItemToCart(item);
      console.log("Item added to cart:", item);
      alert("✅ Item added to cart!");
    }catch{
      console.error("Error adding item to cart:", error);
    }
  };
    


  return { dish, quantity, options, toggleOption, increaseQuantity, decreaseQuantity, addToCart };
};