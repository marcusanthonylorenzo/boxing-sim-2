import React, { useState, useEffect } from 'react'
import useFightStartContext from '../../hooks/useFightStart'
interface FightAcceptModalT {
    hideModal: string,
    setHideModal: React.Dispatch<React.SetStateAction<string>>
}

const FightAcceptModal = ({
    hideModal, setHideModal
}: FightAcceptModalT) => {

    const [ fightStart, setFightStart] = useFightStartContext();

    // useEffect(() => console.log(hideModal), [hideModal])

    const handleHideShow = () => hideModal === 'hidden' ? setHideModal(``) : setHideModal(`hidden`)
    const handleAcceptFight = () => {
        console.log(`fight accepted!`)
        setFightStart(true);
        handleHideShow()
    }

  return (
    <div className={`${hideModal} overflow-hidden h-full w-full`}>
        <div id={`FightAcceptModal-main`}
            className={`absolute top-[10%] left-[0]
            flex w-full h-full inset-0 z-50 overflow-hidden
            justify-center items-center outline-none focus:outline-none`}>
            
            <div id={`FightAcceptModal-wrapper`}
                className={`flex flex-col fixed top-[10vh] bg-zinc-800 h-[80vh] w-[70vw]  max-w-2xl rounded-lg shadow-inner items-center justify-center overflow-hidden`}>
                    
                <div id="FightAcceptModal-taleOfTheTape"
                    className={`flex relative top-0 mb-10`}>
                    <section id="title" className={`flex flex-col bg-slate-100 shadow-2xl h-[56vh] w-[45vw] p-6 font-semibold justify-center items-center` }>
                        <h1 className={` text-[28px] `}> Tale of the Tape:</h1>

                        <h4> Placeholders for now </h4> <br/>
                        Total Fights:<br/>
                        Punch Accuracy:<br/>
                        Highest Active Round:<br/>

                    </section>
                        
                </div>

                <div id="FightAcceptModal-contract" className='flex justify-center items-center gap-7 py-3 rounded-sm shadow-md bg-white w-[90%]'>
                    <h2 className={`relative font-semibold text-[#705e93] text-[24px] m-0`}>SIGN CONTRACT</h2>

                    <button id={`FightAcceptModal-accept_fight`}
                        className={`relative top-[5%] w-[100px] h-[35px] bg-black text-white rounded-md hover:scale-[105%] hover:duration-150`}
                        onClick={() => handleAcceptFight()}>
                        <h5>FIGHT</h5>
                    </button>

                    <button id={`FightAcceptModal-reject_fight`}
                        className={`relative top-[7%] w-[100px] h-[35px] bg-zinc-400 opacity-50 text-white rounded-md hover:scale-[105%] hover:duration-150`}
                        onClick={() => handleHideShow()} >
                        <h5>Cancel</h5>
                    </button>
                </div>
            </div>
        </div>

        <div id={`FightAcceptModal-overlay`} className={`absolute bg-zinc-900 opacity-80 top-[0] left-[0]
            flex w-full h-full overflow-hidden z-49 `} />
    </div>
  )
}

export default FightAcceptModal