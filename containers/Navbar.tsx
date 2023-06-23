import React from 'react'
import { AddIcon } from '../icons/AddIcon'
import ProgressDayButton from '../components/events/ProgressDayButton'

interface NavbarT {
    styling: string,
    components?: {
    },
    parentState: {
        showAddModal: boolean,
        day: number | null,
        setDay: React.Dispatch<React.SetStateAction<number | null>>;
    },
    setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({
    styling, components, parentState, setAddModalVisibility
} : NavbarT) => {

    const componentId = "Navbar";
    // const { addIcon } = components;
    const { showAddModal, day, setDay } = parentState;

    return (
    <div id={componentId} className={`${styling} flex absolute top-0 bg-zinc-300 items-center w-[100vw] h-[20vh] m-0 p-0 shadow-md`}>
        <div id={`${componentId}-wrapper`} className={`flex relative w-full items-center  mx-10`}>
            <div id={`${componentId}-content`} className={`flex relative w-full justify-center`}>
                <div id={`${componentId}-createComponents`}
                    className="flex flex-col relative items-center mx-0 my-5"
                    onClick={() => setAddModalVisibility(!showAddModal)}>
                    <h5 className={`text-zinc-400 font-semibold`}>New</h5>
                    <AddIcon className="w-11 ease-out-in
                        hover:scale-[120%] hover:duration-[30ms] hover:cursor-pointer ease-in-out" />
                </div>

                <div id={`${componentId}-calendar`}
                    className={`flex flex-col relative ml-[10%] text-zinc-400 font-semibold mx-5`}>
                    <h3>Day: {day}</h3>
                    <ProgressDayButton parentState={{ day: day, setDay: setDay }} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar