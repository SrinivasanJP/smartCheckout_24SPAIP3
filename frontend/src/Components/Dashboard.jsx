import React, { useEffect, useState } from 'react'
import Analytics from './Analytics'
import AvailableStocks from './AvailableStocks'
import Transactions from './Transactions'
import AddUpdate from './AddUpdate'

const Dashboard = () => {
    const [analyticsData, setAnalyticsData] = useState({
        purchase:"123.3",
        sale:"234.3",
        profit:"234.3",
        inventoryQty:"213",
        inventoryAmt:"234"
      });
      const [availableStocks, setAvailableStocks] = useState([])
      const [previousTransactions, setTransactions] = useState([])

      useEffect(()=>{
        setAvailableStocks(JSON.parse(localStorage.getItem("availableStocks")) || [])
        setTransactions(JSON.parse(localStorage.getItem("transactionData"))|| [])
      },[])
      useEffect(()=>{
        let inventoryQty = 0
        let inventoryAmt = 0
        if(availableStocks.length != 0 ){
          inventoryQty = availableStocks.reduce((total,value)=>{
            return total + parseInt(value.qty)
          },0)
          inventoryAmt = availableStocks.reduce((total,value)=>{
            return total + value.qty*value.rate
          },0)
        }
        setAnalyticsData({...JSON.parse(localStorage.getItem("analyticsData")),inventoryQty:inventoryQty,inventoryAmt:inventoryAmt})
      },[availableStocks])
  return (
    <div className= 'mt-20'>
        <div className='w-screen'>
            <Analytics analyticsData={analyticsData}/>
        </div>
        <div className='flex w-screen justify-start items-start '>
            <AvailableStocks availableStocks={availableStocks} />
            <div className='m-5 p-3 rounded-xl bg-blue-500 text-white'>
                <h1 className=' text-2xl font-semibold'>Sale/Purchase Transactions:</h1>
                <AddUpdate setAvailableStocks={setAvailableStocks} />
                <Transactions previousTransactions={previousTransactions}/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard