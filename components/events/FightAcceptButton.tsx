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
            className={`w-full h-full rounded-md shadow-md text-black px-4 p-3
                ${disabledState ? `shadow-xl hover:cursor-pointer ${styles[`button-hover`]}` : `bg-white`}
            `}
            disabled={!disabledState}
            onClick={() => console.log(`clicky`)}>
            <h4>Accept Fight</h4>
        </button>
    </div>
  )
}

export default FightAcceptButton