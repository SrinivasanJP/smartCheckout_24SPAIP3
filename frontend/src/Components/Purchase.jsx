import React, { useState } from 'react'

const Purchase = () => {
  const [image, setImage] = useState(null);

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
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className='w-screen h-screen justify-center items-center flex'>
         <form onSubmit={handleSubmit} className=' bg-blue-500 p-20 rounded-3xl flex flex-col items-center justify-center'>
          <img src={image && URL.createObjectURL(image)} className=" w-80 h-80 bg-slate-100 rounded-xl"  />
          <div className='flex flex-wrap justify-center items-center'>
          <label htmlFor="fileinput" className='bg-white p-10 rounded-2xl inline-block text-2xl font-semibold w-[25rem] text-center m-5'>Click here to upload image</label>
        <input type="file" onChange={handleImageChange} className='hidden' id='fileinput'/>
        <button className='bg-white p-10 rounded-2xl inline-block text-2xl font-semibold w-[25rem] text-center m-5' onClick={()=>openCamera()}>Open Camera</button>
          </div>
          
        <button type="submit" className='bg-white p-10 rounded-2xl text-2xl font-semibold w-[25rem] text-center m-5'>Submit</button>
      </form>
    </div>
  )
}

export default Purchase