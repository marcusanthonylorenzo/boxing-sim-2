import React from 'react'

interface FightAcceptButtonT {
    disabledState: boolean
}

const FightAcceptButton = ({
    disabledState
}: FightAcceptButtonT) => {
  return (
    <div>
        <button id={`Navbar-acceptFight-button`}
            className={`w-full h-full rounded-md shadow-md text-black px-4 p-3
                ${disabledState ? `shadow-xl` : `bg-white`}
            `}
            disabled={!disabledState}
            onClick={() => console.log(`clicky`)}
            >
            <h4>Accept Fight</h4>
        </button>
    </div>
  )
}

export default FightAcceptButton