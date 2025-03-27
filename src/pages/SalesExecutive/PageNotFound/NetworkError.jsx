import React from 'react'
import Button from 'react-bootstrap/Button';
import networkerror from 'src/assets/images/network-error.png';
const NetworkError = () => {
  return (
    <>
    <div className='network-error'>
    <img src={networkerror} alt='' />
    <h1 className='mt-3 mb-0'>Internal Server Error</h1>
    <Button variant="primary" className='mt-3'>RETRY</Button>
    </div>
    </>
  )
}

export default NetworkError