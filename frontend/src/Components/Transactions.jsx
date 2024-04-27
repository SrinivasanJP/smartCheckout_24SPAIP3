import React from 'react'

const Transactions = ({previousTransactions}) => {
  return (
    <div className='m-3'>
        <h1 className='text-xl font-semibold bg-white text-black rounded-xl p-3'>Show Transactions</h1>

        {previousTransactions.length !=0 ? <div className=' rounded-xl w-full bg-white mt-5 overflow-hidden'>
        <table className=' table-auto text-black w-full'>
            <thead>
                <tr className=''>
                    <th className='p-3'>Product Name</th>
                    <th className='p-3'>Type</th>
                    <th className='p-3'>Quantity</th>
                    <th className='p-3'>Price</th>
                    <th className='p-3'>Amount</th>
                    <th className='p-3'>Date</th>
                </tr>
            </thead>
            <tbody className=''>
                {
                    previousTransactions.map((value,index)=>(
                        <tr className='odd:bg-blue-100 even:bg-blue-50'>
                            <td className=' p-4 '>{value.product}</td>
                            <td className=' p-4 '>{value.type}</td>
                            <td className=' p-4 '>{value.qty}</td>
                            <td className=' p-4 '>{value.rate}</td>
                            <td className=' p-4 '>{value.qty * value.rate}</td>
                            <td className=' p-4 '>{value.date}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>:<h1 className='m-10 text-center bg-white text-black text-2xl font-semibold p-10 rounded-xl'>No Transactions yet</h1>}
        
    </div>
  )
}

export default Transactions