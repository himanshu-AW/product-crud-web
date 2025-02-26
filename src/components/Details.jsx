import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
// import axios from '../utils/axios';
import { IoArrowBackCircle } from "react-icons/io5";
import { ProductContext } from "../utils/Context";
import { toast } from 'react-toastify';

const Details = () => {
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  

  // const getSingleProduct = async () =>{
  //     try{
  //         const {data} = await axios.get(`/products/${id}`);
  //         setProduct(data);

  //     }catch(err){
  //         console.error(err);
  //         alert('Failed to fetch products');
  //     }
  // }

  useEffect(() => {
    if (!product) {
      setProduct(products.filter((p) => p.id == id)[0]);
    }
    // getSingleProduct();
  }, []);

  const ProductDeleteHandler = (id)=>{
    const FilterProducts = products.filter((p) => p.id !== id);
    setProducts(FilterProducts);
    localStorage.setItem('products', JSON.stringify(FilterProducts));
    navigate("/");
    toast.success("Product deleted successfully!");
  }

  return product ? (
    <div className="container m-auto flex flex-row justify-center items-center h-screen bg-zinc-100 p-[5%]">
      {/* Back to home page */}
      {(pathname != "/" || search.length > 0) && (
        <Link
          to={`/`}
          className="hover:text-white border-1 border-transparent rounded-full hover:bg-gray-900 duration-150 p-.5 text-4xl absolute left-10 top-10 "
        >
          <IoArrowBackCircle />
        </Link>
      )}
      <div className="flex flex-row border-2 hover:border-black duration-300 rounded max-sm:items-center w-[60%] max-md:w-full max-sm:w-full max-sm:flex-col p-2">
        <div className="w-[100em] h-[20em] self-center border-2 hover:border-black duration-300 rounded max-sm:w-40 p-2 overflow-hidden">
          <img
            className="rounded-md object-contain mix-blend-multiply w-full h-full hover:scale-[1.06] duration-300 "
            src={`${product.image}`}
            alt=""
          />
        </div>
        <div className="content p-4 pl-8 flex gap-3 rounded-md flex-col min-w-[300px]">
          <h1 className="text-2xl font-semibold text-purple-800 line-clamp-3">
            {product.title}
          </h1>
          <h2 className="text-xl">
            Price: <span className="text-red-500 ">$ {product.price}</span>
          </h2>
          <h3 className="text-zinc-500">Category: {product.category}</h3>
          <p className="font-semibold text-wrap">{product.description}</p>
          <div className="btn flex flex-wrap gap-4">
            <Link to={`/edit/${product.id}`} className="border-4 border-green-600 hover:bg-green-500 hover:text-zinc-100 hover:scale-110 duration-300 px-5 py-1 rounded-md font-bold text-green-600">
              Edit
            </Link>
            <button onClick={()=>ProductDeleteHandler(product.id)} className="border-4 border-red-600 hover:bg-red-500 hover:text-zinc-100 hover:scale-110 duration-300 px-5 py-1 rounded-md font-bold text-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
