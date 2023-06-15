import React, { useEffect, useState } from "react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Boxer } from "../constants/BoxerModel";
import BoxerAttributesDrawer from "./drawers/BoxerAttributesDrawer";
import { motion, AnimatePresence } from "framer-motion"
// import { Boxer } from "@prisma/client";

interface BoxerCardT {
  styleProps?: {
    cardBgColor?: string
  },
  data: Boxer;
  onUpdateBoxer: (selectNote: Boxer) => void;
  onDeleteBoxer: (id: number | string) => Promise<void>;
  onClickHandler: () => void;
  checkBoxerCardAlreadyClicked: (boxer: Boxer) => boolean;
  clickedBoxerCards: Array<Boxer>;
}

const BoxerCard = ({ styleProps, data, onUpdateBoxer, onDeleteBoxer, onClickHandler, checkBoxerCardAlreadyClicked, clickedBoxerCards }: BoxerCardT) => { 

  const componentId = `BoxerCard-${data.id}`

  const [ cardIsClicked, setCardIsClicked ] = useState<boolean>();

  useEffect(() => {
    const isThisCardClicked = checkBoxerCardAlreadyClicked(data)
    setCardIsClicked(isThisCardClicked)
  }, [clickedBoxerCards])

  return (
    <div id={componentId}
      className={`flex flex-col justify-between
        w-56 h-66 rounded-lg border mb-6 py-8 px-6 -rotate-1 shadow-md
        hover:shadow-xl hover:cursor-pointer
        bg-${styleProps?.cardBgColor}`}
      onClick={() => onClickHandler()}>

        {
          cardIsClicked ? (
            <AnimatePresence>
              <motion.div id={`${componentId}-BoxerAttributes-parentWrapper`}
                className={`absolute top-[3px] left-[3px] bg-green-500 py-4 px-5 h-[98%] w-[97%] rounded-lg`}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0}}
                  exit={{ opacity: 0.3, x: -100 }}>
                <BoxerAttributesDrawer data={data} />
              </motion.div>
            </AnimatePresence>
          ): null
        }

      <div className="">
        <div className="flex">
          <div id={`${componentId}-titleDiv-fullname`} className="w-32 py-2 mr-20">
            <h3 className="text-gray-900 text-lg xt-20 font-bold mb-3">{data.first_name + " " + data.last_name}</h3>
          </div>
        </div>
        <div id={`${componentId}-contentDiv`} className="text-gray-800 text-sm pb-5">
          <h5 id={componentId + `-weightClass`} className={`mr-2`}>{data.weightclass} lbs</h5>
          <h5 id={componentId + `-record`} className={`mr-2`}>{data.wins}-{data.losses}-{data.draws}</h5>
          <h5 id={componentId + `-hometown`} className={`mr-2`}>{data.hometown}</h5>
        </div>
      </div>
      <div>
        <div id={`${componentId}-footerDiv`} className="flex items-center justify-between text-gray-800">
          <button
            className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300   focus:ring-black hover:scale-125"
            aria-label="edit note"
            onClick={() => onUpdateBoxer(data)}
            role="button">
            <EditIcon className="icon icon-tabler icon-tabler-pencil hover:scale-125" />
          </button>
          <div id={componentId + `-footer-deleteIcon`}
            onClick={() => onDeleteBoxer(data.id!)} className="float-right">
              <DeleteIcon className="w-8 h-8 hover:scale-125" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxerCard;
