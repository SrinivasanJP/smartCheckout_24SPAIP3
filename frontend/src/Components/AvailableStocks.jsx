import React from 'react'

const AvailableStocks = ({availableStocks}) => {
    console.log(availableStocks)
  return (
    <div className=' inline-flex flex-col justify-center items-center'>
        <h1 className='m-5 text-2xl font-semibold'>Available Stocks</h1>
        <table className=' table-auto border-collapse'>
            <thead className=''>
                <tr className=' bg-blue-500'>
                    <th className=' border border-slate-900 py-3 px-20 text-white'>Product Name</th>
                    <th className=' border border-slate-900 py-3 px-20 text-white'>Available Stocks</th>
                </tr>
            </thead>
            <tbody className=' border border-slate-500'>
                {
                    availableStocks.map((value,index)=>(
                        <tr className="even:bg-blue-200 odd:bg-blue-100">
                            <td className=' p-3'>{value.product}</td>
                            <td className='p-3'>{value.qty}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default AvailableStocks