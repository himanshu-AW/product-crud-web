import { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useLocation } from "react-router-dom";
import {ProductContext} from '../utils/Context';
import Loading from "./Loading";
import axios from "../utils/axios";
import { toast } from 'react-toastify';

const Home = () => {
  const [products ]= useContext(ProductContext);
  const {search} = useLocation();
  const category = decodeURIComponent(search.split('=')[1]);

  const [filterProduccts,setFilterProducts] = useState(null);

  const getProductsCategory = async ()=>{
    try{
      const {data} = await axios.get(`/products/category/${category}`);
      setFilterProducts(data);
    }catch(e){
      toast.error(err,"!");
    }
  }

  useEffect(()=>{
    if(!filterProduccts || category =="undefined") setFilterProducts(products);
    if(category!="undefined") {
      // getProductsCategory();
      setFilterProducts(products.filter(p=>p.category === category));
    }
  }, [category,products])

  return ( products ?
    <>
      <Sidebar />
      <div className="w-[85%] px-8 py-16 flex flex-wrap gap-6 overflow-x-hidden overfolw-y-auto bg-red-400 ">
        {filterProduccts && filterProduccts.map((product,index)=>(
          <Link to={`/details/${product.id}`} key={index} className="border-[3px] overflow-hidden hover:scale-105 hover:border-purple-600 bg-purple-200 hover:bg-purple-300 duration-300 shadow-lg bg-gray-200 rounded-md w-56 h-80 flex flex-col justify-center items-center">
          <div className="w-full h-full p-2 bg-purple-100 overflow-hidden">
            <img
              className="rounded-md object-contain mix-blend-multiply w-full h-full"
              src={product.image}
              alt=""
            />
          </div>
          <h1 className="font-semibold p-2 capitalize text-lg line-clamp-2 mb-2 hover:text-purple-600">
            {product.title}
          </h1>
        </Link>
        ))}
      </div>
    </> : ( <Loading/> )
  );
};

export default Home;
