import React, { useEffect, useState } from "react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Boxer } from "../constants/BoxerModel";
import BoxerAttributesDrawer from "./drawers/BoxerAttributesDrawer";
import { motion, AnimatePresence } from "framer-motion"
import { ClickedBoxerCardsT } from "../constants/State";
interface BoxerCardT {
  styleProps?: {
    cardBgColor?: string,
    gridPosition?: string
  },
  data: Boxer;
  onUpdateBoxer: (selectNote: Boxer) => void;
  handleDeleteBoxer: (id: number | string) => Promise<void>;
  onClickHandler: (boxer?: Boxer, viewStatsIsClicked?: boolean) => void;
  checkBoxerCardAlreadyClicked: (boxer: Boxer, arrayToCheck: Array<Boxer | null>) => boolean;
  clickedBoxerCards: ClickedBoxerCardsT;
  boxerSelected: Array<Boxer | null>;
  setBoxerSelected: React.Dispatch<React.SetStateAction<Array<Boxer | null>>>;
}

const BoxerCard = ({
    styleProps, data,  clickedBoxerCards, boxerSelected, setBoxerSelected,
    onUpdateBoxer, handleDeleteBoxer, onClickHandler, checkBoxerCardAlreadyClicked,
  }: BoxerCardT) => { 

  const componentId = `BoxerCard-${data.id}`
  const hoverButtonAnimation = `hover:scale-110 hover:duration-100`
  // const boxerSelectedBgColor = `bg-green`

  const [ cardIsClicked, setCardIsClicked ] = useState<boolean>();
  const [ viewStatsIsClicked, setViewStatsIsClicked ] = useState<boolean>();
  const [ fighterCurrentlySelected, setFighterCurrentlySelected ] = useState<boolean>(checkBoxerCardAlreadyClicked(data, boxerSelected)) //the fighter's id in this card is passed through checkBoxer... as "data", and filtered against "boxerSelected"

  useEffect(() => {
    const isThisCardClicked = checkBoxerCardAlreadyClicked(data, clickedBoxerCards)
    setCardIsClicked(isThisCardClicked)
  }, [clickedBoxerCards])

  useEffect(() => {
    const checkFighterCurrentlySelectedAgain = checkBoxerCardAlreadyClicked(data, boxerSelected)
    setFighterCurrentlySelected(checkFighterCurrentlySelectedAgain)
    console.log(`boxercard useeffect`, fighterCurrentlySelected, boxerSelected, data.first_name)
  }, [boxerSelected])

  const handleBoxerSelectUnselect = () => {
      if (fighterCurrentlySelected) {
        const boxerRemoved = boxerSelected.filter(boxer => boxer!.id !== data.id)
        setBoxerSelected(boxerRemoved)
      } else {
        !viewStatsIsClicked && onClickHandler(data, viewStatsIsClicked);
      }
  };

  return (
    <div id={`${componentId}`}
      className={`flex flex-col relative bg-white
        w-52 h-58 rounded-lg ${ data.is_user? `border-6 ` : `border`} px-6 pt-8 shadow-md
        hover:shadow-xl hover:cursor-pointer ${styleProps?.gridPosition} ${styleProps}
        ${ fighterCurrentlySelected ? `bg-slate-400 border-zinc-00` : styleProps?.cardBgColor}`}>

        {
          viewStatsIsClicked ? (
            <AnimatePresence>
              <motion.div id={`${componentId}-BoxerAttributes-parentWrapper`}
                className={`flex absolute top-[2%] left-[3%] bg-white py-5 px-3 h-[96%] w-[93%] rounded-lg shadow-inner`}
                  initial={{ opacity: 0.9, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.1, delay: 0.09} }}
                  exit={{ opacity: 0.3, x: -100 }}>
                <BoxerAttributesDrawer data={data} onClick={() => setViewStatsIsClicked(false)} />
              </motion.div>
            </AnimatePresence>
          ): null
        }

        <div id={`${componentId}-details`} className={``}
          onClick={() => {
            handleBoxerSelectUnselect();
          }}>
          {/* <div className={`flex h-20`}> */}
          <div id={`${componentId}-titleDiv-fullname`} className="w-[100%] pb-2">
            <h3 className={`text-sm xt-20 font-bold mb-1 w-[100%]
              ${fighterCurrentlySelected && `text-[#f7f6f6ec]`} ${data.is_user? `${ fighterCurrentlySelected ? `text-green-300` : `text-green-400`}` : `text-gray-900`} `}>{data.first_name + " " + data.last_name}</h3>
              {data.is_user ? <h5 className={`text-[11px] ${ fighterCurrentlySelected ? `text-green-300` : `text-green-400`} font-thin`}>User Character</h5> : null}
          </div>
          {/* </div> */}
          <div id={`${componentId}-contentDiv`} className={`text-gray-800 text-[12px] pb-5 font-semibold
            `}>
            <h5 id={componentId + `-weightClass`} className={`${fighterCurrentlySelected && `text-[#f7f6f6ec]`}`}>{data.weightclass} lbs</h5>
            <h5 id={componentId + `-ranking`} className={`${fighterCurrentlySelected && `text-[#f7f6f6ec]`}`}>#{data.ranking} at [weightclass]</h5>
            <h5 id={componentId + `-record`} className={`${fighterCurrentlySelected && `text-[#f7f6f6ec]`}`}>{data.wins}-{data.losses}-{data.draws}</h5>
            <h5 id={componentId + `-hometown`} className={`${fighterCurrentlySelected && `text-[#f7f6f6ec]`} text-[11px]`}>{data.hometown}, {data.country}</h5>
          </div>
        </div>
        <div>

        <div id={`${componentId}-footerDiv`} className="flex items-center justify-between text-gray-800 my-5">
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
            onClick={ async () => {
              await setViewStatsIsClicked(!viewStatsIsClicked)
          }}>
              <h5 className={`text-white text-sm font-semibold`}>View Stats</h5>
          </button>
          <div id={componentId + `-footer-deleteIcon`}
            onClick={() => handleDeleteBoxer(data.id!)} className="float-right">
              <DeleteIcon className={`w-8 h-8  ${hoverButtonAnimation}`}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxerCard;
