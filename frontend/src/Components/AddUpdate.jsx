import React, { useState } from 'react';

const AddUpdate = ({setAvailableStocks}) => {
    const [formData, setFormData] = useState({
        product: "",
        qty: "",
        date: "",
        type: "",
        rate: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault(); 
        let preData = JSON.parse(localStorage.getItem("availableStocks")) || [];
        const index = preData.findIndex(item => item.product === formData.product);
        if (index !== -1) {
            preData[index] = formData;
        } else {
            preData.push(formData);
        }
        localStorage.setItem('availableStocks', JSON.stringify(preData));
        setFormData({
            product: "",
            qty: "",
            date: "",
            type: "",
            rate: "",
        });
        setAvailableStocks(preData)
        
    };


    return (
        <div className='m-3'>
            <h1 className='text-xl font-semibold bg-white text-black rounded-xl p-3'>Add/Update</h1>
            <form className=' flex flex-wrap justify-evenly' onSubmit={handleSubmit}>
                <div className='inline-block m-5'>
                <label htmlFor="product" className=' mr-10'>Product</label>
                <input type="text" id="product" name="product" required value={formData.product} className=' rounded-md outline-none p-3 text-black' onChange={handleInputChange} />
                </div>
                
                <div className='inline-block m-5'>
                <label className=' mr-10' htmlFor="qty">Quantity</label>
                <input type="text" id="qty" name="qty" value={formData.qty} onChange={handleInputChange} className=' rounded-md outline-none p-3 text-black'  required/>

                </div>
                <div className='inline-block m-5'>
                <label className=' mr-10' htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} className=' rounded-md outline-none p-3 text-black' required/>
                </div>
                <div className='inline-block m-5'>
                <label className=' mr-10' htmlFor="type">Type</label>
                <select id="type" className=' rounded-md outline-none p-3 text-black' name="type" value={formData.type} required onChange={handleInputChange}>
                    <option value="">Select type</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruit">Fruit</option>
                    {/* Add more options as needed */}
                </select>
                </div>
                
                <div className='inline-block m-5'>
                <label className=' mr-10' htmlFor="rate">Rate</label>
                <input required type="text" id="rate" name="rate" className=' rounded-md outline-none p-3 text-black' value={formData.rate} onChange={handleInputChange} />
                </div>
                <button type='submit' className=' rounded-md m-5 px-10 py-5 text-black bg-white w-full'>ADD</button>
                
            </form>
            {/* You can access formData state anywhere within this component */}
        </div>
    );
};

export default AddUpdate;
