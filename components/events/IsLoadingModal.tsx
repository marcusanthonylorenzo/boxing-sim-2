import React from 'react'

const IsLoadingModal = ({
    ...props
}: any ) => {

  return (
    <div className={`absolute items-center m-0 bg-black text-white h-[100vh] w-[100vw] duration-75`}>       
        { props.text ? props.text : <h2>CREATING NEW CHARACTER</h2> }    
    </div>
  )
}

export default IsLoadingModal