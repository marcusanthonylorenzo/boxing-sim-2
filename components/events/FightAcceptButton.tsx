import React from 'react'
import styles from "../../styles/Home.module.css";

interface FightAcceptButtonT {
    disabledState: boolean
}

const FightAcceptButton = ({
    disabledState
}: FightAcceptButtonT) => {
  return (
    <div className={``}>
        <button id={`Navbar-acceptFight-button`}
            className={`w-full h-full rounded-md shadow-md px-4 p-3 mx-8
                ${disabledState ? `shadow-2xl font-semibold text-[white] bg-[#4daf51] hover:cursor-pointer  ${styles[`button-hover`]}` : `bg-white text-black`}
            `}
            disabled={!disabledState}
            onClick={() => console.log(`clicky`)}>
            <h4>Accept Fight</h4>
        </button>
    </div>
  )
}

export default FightAcceptButton