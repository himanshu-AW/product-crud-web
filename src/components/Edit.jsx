import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { ProductContext } from "../utils/Context";
import { toast } from 'react-toastify';

const Edit = () => {
  const [products, setProducts] = useContext(ProductContext);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });

  const ChangeHandler = (e) => {
    setProduct({...product, [e.target.name]: e.target.value})
  };

  useEffect(() => {
    setProduct(products.filter((p) => p.id === id)[0]);
  }, [id]);

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 3 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.length < 1 ||
      product.description.trim().length < 10
    ) {
      toast.warning("Please fill all the fields correctly");
      return;
    }

    const proIdx = products.findIndex(p=>p.id == id);

    const copyData = [...products];
    copyData[proIdx] = { ...products[proIdx], ...product};


    setProducts(copyData);
    localStorage.setItem(
      "products",
      JSON.stringify(copyData)
    );
    navigate(-1);
    toast.success("Product edit successfully!");
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
      {/* Back to home page */}
      {(pathname != "/" || search.length > 0) && (
        <Link
          to={`/`}
          className="hover:text-white border-1 border-transparent rounded-full hover:bg-gray-900 duration-150 p-.5 text-4xl absolute left-10 top-10 "
        >
          <IoArrowBackCircle />
        </Link>
      )}
      <h1 className="text-3xl font-bold text-purple-600">Edit Product</h1>
      <form
        onSubmit={AddProductHandler}
        className="p-5 border-2 border-gray-400 p-4 rounded-md flex flex-col gap-2 "
      >
        <input
          type="text"
          placeholder="Title"
          className="text-1xl bg-zinc-200 rounded p-2 px-3 outline-blue-400"
          name="title"
          onChange={ChangeHandler}
          value={product && product.title}
        />
        <input
          type="url"
          placeholder="Image link"
          className="text-1xl bg-zinc-200 rounded p-2 px-3 outline-blue-400 "
          name="image"
          onChange={ChangeHandler}
          value={product && product.image}
        />
        <div className="flex  justify-between gap-2">
          <input
            type="text"
            placeholder="Category"
            className="text-1xl bg-zinc-200 rounded p-2 px-3 outline-blue-400"
            name="category"
            onChange={ChangeHandler}
            value={product && product.category}
          />
          <input
            type="number"
            placeholder="Price"
            className="text-1xl bg-zinc-200 rounded p-2 px-3 outline-blue-400"
            name="price"
            onChange={ChangeHandler}
            value={product && product.price}
          />
        </div>
        <textarea
          name="description"
          id="description"
          rows={3}
          placeholder="Write product's description"
          className="text-1xl bg-zinc-200 rounded py-2 px-3 outline-blue-400"
          onChange={ChangeHandler}
          value={product && product.description}
        ></textarea>
        <button className="py-2 w-fit px-5 mt-2 self-center border-[3px] rounded border-blue-400 text-blue-500 duration-200 hover:scale-[.96] hover:text-zinc-100 hover:bg-sky-500 text-xl font-semibold">
          Save
        </button>
      </form>
    </div>
  );
};

export default Edit;
