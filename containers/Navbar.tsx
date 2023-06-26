import React, { useState, useEffect } from 'react'
import { AddIcon } from '../icons/AddIcon'
import ProgressDayButton from '../components/events/ProgressDayButton'
import { Boxer } from '../constants/BoxerModel'
import FightAcceptButton from '../components/events/FightAcceptButton';
import styles from "../styles/Home.module.css";


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
    // const { addIcon } = components;
    const { boxerSelected, showAddModal, day, setDay, setHideFightAcceptModal } = parentState;
    const [ disabledState, setDisabledState ] = useState<boolean>(false)
    console.log(disabledState)

    useEffect(() => boxerSelected.length < 2 ? setDisabledState(false) : setDisabledState(true), [boxerSelected])

    return (
    <div id={componentId} className={`${styling} flex flex-row absolute top-0 w-[100vw] h-[20vh] py-7 m-0 p-0 shadow-md`}>
        <div id={`${componentId}-wrapper`} className={`relative w-full items-center`}>
            <div id={`${componentId}-content`}
                className={`flex relative w-full items-center justify-center`}>

                <div id={`${componentId}-createComponents`}
                    className="col-start-3 row-start-1 relative"
                    onClick={() => setAddModalVisibility(!showAddModal)}>
                    <h5 className={`text-zinc-400 font-semibold`}>New</h5>
                    <AddIcon className="w-11 ease-out-in
                        hover:scale-[120%] hover:duration-[30ms] hover:cursor-pointer ease-in-out" />
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
        </div>
    </div>
  )
}

export default Navbar