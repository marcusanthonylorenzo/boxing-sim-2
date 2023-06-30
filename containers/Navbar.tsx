import React, { useState, useEffect, useContext } from 'react'
import { AddIcon } from '../icons/AddIcon'
import ProgressDayButton from '../components/events/ProgressDayButton'
import { Boxer } from '../constants/BoxerModel'
import FightAcceptButton from '../components/events/FightAcceptButton';
import styles from "../styles/Home.module.css";
import useFightStartContext from '../hooks/useFightStart';

interface NavbarT {
    styling: string,
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
    const [ fightStart, setFightStart] = useFightStartContext();

    useEffect(() => boxerSelected.length < 2 ? setDisabledState(false) : setDisabledState(true), [boxerSelected])

    return (
    <div id={componentId} className={`${styling} flex flex-row fixed top-0 w-[100vw] h-[20vh] my-5 py-7 shadow-md`}>
        {/* <div id={`${componentId}-wrapper`} className={`relative w-full items-center`}> */}
            <div id={`${componentId}-content`}
                className={`flex relative w-full items-center justify-center mb-3`}>

                <div id={`${componentId}-createComponents`}
                    className="flex col-start-3 row-start-1 bg-slate-100 rounded">
                    <h5 className={`relative text-zinc-400 font-semibold text-[8px] px-3`}>Create Boxer</h5>
                    <div className={`relative w-full hover:scale-[120%] hover:duration-[30ms] hover:cursor-pointer `}
                        onClick={() => setAddModalVisibility(!showAddModal)}>
                        <AddIcon className="w-10 ease-out-in 
                        ease-in-out" />
                    </div>
                </div>

                <div id={`Navbar-acceptFight`}
                    className={`col-start-4 row-start-1 relative items-center justify-center`}>
                    <FightAcceptButton disabledState={disabledState} setHideModal={setHideFightAcceptModal}/>
                </div>

                <div id={`${componentId}-calendar`}
                    className={`col-start-5 row-start-1 flex flex-col relative text-zinc-400 font-semibold ml-[10%]`}>
                    <ProgressDayButton parentState={{ day: day, setDay: setDay }} styles={`${styles[`button-hover`]}`}/>
                </div>
            </div>
        {/* </div> */}
    </div>
  )
}

export default Navbar