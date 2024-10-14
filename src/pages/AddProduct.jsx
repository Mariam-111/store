import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Alert,
} from "@material-tailwind/react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 }, // Initialize rating with rate and count
  });
  const [error, setError] = useState(null); // State for tracking error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value, // Convert price to a number
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state on new submission

    try {
      await axios.post(`${import.meta.env.VITE_API}/products`, product);
      navigate("/products"); // Navigate back to the products page after adding a product
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product. Please check your input and try again."); // Set error message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardBody>
          <Typography variant="h5" className="mb-6 text-center">
            Add New Product
          </Typography>
          {error && (
            <Alert color="red" className="mb-4">
              {error}
            </Alert>
          )}{" "}
          {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="text"
                label="Title"
                name="title"
                value={product.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                label="Price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                label="Description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                label="Category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                label="Image URL"
                name="image"
                value={product.image}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                label="Rating Rate"
                name="ratingRate"
                value={product.rating.rate}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    rating: { ...prev.rating, rate: Number(e.target.value) },
                  }))
                }
                required
              />
            </div>
            <div className="mb-4">
              <Input
                label="Rating Count"
                type="number"
                name="rating.count"
                value={product.rating.count}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    rating: { ...prev.rating, count: Number(e.target.value) }, // Update rating count
                  }))
                }
                required
              />
            </div>
            <CardFooter className="flex justify-center">
              <Button type="submit" color="blue">
                Add Product
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddProduct;
