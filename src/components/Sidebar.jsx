import React, { useContext } from 'react'
import { IoMenuSharp,IoHome,IoArrowBackCircle} from "react-icons/io5";
import { ProductContext } from '../utils/Context';
import { Link, useLocation} from 'react-router-dom';

const Sidebar = () => {
  const [products ]= useContext(ProductContext);
  const {search, pathname }= useLocation();

  let diff_Category = products && products.reduce((acc,currVal)=>[...acc,currVal.category],[])
  diff_Category = [...new Set(diff_Category)];

  const color = ()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.8)`;
  }

  return (
      <div className="w-[15%] h-full flex flex-col items-center pt-5 bg-[#2F3645] relative text-white font-semibold">
        <div className="icons flex gap-24">
          <span className="hover:text-black hover:bg-zinc-100 self-start rounded duration-300 h-fit w-fit px-0.5 text-3xl ">
            <IoMenuSharp />
          </span>
            {(pathname != '/' || search.length > 0) && (
                <Link to={`/`} className='text-4xl hover:text-black border-1 border-white rounded-full hover:bg-zinc-100'>
                    <IoArrowBackCircle />
                </Link>
            )}
        </div>
        <a
          className="py-1 px-2 mt-5 mx-3 border-2 rounded w-fit  border-blue-400 text-blue-500 duration-300 hover:scale-[.96] hover:text-sky-400 text-lg font-semibold"
          href="/create"
        >
          Add New Product
        </a>
        <hr className="my-5 w-[80%]" />
        <h1 className=" text-lg font-bold my-2">Filter Category</h1>
        <div className="text-md w-[80%]">

          {diff_Category.map((category,index) =>(
            <Link to={`/?category=${category}`} key={index} className="my-2 flex items-center">
              <span style={{backgroundColor:color()}} className="rounded-full mr-3 inline-block w-[15px] h-[15px] "></span>{" "}
              {category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
            </Link>
          ))}
        </div>
      </div>
  )
}

export default Sidebar
