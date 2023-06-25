import React, { useState, useEffect } from 'react'

interface FightAcceptModalT {
    hideModal: string,
    setHideModal: React.Dispatch<React.SetStateAction<string>>
}

const FightAcceptModal = ({
    hideModal, setHideModal
}: FightAcceptModalT) => {

    useEffect(() => console.log(hideModal), [hideModal])

  return (
    <>
    <div id={`FightAcceptModal-main`}
        className={`absolute bg-transparent top-[10%] left-[0]
        flex w-full h-full overflow-x-hidden overflow-y-auto inset-0 z-50 
        justify-center items-center outline-none focus:outline-none ${hideModal}`}
        onClick={() => hideModal === 'hidden' ? setHideModal(``) : setHideModal(`hidden`)}>
        
        <div id={`FightAcceptModal-wrapper`}
            className={`flex relative top-[-4vh] bg-zinc-100 h-[80%] w-full mx-auto max-w-3xl rounded-md shadow-2xl items-center justify-center`}>
            <h2 className={`relative font-semibold text-[#705e93] text-[32px]`}>SIGN CONTRACT</h2>
        </div>
    </div>
    <div id={`FightAcceptModal-overlay`} className={`absolute bg-zinc-400 opacity-40 top-[10%] left-[0]
        flex w-full h-full overflow-x-hidden overflow-y-auto inset-0 z-49 `} />
  </>
  )
}

export default FightAcceptModal