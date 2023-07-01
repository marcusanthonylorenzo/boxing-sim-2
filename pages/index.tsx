import type { NextPage, GetServerSideProps } from "next";
import React, { Key, useState, useEffect, useContext, useId } from "react";
// import io from "socket.io-client";
import { useQuery, useMutation } from 'react-query'
import { motion, AnimatePresence } from "framer-motion"
import useFightStartContext from "../hooks/useFightStart";

import AddModal from "../components/modals/AddModal";
import FightAcceptModal from "../components/modals/FightAcceptModal";
import IsLoadingModal from "../components/events/IsLoadingModal";
import BoxerReadyDrawer from "../components/drawers/BoxerReadyDrawer";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import useNextRouter from "../hooks/useNextRouter";

import Navbar from "../containers/Navbar";
import Arena from "../containers/Arena";
import { Main } from "../containers/Main";

import { Boxer } from "../constants/BoxerModel";
import { ClickedBoxerCardsT } from "../constants/State";
import { ClickedBoxerCardContext } from "../services/Context";
import fightStartContext from "../context/fightStartContext";
import { generateBoxer } from "../services/generateBoxer";

interface homeProps {
  results: {
    boxers: Boxer[],
    calendar: {
        [`0`]: {
          day: number | null
      }
    }
  }
}

const Home: NextPage<homeProps> = ({ results }) => {
  // console.log(`results`, results.calendar)
  const [boxers, setBoxers] = useState<Boxer[]>(results.boxers);
  const [ day, setDay ] = useState<number | null>(results.calendar[`0`].day)
  const [isUserToggle, setIsUserToggle] = useState<boolean>(false);

  const [showAddModal, setAddModalVisibility] = useState<boolean>(false);
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false);
  const [updateBoxer, setUpdateBoxer] = useState<Boxer | null>(null);

  const { clickedBoxerCards, setClickedBoxerCards } = useContext(ClickedBoxerCardContext)
  const [ boxerSelected, setBoxerSelected ] = useState<Array<Boxer | null>>([])
  const [ hideFightAcceptModal, setHideFightAcceptModal ] = useState<string>(`hidden`);
  const [ fightStart, setFightStart] = useFightStartContext();

  const { router } = useNextRouter();

  const createBoxerMutation = useMutation({
    mutationFn: async (newBoxer: Boxer) : Promise<any> => {
      Promise.all([
        await axios.post('/api/boxers', newBoxer),
        await axios.post('/api/fight_stats', {
            id: newBoxer.id
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
      console.log(error); 
    }
  };


  return (
    <div className={styles.container + 
      `${ boxerSelected.length === 2 && `bg-slate-50`}
      ${fightStart && `bg-slate-600`}`}>

      <Head>
        <meta name="description"/>
        <link rel="icon" href="/site_logo.ico" />
      </Head>
      
      <main className={styles.main + ``}>

          <div id={`Home-Navbar-wrapper`}
            className="flex fixed z-60 top-0 items-center justify-center">
            <Navbar
              styling={``}
              parentState={{
                boxerSelected,
                showAddModal,
                day,
                setDay,
                setHideFightAcceptModal,
              }}
              setAddModalVisibility={setAddModalVisibility}
            />
          </div>

          { 
            <FightAcceptModal hideModal={hideFightAcceptModal} setHideModal={setHideFightAcceptModal}/>
          }

          { showAddModal && (
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
                      
          <div id="Home-content-corner-1">
            { boxerSelected.length >= 1 &&
              <AnimatePresence>
              <motion.div
                  className={`absolute left-0 top-[20vh] z-49 bg-blue-800 h-[70vh] px-4 py-2 rounded-md
                  ${fightStart ? `duration-150 w-[21vw]` : `w-[18vw]`}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 15, transition: { duration: 0.20, delay: 0.09} }}
                  exit={{ opacity: 0.3, x: -100 }}>
                <BoxerReadyDrawer cornerNumber={1} boxersSelectedData={boxerSelected} />
              </motion.div>
            </AnimatePresence>
            }
          </div>

          <div id="Home-Main-wrapper"
            className={`relative top-[2vh] mt-[5vh] z-48 w-[55vw] h-[70vh] rounded-md
            ${ boxers.length > 3 && `overflow-y-scroll`}
            ${ fightStart ? `bg-slate-500` : `bg-zinc-100`}`}>
        
        {!fightStart ?
          (
          // <div id="Home-Main-wrapper"
          //   className={`bg-zinc-100 relative top-[2vh] mt-[5vh] z-48 w-[55vw] h-[70vh] rounded-md
          //   ${ boxers.length > 3 && `overflow-y-scroll`}`}>
              <Main 
                isUserToggle={isUserToggle}
                setIsUserToggle={setIsUserToggle}
                hideFightAcceptModal={hideFightAcceptModal}
                setHideFightAcceptModal={setHideFightAcceptModal}
                showAddModal={showAddModal}
                setAddModalVisibility={setAddModalVisibility}
                showUpdateModal={showUpdateModal}
                setUpdateModalVisibility={setAddModalVisibility}
                boxerSelected={boxerSelected}
                setBoxerSelected={setBoxerSelected}
                boxers={boxers}
                setBoxers={setBoxers}
                updateBoxer={updateBoxer}
                setUpdateBoxer={setUpdateBoxer}
                handleDeleteBoxer={handleDeleteBoxer}
                router={router}
                />
 
          // </div>
          ) : (<>
              <Arena boxerSelected={boxerSelected} />
          </>)

          }
          </div>

          <div id="Home-content-corner-2">
            { boxerSelected.length === 2 &&
              <AnimatePresence>
                <motion.div
                    className={`absolute right-0 bg-red-700 top-[20vh] h-[70vh]
                    ${fightStart ? `duration-150 w-[21vw]` : `duration-150 w-[18vw]`} px-4 py-2 rounded-md`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: -15, transition: { duration: 0.20, delay: 0.09} }}
                    exit={{ opacity: 0.3, x: -100 }}>
                  <BoxerReadyDrawer cornerNumber={2} boxersSelectedData={boxerSelected} />
                </motion.div>
              </AnimatePresence>
              }
            </div>
            
        </main>  
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}/api/`;
  const getBoxers = axios.get(apiURL + `boxers`)
  const getCalendar = axios.get(apiURL + `calendar`)

  const resultsData = await Promise.all([
    getBoxers,
    getCalendar
  ])
  .then((values) => {
    return values
  })
  // console.log( `gssp`, resultsData[`0`].data, resultsData[`1`].data.filter((dayObj: any) => dayObj.id === 1))
  return {
    props: {
      results: {
        boxers: resultsData[`0`].data,
        calendar: resultsData[`1`].data.filter((dayObj: any) => dayObj.id === 1)
      },
    },
  };
}

export default Home;
