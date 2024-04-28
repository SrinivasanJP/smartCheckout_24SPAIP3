import React, { useEffect, useState } from 'react'

const Purchase = ({setFragment}) => {
  const [image, setImage] = useState(null);

  const [billContent,setBillContent] = useState([])
  const [availabelStocks, setAvailableStocks] = useState([])
  useEffect(()=>{
    setAvailableStocks(JSON.parse(localStorage.getItem("availableStocks")))
  },[])
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const openCamera = async () => {
    let mediaStream = null; // Define mediaStream variable outside the try block
  
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const mediaStreamTrack = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);
      const blob = await imageCapture.takePhoto();
      setImage(blob)
      mediaStreamTrack.stop();
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Make sure to handle any errors and release resources properly
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    }
  };
  const handleCheckout = () =>{
    console.log(availabelStocks,billContent)
    localStorage.setItem("availableStocks", JSON.stringify(availabelStocks))
    let existTransaction = JSON.parse(localStorage.getItem("transactionData"))
    if(existTransaction==null){
      existTransaction = billContent
      console.log("run")
    }else{
      existTransaction = existTransaction.concat(billContent)
    }
    console.log(existTransaction)
    localStorage.setItem("transactionData",JSON.stringify(existTransaction))
    let analyticsData = JSON.parse(localStorage.getItem("analyticsData")) || {purchase:0,sale:0,profit:0}
    analyticsData.purchase = analyticsData.purchase + 1
    analyticsData.sale += billContent.reduce((total, value) => {
      return total + (value.qty * value.rate);
  }, 0);
  analyticsData.profit += billContent.reduce((total,value)=>{
    return total + (value.qty * value.rate)/2
  },0)
  localStorage.setItem("analyticsData",JSON.stringify(analyticsData))

    setBillContent([])
    setFragment("dashboard")
  }
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      const productIndex = availabelStocks.findIndex(item => {
        return item.product.charAt(0).toUpperCase()+item.product.slice(1) == data.prediction}
      );
      console.log(availabelStocks)
      if(productIndex==-1 ){
        alert("Product is not available in inventory")
      }else if (availabelStocks[productIndex].qty < 0){
        alert("product is out of stock")
      }
      else{

        const bill = [...billContent]
        const billIndex = bill.findIndex(item=>item.product.charAt(0).toUpperCase()+item.product.slice(1) == data.prediction)
        if(billIndex == -1){
          bill.push({product:data.prediction, qty:1,rate:availabelStocks[productIndex].rate,type:availabelStocks[productIndex].type,date:new Date})
        }else{
          bill[billIndex] = {...bill[billIndex],qty:bill[billIndex].qty+1}
          console.log(bill[billIndex])
        }
        const newAvailableStocks = availabelStocks
          newAvailableStocks[productIndex]={...newAvailableStocks[productIndex],qty:newAvailableStocks[productIndex].qty - 1}
          console.log(bill)
        setBillContent(bill)
        setAvailableStocks(newAvailableStocks)
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className='w-screen h-screen justify-center items-center flex p-20'>
         <form onSubmit={handleSubmit} className=' bg-blue-500 p-10 rounded-3xl flex flex-col items-center justify-center mt-24 w-[50%]'>
          <img src={image && URL.createObjectURL(image)} className=" w-80 h-80 bg-slate-100 rounded-xl"  />
          <div className='flex flex-wrap justify-center items-center'>
          <label htmlFor="fileinput" className='bg-white p-10 rounded-2xl inline-block text-2xl font-semibold w-[25rem] text-center m-5'>Click here to upload image</label>
        <input type="file" onChange={handleImageChange} className='hidden' id='fileinput'/>
        <button className='bg-white p-10 rounded-2xl inline-block text-2xl font-semibold w-[25rem] text-center m-5' onClick={()=>openCamera()}>Open Camera</button>
          </div>
          
        <button type="submit" className='bg-white p-10 rounded-2xl text-2xl font-semibold w-[25rem] text-center m-5'>Submit</button>
      </form>
      <div className='w-[50%] m-5'>
        <h1 className=' bg-blue-500 text-white text-center font-bold rounded-xl p-3 my-5'>Generated Bill</h1>
        <table className=' table-auto text-black w-full bg-blue-50'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
          <tbody>
            {
              billContent.map((value,index)=>(
                <tr className='odd:bg-blue-100 even:bg-blue-50' key={index}>
                  <td className=' p-4'>{value.product}</td>
                  <td className=' p-4'>{value.qty}</td>
                  <td className=' p-4'>{value.rate}</td>
                  <td className=' p-4'>{value.qty * value.rate}</td>
                </tr>
              )) 
            }
          </tbody>

        </table>
        <button className='w-full mt-10 bg-blue-500 p-3 rounded-xl text-white font-bold' onClick={()=>handleCheckout()}>Checkout</button>
      </div>
    </div>
  )
}

export default Purchase