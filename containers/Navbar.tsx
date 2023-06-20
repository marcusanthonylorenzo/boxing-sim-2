import React from 'react'
import { AddIcon } from '../icons/AddIcon'

interface NavbarT {
    styling: string,
    components?: {
    },
    parentState: {
        showAddModal: boolean,
        day: number | null
    },
    setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({
    styling, components, parentState, setAddModalVisibility
} : NavbarT) => {

    const componentId = "Navbar";
    // const { addIcon } = components;
    const { showAddModal, day } = parentState;

    return (
    <div id={componentId} className={styling}>
        <div id={`${componentId}-wrapper`} className={`flex w-full items-center`}>
            <div id={`${componentId}-content`} className={`flex w-full items-center justify-center`}>

                <div id={`${componentId}-createComponents`}
                    className="flex flex-col relative items-center mx-0 my-5"
                    onClick={() => setAddModalVisibility(!showAddModal)}>
                    <h5 className={`text-white font-semibold`}>New</h5>
                    <AddIcon className="w-11 ease-out-in
                        hover:scale-[120%] hover:duration-[30ms] hover:cursor-pointer ease-in-out" />
                </div>

                <div id={`${componentId}-calendar`}
                    className={`flex relative text-white font-semibold mx-5`}>
                    <h3>Day: {day}</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar