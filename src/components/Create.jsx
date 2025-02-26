import React, { useContext, useState } from 'react'
import { useLocation,Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle} from "react-icons/io5";
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';



const Create = () => {

  const {pathname, search} = useLocation();
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();

  const [title,settitle] = useState("");
  const [image,setimage] = useState("");
  const [category,setcategory] = useState("");
  const [price,setprice] = useState("");
  const [description,setdescription] = useState("");
    

  const AddProductHandler =(e)=>{
    e.preventDefault();

    if (title.trim().length < 3 || image.trim().length < 5 || category.trim().length <5 || price.length < 1 || description.trim().length < 10){
      toast.warning('Please fill all the fields correctly');
      return;
    }

    const productData = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description
    }
    setProducts([...products,productData]);
    localStorage.setItem('products', JSON.stringify([...products,productData]))
    navigate("/");
    toast.success("Product added successfully!");
  }


  return (
    <div className='w-screen h-screen flex flex-col gap-3 justify-center items-center'>
         {/* Back to home page */}
         {(pathname != '/' || search.length > 0) && (
            <Link to={`/`}  className="hover:text-white border-1 border-transparent rounded-full hover:bg-gray-900 duration-150 p-.5 text-4xl absolute left-10 top-10 ">
                <IoArrowBackCircle />
            </Link>
            )}
        <h1 className='text-3xl font-bold text-purple-600'>Add new item</h1>
        <form onSubmit={AddProductHandler} className='p-5 border-2 border-gray-400 p-4 rounded-md flex flex-col gap-2 '>
            <input type="text" placeholder='Title' className='text-1xl bg-zinc-200 rounded p-2 px-3 outline-blue-400'  onChange={(e)=> settitle(e.target.value)} value={title} />
            <input type="url" placeholder='Image link'  className='text-1xl bg-zinc-200 rounded p-2 px-3 outline-blue-400 '  onChange={(e)=> setimage(e.target.value)} value={image} />
            <div className='flex  justify-between gap-2'>
              <input type="text" placeholder='Category'  className='text-1xl bg-zinc-200 rounded p-2 px-3 outline-blue-400'  onChange={(e)=> setcategory(e.target.value)} value={category} />
              <input type="number" placeholder='Price'  className='text-1xl bg-zinc-200 rounded p-2 px-3 outline-blue-400'  onChange={(e)=> setprice(e.target.value)} value={price} />
            </div>
            <textarea name="description" id="description" rows={3} placeholder="Write product's description" className='text-1xl bg-zinc-200 rounded py-2 px-3 outline-blue-400' onChange={(e)=> setdescription(e.target.value)} value={description} ></textarea>
            <button className="py-2 w-fit px-5 mt-2 self-center border-[3px] rounded border-blue-400 text-blue-500 duration-200 hover:scale-[.96] hover:text-zinc-100 hover:bg-sky-500 text-xl font-semibold">Add New Product</button>
        </form>
    </div>
    
  )
}

export default Create;
