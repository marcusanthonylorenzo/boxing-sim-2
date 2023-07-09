import React, { useState, useEffect, useContext } from 'react'
import { AddIcon } from '../icons/AddIcon'
import ProgressDayButton from '../components/events/ProgressDayButton'
import { Boxer } from '../constants/BoxerModel'
import FightAcceptButton from '../components/events/FightAcceptButton';
import styles from "../styles/Home.module.css";
import useFightStartContext from '../hooks/useFightStart';
import Ticker from 'react-ticker'
import Logo from '../components/Logo';


interface NavbarT {
    styling?: string,
    components?: {
    },
    parentState: {
        boxerSelected: Array<Boxer | null>,
        showAddModal: boolean,
        day: number | null,
        setDay: React.Dispatch<React.SetStateAction<number | null>>,
        setHideFightAcceptModal: React.Dispatch<React.SetStateAction<string>>
    },
    setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({
    styling, components, parentState, setAddModalVisibility
} : NavbarT) => {

    const componentId = "Navbar";
    const { boxerSelected, showAddModal, day, setDay, setHideFightAcceptModal } = parentState;
    const [ disabledState, setDisabledState ] = useState<boolean>(false)
    const { fightStart, setFightStart } = useFightStartContext();

    useEffect(() => boxerSelected.length < 2 ? setDisabledState(false) : setDisabledState(true), [boxerSelected])

    console.log(fightStart)

    return (
    <div id={componentId} className={`
        flex flex-row fixed z-51 top-0 w-[100vw] h-[20vh] py-3 shadow-md text-white ${fightStart ? `bg-[#352c2c]` : `bg-[#1f2957]`}
       `}>
        <div id={`${componentId}-wrapper`} className={`relative w-full items-center justify-center pb-56`}>

            <div id={`${componentId}-content`}
                className={`flex relative w-full items-center justify-center mb-3`}>
                
                <Logo />

                <div id={`${componentId}-createComponents`}
                    className="flex col-start-3 row-start-1 rounded">

                { !fightStart ?
                    (<>
                        <h5 className={`relative text-zinc-400 font-semibold text-[8px] px-3`}>Create Boxer</h5>
                        <div className={`relative w-full hover:scale-[120%] hover:duration-[30ms] hover:cursor-pointer `}
                            onClick={() => setAddModalVisibility(!showAddModal)}>
                            <AddIcon className="w-10 ease-out-in ease-in-out" />
                        </div>
                    </>)
                    
                    : null
                }
                </div>

                <div id={`Navbar-acceptFight`}
                    className={`col-start-4 row-start-1 relative items-center justify-center`}>
                    <FightAcceptButton disabledState={disabledState} setHideModal={setHideFightAcceptModal}/>
                </div>

                <div id={`${componentId}-calendar`}
                    className={`col-start-5 row-start-1 flex flex-col relative text-zinc-400 font-semibold ml-[10%]`}>
                    <ProgressDayButton parentState={{ day: day, setDay: setDay }} styles={`${styles[`button-hover`]}`} disabled={fightStart ? true : false}/>
                </div>
            </div>

            <section id="ticker" className='flex relative bg-gray h-[20%] w-[80%] mt-4 mx-auto items-center justify-center'>

                {/* <Ticker>
                    { () =>  */}
                     {/* (<> */}
                            <h1 className={`relative font-bold mr-2`}> Updates 7/9/23:</h1>
                            <h5 className={`relative text-[11px]`}>Currently focusing building server logic for the actual fight engine. Should execute and client makes a request, returning an array of fight data which will be updated in the UI at intervals.
                            <br/>
                            This UI is not final.  </h5>
                    {/* </>) */}
                    {/* }
                </Ticker> */}

            </section>
        </div>
    </div>
  )
}

export default Navbar