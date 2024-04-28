import { useState } from 'react'
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Purchase from './Components/Purchase';

function App() {
 
  const [fragment, setFragment] = useState("dashboard")


  const RenderFragment = () =>{
    switch (fragment) {
      case "purchase":
        return <Purchase setFragment={setFragment} />
      case "dashboard":
        return <Dashboard />
      default:
        console.log("no fragment")
    }
  } 

  return (
    <>
   
      <Navbar setFragment={setFragment}/>
      <RenderFragment />
    </>
  );
}

export default App;
