import React, { Key, useState, useEffect, useContext, useId } from "react";
// import io from "socket.io-client";
import { useQuery, useMutation } from 'react-query'
import { generateBoxer, generateRandomValue } from "../services/generateBoxer";
import { motion, AnimatePresence } from "framer-motion"

import axios from "axios";

import BoxerCard from "../components/BoxerCard";
import { Boxer } from "../constants/BoxerModel";
import { ClickedBoxerCardsT } from "../constants/State";
import { ClickedBoxerCardContext } from "../services/Context";
import { NextRouter } from "next/router";
import useFightStartContext from "../hooks/useFightStart";
import useActiveBoxerSelection from "../hooks/useActiveBoxerSelection";

interface MainT {
  isUserToggle: boolean,
  setIsUserToggle: React.Dispatch<React.SetStateAction<boolean>>,
  hideFightAcceptModal: string,
  setHideFightAcceptModal: React.Dispatch<React.SetStateAction<string>>,
  showAddModal: boolean,
  setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  showUpdateModal: boolean,
  setUpdateModalVisibility:  React.Dispatch<React.SetStateAction<boolean>>,
  boxerSelected: Array<Boxer | null>,
  setBoxerSelected: React.Dispatch<React.SetStateAction<Array<Boxer | null>>>,
  boxers: Boxer[],
  setBoxers: React.Dispatch<React.SetStateAction<Boxer[]>>,
  updateBoxer: Boxer | null,
  setUpdateBoxer: React.Dispatch<React.SetStateAction<Boxer | null>>,
  handleDeleteBoxer: (id: number | string) => Promise<void>
  router: NextRouter,
  // createBoxerMutation,
}

export const Main = ({
  // boxerSelected, setBoxerSelected,
  boxers, setBoxers,
  handleDeleteBoxer,
  router
}: MainT) => {

  const { clickedBoxerCards, setClickedBoxerCards } = useActiveBoxerSelection();
  const { boxerSelected, setBoxerSelected } = useFightStartContext();
  console.log(`main 46`, boxerSelected, clickedBoxerCards)

  const handleUpdateBoxer = () => console.log(`nothing for now`)

  const checkBoxerCardAlreadyClicked = (boxer: Boxer | null, arrayToCheck: Array<Boxer | null>) => arrayToCheck!.some((eachClicked: Boxer | null) => boxer !== null && eachClicked!.id === boxer.id)

  const handleBoxerCardClicked = (boxer: Boxer, viewStatsIsClicked?: boolean) => {
    console.log(`main 170`, boxer, viewStatsIsClicked)
    const alreadyClicked = boxer && checkBoxerCardAlreadyClicked(boxer, clickedBoxerCards);
    // const alreadyClicked = clickedBoxerCards.some(eachClicked => eachClicked.id === boxer.id)
    
    if (viewStatsIsClicked) { // Show Attributes drawer
      if (!alreadyClicked || clickedBoxerCards!.length === 0) {
        setClickedBoxerCards([boxer])
      } else if (alreadyClicked && clickedBoxerCards.length > 0) {
        setClickedBoxerCards((current: ClickedBoxerCardsT) => current!.filter((cardNotUnclicked: Boxer)  => cardNotUnclicked.id !== boxer.id ))
      }
    } else { //Select Fighter option, also highlights boxer card
      const fighterAlreadySelected =  boxer && boxerSelected.length > 1 ? checkBoxerCardAlreadyClicked(boxer, boxerSelected) : null
      if (boxer) {
        if (fighterAlreadySelected) {
          // console.log(boxer.first_name + `is already selected`)
          return fighterAlreadySelected
        } else {
          boxerSelected.length < 2 ? setBoxerSelected((prev: Boxer[]) => [ ...prev, boxer]) : console.log(`two selected already`)
        }
      }
    }
  }

  return (
        <div id="Main-content"
            className={`grid w-[80%] h-[30vh] px-4 ml-[8%] md:ml-[5%] xl:ml-[7%] 3xl:ml-16 mb-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5
            ${ boxerSelected.length === 2 && `bg-slate-100`}`}>
            {boxers?.map((boxer: Boxer, index: Key | null | undefined) => (
              <AnimatePresence>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.18, delay: 0.09} }}
                  exit={{ opacity: 0.3, x: -100 }}>
                  <BoxerCard
                    key={index}
                    data={boxer}
                    onUpdateBoxer={handleUpdateBoxer}
                    handleDeleteBoxer={handleDeleteBoxer}
                    onClickHandler={() => {
                      handleBoxerCardClicked(boxer);
                    }}
                    clickedBoxerCards={clickedBoxerCards}
                    boxerSelected={boxerSelected}
                    setBoxerSelected={setBoxerSelected}
                    checkBoxerCardAlreadyClicked={checkBoxerCardAlreadyClicked}
                    styleProps={
                        { cardBgColor: `green-500`,
                          // gridPosition: `col-start-${index}`
                        }
                    }
                  />
                  </motion.div>
              </AnimatePresence>
            ))}
        </div>
  )
}
