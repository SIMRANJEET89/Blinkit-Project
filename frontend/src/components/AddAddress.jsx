import {useForm} from 'react-hook-form'

const AddAddress = () => {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
      console.log(data);
      
    }

  return (
    <section className="bg-black/70 fixed top-0 right-0 bottom-0 left-0 z-50">
     <div className="bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded h-screen overflow-auto">
        <h2 className="font-semibold">Add address</h2>
        <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-1">
                <label htmlFor="addressline">Address Line : </label>
                <input type="text"

                id="addressline"
                className="border bg-blue-50 p-2 rounded focus-within:outline-yellow-400"
                {...register('addressline', {required : true})} />
            </div>
              <div className="grid gap-1">
                <label htmlFor="city">City : </label>
                <input type="text"

                id="city"
                className="border bg-blue-50 p-2 rounded focus-within:outline-yellow-400"
                {...register('city', {required : true})} />
            </div>
              <div className="grid gap-1">
                <label htmlFor="state">State : </label>
                <input type="text"

                id="state"
                className="border bg-blue-50 p-2 rounded focus-within:outline-yellow-400"
                {...register('state', {required : true})} />
            </div>
              <div className="grid gap-1">
                <label htmlFor="pincode">Pincode : </label>
                <input type="text"

                id="pincode"
                className="border bg-blue-50 p-2 rounded focus-within:outline-yellow-400"
                {...register('pincode', {required : true})} />
            </div>
              <div className="grid gap-1">
                <label htmlFor="country">Country : </label>
                <input type="text"

                id="country"
                className="border bg-blue-50 p-2 rounded focus-within:outline-yellow-400"
                {...register('country', {required : true})} />
            </div>
              <div className="grid gap-1">
                <label htmlFor="mobile">Mobile No: </label>
                <input type="text"

                id="mobile"
                className="border bg-blue-50 p-2 rounded focus-within:outline-yellow-400"
                {...register('mobile', {required : true})} />
            </div>

            <button type='onSubmit' className='bg-yellow-400 w-full py-2 font-semibold hover:bg-yellow-300 cursor-pointer mt-4'>Submit</button>
        </form>


     </div>
    </section>
  )
}

export default AddAddress