import React, { useEffect, useState } from "react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Boxer } from "../constants/BoxerModel";
import BoxerAttributesDrawer from "./drawers/BoxerAttributesDrawer";
import { motion, AnimatePresence } from "framer-motion"
import { ClickedBoxerCardsT } from "../constants/State";
interface BoxerCardT {
  styleProps?: {
    cardBgColor?: string
  },
  data: Boxer;
  onUpdateBoxer: (selectNote: Boxer) => void;
  onDeleteBoxer: (id: number | string) => Promise<void>;
  onClickHandler: () => void;
  checkBoxerCardAlreadyClicked: (boxer: Boxer) => boolean;
  clickedBoxerCards: ClickedBoxerCardsT;
}

const BoxerCard = ({
    styleProps, data, onUpdateBoxer, onDeleteBoxer,
    onClickHandler, checkBoxerCardAlreadyClicked, clickedBoxerCards
  }: BoxerCardT) => { 

  const componentId = `BoxerCard-${data.id}`
  const hoverButtonAnimation = `hover:scale-110 hover:duration-100`

  const [ cardIsClicked, setCardIsClicked ] = useState<boolean>();

  useEffect(() => {
    const isThisCardClicked = checkBoxerCardAlreadyClicked(data)
    setCardIsClicked(isThisCardClicked)
  }, [clickedBoxerCards])

  return (
    <div id={`${componentId}`}
      className={`flex flex-col justify-between
        w-56 h-58 rounded-lg border px-6 pt-10 -rotate-1 shadow-md
        hover:shadow-xl hover:cursor-pointer
        bg-${styleProps?.cardBgColor}`}>

        {
          cardIsClicked ? (
            <AnimatePresence>
              <motion.div id={`${componentId}-BoxerAttributes-parentWrapper`}
                className={`flex absolute top-[2%] left-[3%] bg-white py-5 px-3 h-[96%] w-[93%] rounded-lg shadow-inner`}
                  initial={{ opacity: 0.9, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.1, delay: 0.09} }}
                  exit={{ opacity: 0.3, x: -100 }}>
                <BoxerAttributesDrawer data={data} onClick={() => onClickHandler()} />
              </motion.div>
            </AnimatePresence>
          ): null
        }

        <div id={`${componentId}-details`} className=""
          onClick={() => onClickHandler()}>
          <div className="flex h-20">
            <div id={`${componentId}-titleDiv-fullname`} className="w-[100%] py-2 mr-20">
              <h3 className="text-gray-900 text-md xt-20 font-bold mb-1 w-[100%]">{data.first_name + " " + data.last_name}</h3>
            </div>
          </div>
          <div id={`${componentId}-contentDiv`} className="text-gray-800 text-sm pb-5">
            <h5 id={componentId + `-weightClass`} className={`mr-2`}>{data.weightclass} lbs</h5>
            <h5 id={componentId + `-record`} className={`mr-2`}>{data.wins}-{data.losses}-{data.draws}</h5>
            <h5 id={componentId + `-hometown`} className={`mr-2`}>{data.hometown}</h5>
          </div>
        </div>
        <div>

        <div id={`${componentId}-footerDiv`} className="flex items-center justify-between text-gray-800 py-5">
          <button
            className={`w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300   focus:ring-black
            ${hoverButtonAnimation}`}
            aria-label="edit note"
            onClick={() => onUpdateBoxer(data)}
            role="button">
            <EditIcon className={` icon icon-tabler icon-tabler-pencil  ${hoverButtonAnimation}`} />
          </button>
          <button 
            className={`bg-black w-20 h-8 rounded-xl shadow-xl ${hoverButtonAnimation}`}
            onClick={() => null }>
              <h5 className={`text-white text-sm font-semibold`}>View Stats</h5>
          </button>
          <div id={componentId + `-footer-deleteIcon`}
            onClick={() => onDeleteBoxer(data.id!)} className="float-right">
              <DeleteIcon className={`w-8 h-8  ${hoverButtonAnimation}`}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxerCard;
