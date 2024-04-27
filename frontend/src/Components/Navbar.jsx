import React from 'react'

const Navbar = ({setFragment}) => {
  return (
    <div className=' bg-blue-500 w-screen h-14 flex justify-between p-10 items-center fixed top-0'>
        <h1 className=' text-white font-bold text-2xl' onClick={()=>{setFragment("dashboard")}} >Smart Billing System</h1>
        <button className=' text-white bg-blue-700 px-5 py-3 rounded-2xl hover:scale-110 transition-all delay-100 ease-in-out' onClick={()=>{setFragment("purchase")}}>
            New Purchase
        </button>
    </div>
  )
}

export default Navbar