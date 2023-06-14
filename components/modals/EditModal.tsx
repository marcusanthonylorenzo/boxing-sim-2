import React, { useEffect, useState } from "react";
import { Boxer } from "../../constants/BoxerModel";

interface UpdatePropT {
  onHandleUpdateBoxer: (boxer: Boxer) => void;
  selectUpdateBoxer: Boxer | null;
  showUpdateModal: boolean;
  setSelectUpdateBoxer: React.Dispatch<React.SetStateAction<Boxer>>;
  setUpdateModalVisibility: (visibility: boolean) => void;
}

const EditModal = ({
  onHandleUpdateBoxer,
  selectUpdateBoxer,
  showUpdateModal,
  setSelectUpdateBoxer,
  setUpdateModalVisibility,

}: UpdatePropT) => {
  const [first_name, setFirst_Name] = useState<string | undefined>(selectUpdateBoxer?.first_name);
  const [id, setId] = useState<string | number>(selectUpdateBoxer?.id!);
  const [color, setColor] = useState<string | undefined>("#F9A8D4"); // refactor later

  // handle event
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // onHandleUpdateBoxer((prevBoxer : Boxer) => {
    //   return {...prevBoxer,
    //     [`first_name`]: first_name } 
    // });
    setUpdateModalVisibility(!showUpdateModal);
    setFirst_Name("");
    setId("");
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*id*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Edit boxer</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-red-500"
                onClick={() => setUpdateModalVisibility(!showUpdateModal)}>
                Close
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    first_name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="first_name"
                    type="text"
                    placeholder="first_name"
                    value={first_name}
                    name="first_name"
                    onChange={(e) => setFirst_Name(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    id
                  </label>
                  <input
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="id"
                    type="text"
                    value={id}
                    name="id"
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pick boxer Color
                  </label>
                  <input
                    className="w-12 shadow appearance-none border  rounded w-full  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="color"
                    type="color"
                    value={color}
                    name="id"
                    onChange={(e) => setColor(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default EditModal;
