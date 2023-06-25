import type { NextPage, GetServerSideProps } from "next";
import React, { Key, useState, useEffect, useContext, useId } from "react";
import io from "socket.io-client";
import { useQuery, useMutation } from 'react-query'
import { generateRandomBoxer, generateRandomValue } from "../services/generateRandom";
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

// const socket = io("https://api.localhost:3003", {
//   withCredentials: true,
//   // extraHeaders: {
//   //   "my-custom-header": "abcd"
//   // }
// });

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

  const [showAddModal, setAddModalVisibility] = useState<boolean>(false);
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false);
  const [updateBoxer, setUpdateBoxer] = useState<Boxer | null>(null);

  const { clickedBoxerCards, setClickedBoxerCards } = useContext(ClickedBoxerCardContext)
  const [ boxerSelected, setBoxerSelected ] = useState<Array<Boxer | null>>([])
  const [ hideFightAcceptModal, setHideFightAcceptModal ] = useState<string>(`hidden`);


  const { router } = useNextRouter();

  useEffect(() => {
    console.log(`rerender calendar`, results.calendar)
  }, [results.calendar])

  const createBoxerMutation = useMutation({
    mutationFn: async (newBoxer) => {
      const { data } = await axios.post('/api/boxers', newBoxer);
      return data;
    }
  })

  const createNewBoxer = async (newBoxerData?: any) => {
    try {
      let newBoxer = newBoxerData !== undefined || newBoxerData === null ?  newBoxerData : generateRandomBoxer();
      const { data } = await createBoxerMutation.mutateAsync(newBoxer)
      if (data) {
        router.reload();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBoxer = async ( boxerArg?: Boxer ) => {
    let validBoxerData;  
    let oldboxersState = boxers;

    if (!boxerArg) {
      const data = createNewBoxer()
      validBoxerData = data
      router.reload();
    } else {
      validBoxerData = boxerArg
      try {
          const { first_name, last_name, wins, is_user, created_at, id } = validBoxerData;
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
          const { data } = await createNewBoxer(validBoxerData);
          if (data) {
            router.reload();
          }
        } catch (error) {
          console.error(error);
          setBoxers(oldboxersState);
        }
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

  const checkBoxerCardAlreadyClicked = (boxer: Boxer, arrayToCheck: Array<Boxer | null>) => arrayToCheck!.some((eachClicked: Boxer | null) => eachClicked!.id === boxer.id)

  const handleBoxerCardClicked = (boxer?: Boxer, viewStatsIsClicked?: boolean) => {
    const alreadyClicked = boxer && checkBoxerCardAlreadyClicked(boxer, clickedBoxerCards);
    // const alreadyClicked = clickedBoxerCards.some(eachClicked => eachClicked.id === boxer.id)
    
    if (viewStatsIsClicked) { // Show Attributes drawer
      if (!alreadyClicked || clickedBoxerCards!.length === 0) {
        setClickedBoxerCards((prev: ClickedBoxerCardsT) => [...prev, boxer])
      } else if (alreadyClicked) {
        setClickedBoxerCards((current: ClickedBoxerCardsT) => current!.filter((cardNotUnclicked: Boxer)  => cardNotUnclicked.id !== boxer.id ))
      }
    } else { //Select Fighter option, also highlights boxer card
      const fighterAlreadySelected =  boxer && boxerSelected.length > 1 ? checkBoxerCardAlreadyClicked(boxer, boxerSelected) : null
      if (boxer) {
        if (fighterAlreadySelected) {
          console.log(boxer.first_name + `is already selected`)
          return fighterAlreadySelected
        } else {
          boxerSelected.length < 2 ? setBoxerSelected((prev) => [ ...prev, boxer]) : console.log(`two selected already`)
        }
      }
    }
    // console.log(boxerSelected.forEach(boxer => boxer!.first_name))
  }

  // async function socketInitializer() {
  // }

  // socket.on('connection', () => {
  //   console.log('connected client')
  // })

  // useEffect(() => {
  //   socket.connect()

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => console.log(results), [results]);

  return (
    <div className={styles.container + ` ${ boxerSelected.length === 2 && `bg-slate-50`}`}>
      <Head>
        <meta name="description"/>
        <link rel="icon" href="/site_logo.ico" />
      </Head>
      <main className={styles.main}>

        <Navbar
          styling={``}
          parentState={{
            boxerSelected,
            showAddModal,
            day,
            setDay,
            setHideFightAcceptModal
          }}
          setAddModalVisibility={setAddModalVisibility}
        />

        { 
          <FightAcceptModal hideModal={hideFightAcceptModal} setHideModal={setHideFightAcceptModal}/>
        }

        {showAddModal && (
          <AddModal
            onHandleAddBoxer={handleAddBoxer}
            showAddModal={showAddModal}
            setAddModalVisibility={setAddModalVisibility}
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
                  className={`absolute left-0 bg-blue-800 h-[70vh] px-4 py-2 rounded-
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
            className={`relative top-0 zsm:w-[58%] md:w-[62%] lg:w-[65%] 3xl:w-[69%] mx-0 justify-center items-center`}>
            <div className={`grid w-[90%] px-4
              ml-[8%] md:ml-[5%] xl:ml-[7%] 3xl:ml-16 mb-5
              sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5
              ${ boxerSelected.length === 2 && `bg-slate-200`}`}>
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
