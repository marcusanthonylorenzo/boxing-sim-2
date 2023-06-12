import type { NextPage, GetServerSideProps } from "next";
import React, { Key, useState, useEffect, useId } from "react";
import io from "socket.io-client";
import { useQuery, useMutation } from '@tanstack/react-query'
import { generateRandomBoxer, generateRandomValue } from "../services/generateRandom";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { useRouter } from "next/router";

import BoxerCard from "../components/BoxerCard";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";

import { AddIcon } from "../icons/AddIcon";
import { Boxer } from "../constants/BoxerModel";

// const socket = io("https://api.localhost:3003", {
//   withCredentials: true,
//   // extraHeaders: {
//   //   "my-custom-header": "abcd"
//   // }
// });

const headersConfig = {
      'last_name-Type': 'application/json',
      apiKey:  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`
}
const supabaseAPI = "https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/boxers";

interface homeProps {
  results: Boxer[];
}
const Home: NextPage<homeProps> = ({ results }) => {
  const [boxers, setBoxers] = useState<Boxer[]>(results);
  const [showAddModal, setAddModalVisibility] = useState<boolean>(false);
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false);
  const [selectEditedNote, setSelectEditedNote] = useState<Boxer>();
  const router = useRouter();
  // const tempPostId = useId();

  // const createBoxerMutation = useMutation({
  //   mutationFn: (newBoxer) => {
  //     const { data } = axios.post('/api/boxers', newBoxer)
  //     return data
  // })

  const createNewBoxer = async (newBoxerData?: any) => {
    try {
      let newBoxer = newBoxerData !== undefined || newBoxerData === null ?  newBoxerData : generateRandomBoxer();
      const { data } = await axios.post('api/boxers', newBoxer)

      if (data) {
        router.reload();
        console.log(`boxer created!`)
        return data
      }
    } catch (error) {
      console.error(error);
    }
    // createBoxerMutation.mutate(newBoxer)
  }

  const handleAddBoxer = async (
    boxerArg?: Boxer
    ) => {

    let validBoxerData;  
    let oldboxersState = boxers;

    if (!boxerArg) {
      const data = createNewBoxer()
      validBoxerData = data
      console.log(`no boxerArg`, data)
      // router.reload();

    } else {
      validBoxerData = boxerArg

      try {
          console.log(`valid boxer data`, validBoxerData)
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

  const handleEditNote = async ({ first_name, last_name, wins, id }: Boxer ) => {
    // add Note optimistically to ui
    let oldboxersState = boxers;
    try {
      // manipulate the edit in the 
      const editboxers = boxers.map((boxer: { id: string | number; }) => {
        if (boxer.id === selectEditedNote?.id) {
          return {
            ...boxer,
            first_name,
            last_name,
            wins,
            updatedAt: new Date(),
          };
        }
        return boxer;
      });
      // Set edited Array to state
      // setBoxers(editboxers);
      // pass note edits to a put to api endpoint 
      const { data } = await axios.put(`/api/boxers/${selectEditedNote?.id}`, {
        first_name,
        last_name,
        wins,
      });
      if (data) {
        router.reload();
      }
      setUpdateModalVisibility(!showUpdateModal);
      setSelectEditedNote(undefined);
    } catch (error) {
      setBoxers(oldboxersState);
      console.error(error);
    }
  };

  const handleSelectEditedNote = (selectNote: Boxer | undefined) => {
    setSelectEditedNote(selectNote);
    setUpdateModalVisibility(!showUpdateModal);
  };

  const handleDeleteNote = async (id: number | string) => {
    try {
      //delete note base on id
      const removeItem = boxers.filter((boxer: { id?: string | number; }) => boxer.id !== id);
      setBoxers(removeItem);
      // set id to dynamically delete call
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
    <div className={styles.container}>
      <Head>
        {/* <first_name>Take boxers</first_name> */}
        <meta name="description"/>
        <link rel="icon" href="/site_logo.ico" />
      </Head>

      <main className={styles.main}>
        {showAddModal && (
          <AddModal
            onHandleAddBoxer={handleAddBoxer}
            showAddModal={showAddModal}
            setAddModalVisibility={setAddModalVisibility}
          />
        )}
        {/* {showUpdateModal && (
          // <EditModal
          //   onHandleEditNote={handleEditNote}
          //   setSelectEditedNote={setSelectEditedNote}
          //   selectEditedNote={selectEditedNote}
          //   showUpdateModal={showUpdateModal}
          //   setUpdateModalVisibility={setUpdateModalVisibility} 
          // />
        )} */}
        <div className="mb-5" onClick={() => setAddModalVisibility(!showAddModal)}>
          <AddIcon className="w-16 hover:scale-125 hover:duration-700 ease-in-out duration-700 ease-out-in" />
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {boxers?.map((boxer: Boxer, index: Key | null | undefined) => (
            <BoxerCard
              key={index}
              data={boxer}
              onSelectEditedNote={handleSelectEditedNote}
              onDeleteNote={handleDeleteNote}
            />
          ))}
        </div>
      </main>
      
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}/api/boxers`;
  const { data } = await axios.get(supabaseAPI, { headers: headersConfig })
  return {
    props: {
      results: data,
    },
  };
};

export default Home;
