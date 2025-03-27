import React from 'react'
import Button from 'react-bootstrap/Button';
import pagenotfound from 'src/assets/images/pagenotfound.png';
const PageNotFound = () => {
  return (
    <>
    <div className='page-not-found'>
    <img src={pagenotfound} alt='' />
    <h1 className='mb-0'>Page Not Found</h1>
    <Button variant="primary" className='mt-3'>START SHOPPING</Button>
    </div>
    </>
  )
}

export default PageNotFound