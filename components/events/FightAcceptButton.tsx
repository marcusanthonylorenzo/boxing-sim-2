import React, { useState, useContext } from 'react'
import styles from "../../styles/Home.module.css";
import useFightStartContext from '../../hooks/useFightStart';
interface FightAcceptButtonT {
    disabledState: boolean,
    setHideModal: React.Dispatch<React.SetStateAction<string>>
}

const FightAcceptButton = ({
    disabledState, setHideModal
}: FightAcceptButtonT) => {

   const { fightStart, setFightStart, round, fightOver, resetFightData } = useFightStartContext();


  return (
    <div className={``}>
        <button id={`Navbar-acceptFight-button`}
            className={`w-[80%] h-full rounded-md shadow-md px-4 p-3 mx-8
                ${disabledState ? `shadow-2xl font-bold text-[white]
                    ${round < 12 ? `bg-[#e4c747]` : `bg-[#da404d]`} hover:cursor-pointer  ${styles[`button-hover`]}`
                : `bg-[#e2dad8] font-semibold`}`}

            disabled={!disabledState}
            onClick={() => {
                if (!fightStart) { 
                    setHideModal(``)
                } else {
                    resetFightData(() => setFightStart(false));
                }
            }}>
            <h4>
                {
                    !fightStart ? 
                        !disabledState ? `Select Two Boxers` : `Accept Fight`
                        :  round < 12 ? `Cancel Fight?` : `Exit Fight`
                }
            </h4>
        </button>
    </div>
  )
}

export default FightAcceptButton