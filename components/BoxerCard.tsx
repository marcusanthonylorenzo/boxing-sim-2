import React from "react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Boxer as BoxerType } from "../constants/BoxerModel";
import { Boxer } from "@prisma/client";

interface BoxerCardT {
  data: Boxer;
  onSelectEditedNote: (selectNote: BoxerType | undefined) => void;
  onDeleteNote: (id: number | string) => Promise<void>;
}

const BoxerCard = ({ data, onSelectEditedNote, onDeleteNote }: BoxerCardT) => {

  console.log(data)
 
  return (
    <div
      className={`w-54 h-64 flex flex-col justify-between  rounded-lg border  mb-6 py-5 px-4 -rotate-1 shadow-md`}
      >
      <div className="">
        <div className="flex">
          <div className="w-32">
            <h4 className="text-gray-900 font-bold mb-3">{data.first_name + " " + data.last_name}</h4>
          </div>
          <div onClick={() => onDeleteNote(data.id!)} className="float-right">
            <DeleteIcon className="w-8 h-8 hover:scale-125" />
          </div>
        </div>
        <p className="text-gray-800 text-sm">{data.id}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800">
          <p className="text-sm">{new Date(data.created_at!).toDateString()}</p>
          <button
            className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-pink-300   focus:ring-black hover:scale-125"
            aria-label="edit note"
            onClick={() => onSelectEditedNote(data)}
            role="button">
            <EditIcon className="icon icon-tabler icon-tabler-pencil hover:scale-125" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxerCard;
