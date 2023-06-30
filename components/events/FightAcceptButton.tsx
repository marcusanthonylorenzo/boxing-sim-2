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

   const [ fightStart, setFightStart] = useFightStartContext();


  return (
    <div className={``}>
        <button id={`Navbar-acceptFight-button`}
            className={`w-[80%] h-full rounded-md shadow-md px-4 p-3 mx-8
                ${disabledState ? `shadow-2xl font-bold text-[white] bg-[#4daf51] hover:cursor-pointer  ${styles[`button-hover`]}` : `bg-[#e2dad8] font-semibold`}
            `}
            disabled={!disabledState}
            onClick={() => {
                !fightStart ? setHideModal(``) : setFightStart(false)
            }}>
            <h4>
                {
                    !fightStart ? 
                        !disabledState ? `Select Two Boxers` : `Accept Fight`
                    : `Cancel Fight?`
                }
            </h4>
        </button>
    </div>
  )
}

export default FightAcceptButton