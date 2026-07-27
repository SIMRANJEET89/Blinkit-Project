import { useState } from "react"
import EditProductAdmin from "./EditProductAdmin"


const ProductCartAdmin = ({ data }) => {
  const [editOpen, setEditOpen] = useState(false) 
  return (
    <div className="w-36 p-2 bg-white rounded ">
        <div className="">
            <img
             src={data?.image[0]}
             alt={data?.name}
             className='w-full h-full object-scale-down' />
        </div>
        <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
        <p className="text-slate-500">{data?.unit}</p>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={()=>setEditOpen(true)} className="border text-sm p-1 border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded">Edit</button>
          <button className="border text-sm p-1 border-red-600 bg-red-100 text-red-800 hover:bg-red-200 rounded">Delete</button>
        </div>
        {
          editOpen && (
             <EditProductAdmin data={data} close={()=>setEditOpen(false)}/>
          )
        }
      
    </div>
  )
}

export default ProductCartAdmin