import React, { Key, useState, useEffect, useContext, useId } from "react";
// import io from "socket.io-client";
import { useQuery, useMutation } from 'react-query'
import { generateBoxer, generateRandomValue } from "../services/generateBoxer";
import { motion, AnimatePresence } from "framer-motion"

import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import useNextRouter from "../hooks/useNextRouter";

import Navbar from "../containers/Navbar";
import BoxerCard from "../components/BoxerCard";
import AddModal from "../components/modals/AddModal";
import EditModal from "../components/modals/EditModal";
import IsLoadingModal from "../components/events/IsLoadingModal";

import { Boxer } from "../constants/BoxerModel";
import { ClickedBoxerCardsT } from "../constants/State";
import { ClickedBoxerCardContext } from "../services/Context";
import BoxerReadyDrawer from "../components/drawers/BoxerReadyDrawer";
import FightAcceptModal from "../components/modals/FightAcceptModal";
import useFightStart from "../hooks/useFightStart";
import fightStartContext from "../context/fightStartContext";
import { NextRouter } from "next/router";
import useFightStartContext from "../hooks/useFightStart";
import useActiveBoxerSelection from "../hooks/useActiveBoxerSelection";

interface MainT {
  isUserToggle: boolean,
  setIsUserToggle: React.Dispatch<React.SetStateAction<boolean>>,
  hideFightAcceptModal: string,
  setHideFightAcceptModal: React.Dispatch<React.SetStateAction<string>>,
  // handleAddBoxer,
  // handleUpdateBoxer,
  // handleDeleteBoxer,
  // handleBoxerCardClicked,
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
  router: NextRouter,
  // createBoxerMutation,
}

export const Main = ({
  isUserToggle, setIsUserToggle,
  hideFightAcceptModal, setHideFightAcceptModal,
  showAddModal, setAddModalVisibility,
  showUpdateModal, setUpdateModalVisibility,
  boxerSelected, setBoxerSelected, boxers, setBoxers,
  updateBoxer, setUpdateBoxer,
  router
}: MainT) => {

  const { clickedBoxerCards, setClickedBoxerCards } = useActiveBoxerSelection();

  const createBoxerMutation = useMutation({
    mutationFn: async (newBoxer: Boxer) : Promise<any> => {
      Promise.all([
        await axios.post('/api/boxers', newBoxer),
        await axios.post('/api/fight_stats', {
            fighter_id: newBoxer.id
        })
      ]).then(values => {
        return values
      })
    }
  })

  const createNewBoxer = async (newBoxerData?: any) => {
    try {
      const newBoxer = await generateBoxer(isUserToggle, newBoxerData);
      const { data } = await createBoxerMutation.mutateAsync(newBoxer);
      if (data) {
        console.log(`createBoxerMutation data`, data)
        router.reload();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBoxer = async ( boxerArg?: any) => {
    let oldboxersState = boxers;
      try {
          const { first_name, last_name, wins, is_user, created_at, id } = boxerArg;
          const addboxers = [
            ...boxers,
            {
              id,
              first_name,
              last_name,
              wins,
              is_user,
              created_at,
              updated_at: new Date(),
            },
          ];
          setBoxers(addboxers);
          const { data } = await createNewBoxer(boxerArg);
          if (data) {
            router.reload();
          }
        } catch (error) {
          console.error(error);
          setBoxers(oldboxersState);
        }
  };

  const handleUpdateBoxer = async (boxer: Boxer) => {
    let oldboxersState = boxers;

    try {
      const editboxers = boxers.map((boxer: { id: string | number; }) => {
        if (boxer.id === updateBoxer?.id) {
          return {
            ...boxer,
            updatedAt: new Date(),
          };
        }
        return boxer;
      });

      const { data } = await axios.put(`/api/boxers/${updateBoxer?.id}`, {
        boxer
      });
      if (data) {
        router.reload();
      }
      setUpdateModalVisibility(!showUpdateModal);
      setUpdateBoxer(null);
    } catch (error) {
      setBoxers(oldboxersState);
      console.error(error);
    }
  };

  // const handleSelectUpdateBoxer = (selectBoxer: Boxer | null) => {
  //   setUpdateBoxer(selectBoxer);
  //   setUpdateModalVisibility(!showUpdateModal);
  // };

  const handleDeleteBoxer = async (id: number | string) => {
    try {
      const removeItem = boxers.filter((boxer: { id?: string | number; }) => boxer.id !== id);
      setBoxers(removeItem);
      await axios.delete(`/api/boxers/${id}`,
        { 
          data: {
            id: id
          }  
        })
      router.reload();
    } catch (error) {
      console.error(error); 
    }
  };

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
          boxerSelected.length < 2 ? setBoxerSelected((prev) => [ ...prev, boxer]) : console.log(`two selected already`)
        }
      }
    }
  }

  return (
    <div>
      MAIN

                { 
                  <FightAcceptModal hideModal={hideFightAcceptModal} setHideModal={setHideFightAcceptModal}/>
                }

                  {showAddModal && (
                    <AddModal
                      onHandleAddBoxer={handleAddBoxer}
                      showAddModal={showAddModal}
                      setAddModalVisibility={setAddModalVisibility}
                      isUserToggle={isUserToggle}
                      setIsUserToggle={setIsUserToggle}
                    />
                  )        
                  }

                  {
                    createBoxerMutation.isLoading && (
                      <IsLoadingModal props={{ text: `CREATING NEW BOXER`}}/>
                    )
                  }
                {/*         
                  {showUpdateModal && (
                    <EditModal
                      onHandleUpdateBoxer={handleUpdateBoxer}
                      selectUpdateBoxer={setUpdateBoxer}
                      updateBoxer={updateBoxer}
                      showUpdateModal={showUpdateModal}
                      setUpdateModalVisibility={setUpdateModalVisibility} 
                    />
                  )} */}

                  {/* <div className="mb-5" onClick={() => setAddModalVisibility(!showAddModal)}>
                    <AddIcon className="w-16 hover:scale-125 hover:duration-700 ease-in-out duration-700 ease-out-in" />
                  </div> */}

                  <div id="Home-content-mainContainer"
                    className={`flex relative w-full justify-center mt-[15vh] top-[-6vh]`}>
                    
                    <div id="Home-content-corner-1">
                      { boxerSelected.length >= 1 &&
                        <AnimatePresence>
                        <motion.div
                            className={`absolute left-0 bg-blue-800 h-[70vh] px-4 py-2 rounded-md
                            ${hideFightAcceptModal ? `w-[18vw]` : `w-[18vw]`}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 15, transition: { duration: 0.20, delay: 0.09} }}
                            exit={{ opacity: 0.3, x: -100 }}>
                          <BoxerReadyDrawer cornerNumber={1} boxersSelectedData={boxerSelected} />
                        </motion.div>
                      </AnimatePresence>
                      }
                    </div>

                    <div id="Home-content-mainWrapper"
                      className={`relative top-0 h-[70vh] sm:w-[58%] md:w-[62%] lg:w-[65%] 3xl:w-[69%] mx-0 justify-center items-center
                      ${ boxers.length > 3 && `overflow-y-scroll`}`}>
                      <div id="Home-content-innerWrapper"
                        className={`grid w-[80%] px-4
                        ml-[8%] md:ml-[5%] xl:ml-[7%] 3xl:ml-16 mb-5
                        sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5
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
                                onDeleteBoxer={handleDeleteBoxer}
                                onClickHandler={() => {
                                  handleBoxerCardClicked(boxer);
                                }}
                                clickedBoxerCards={clickedBoxerCards}
                                boxerSelected={boxerSelected}
                                setBoxerSelected={setBoxerSelected}
                                checkBoxerCardAlreadyClicked={checkBoxerCardAlreadyClicked}
                                styleProps={
                                    { cardBgColor: `green-500` }
                                }
                              />
                              </motion.div>
                          </AnimatePresence>
                        ))}
                      </div>
                    </div>

                    <div id="Home-content-corner-2">
                    { boxerSelected.length === 2 &&
                      <AnimatePresence>
                        <motion.div
                            className={`absolute right-0 bg-red-700 h-[70vh] w-[18vw] px-4 py-2 rounded-md`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: -15, transition: { duration: 0.20, delay: 0.09} }}
                            exit={{ opacity: 0.3, x: -100 }}>
                          <BoxerReadyDrawer cornerNumber={2} boxersSelectedData={boxerSelected} />
                        </motion.div>
                      </AnimatePresence>
                      }
                    </div>

                  </div>
    </div>
  )
}
