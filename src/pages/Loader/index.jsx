import React,{useState,useEffect} from 'react'
import img from 'src/assets/images/loader.gif';
import Spinner from 'react-bootstrap/Spinner';
import 'src/App.css'




const Loader=()=> {

  // const [loadPage,setLoadpage] =useState(false);

//      //Loader......
//  React.useEffect(()=>{
//   setLoadpage(true)
//   // setTimeout(()=>{
//   //     setLoadpage(false)
//   // },800)
//  },[])


  return (
    <>
      <div className='loader_content'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  )

}

 export default Loader;
