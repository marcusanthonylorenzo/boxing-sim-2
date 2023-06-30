import type { NextPage, GetServerSideProps } from "next";
import React, { Key, useState, useEffect, useContext, useId } from "react";
// import io from "socket.io-client";
import { useQuery, useMutation } from 'react-query'
import { motion, AnimatePresence } from "framer-motion"
import useFightStartContext from "../hooks/useFightStart";

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

  useEffect(() => {
    // console.log(`rerender calendar`, results.calendar)
  }, [results.calendar])

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
            setHideFightAcceptModal,
          }}
          setAddModalVisibility={setAddModalVisibility}
        />
        
        {!fightStart ?

          (<>
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
                router={router}
                />
 
          </>) : (<>
          
              <Arena boxerSelected={boxerSelected} />
          
          </>)
          }
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
