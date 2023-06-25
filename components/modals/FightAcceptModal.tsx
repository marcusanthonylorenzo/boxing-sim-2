import React, { useState, useEffect } from 'react'

interface FightAcceptModalT {
    hideModal: string,
    setHideModal: React.Dispatch<React.SetStateAction<string>>
}

const FightAcceptModal = ({
    hideModal, setHideModal
}: FightAcceptModalT) => {

    // useEffect(() => console.log(hideModal), [hideModal])

    const handleHideShow = () => hideModal === 'hidden' ? setHideModal(``) : setHideModal(`hidden`)

  return (
    <div className={`${hideModal} overflow-hidden h-full w-full`}>
        <div id={`FightAcceptModal-main`}
            className={`absolute top-[10%] left-[0]
            flex w-full h-full inset-0 z-50 overflow-hidden
            justify-center items-center outline-none focus:outline-none`}
            onClick={() => handleHideShow() }>
            
            <div id={`FightAcceptModal-wrapper`}
                className={`flex absolute top-[0] bg-zinc-100 h-[80%] w-[80%] max-w-2xl rounded-md shadow-2xl items-center justify-center overflow-hidden`}>
                <h2 className={`relative font-semibold text-[#705e93] text-[32px]`}>SIGN CONTRACT</h2>
            </div>
        </div>

        <div id={`FightAcceptModal-overlay`} className={`absolute bg-zinc-400 opacity-50 top-[0] left-[0]
            flex w-full h-full overflow-hidden z-49 `} />
    </div>
  )
}

export default FightAcceptModal