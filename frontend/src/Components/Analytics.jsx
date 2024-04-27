import React from 'react'


const Analytics = ({analyticsData}) => {
    const Card = ({name}) => (
        <div className=' bg-blue-600 m-5 inline-flex p-10 flex-col justify-center items-center rounded-xl w-48 h-24 even:bg-blue-700'>
            <h1 className=' text-white text-3xl font-semibold'>{analyticsData[name]}</h1>
            <h2 className=' text-white text-2xl '>{name}</h2>
        </div>
    )
    const keys = Object.keys(analyticsData)
  return (
    <div className='flex justify-evenly flex-wrap'>
        {
            keys.map((value,index)=>(<Card name={value} key={index} />))
        }
    </div>
  )
}

export default Analytics