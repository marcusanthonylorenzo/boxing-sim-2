import React from "react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Boxer } from "../constants/BoxerModel";
// import { Boxer } from "@prisma/client";

interface BoxerCardT {
  data: Boxer;
  onUpdateBoxer: (selectNote: Boxer) => void;
  onDeleteBoxer: (id: number | string) => Promise<void>;
}

const BoxerCard = ({ data, onUpdateBoxer, onDeleteBoxer }: BoxerCardT) => { 

  const componentId = `BoxerCard-${data.id}`

  return (
    <div id={componentId}
      className={`flex flex-col justify-between
        w-54 h-64 rounded-lg border mb-6 py-8 px-6 -rotate-1 shadow-md`}>
      <div className="">
        <div className="flex">
          <div id={`${componentId}-titleDiv-fullname`} className="w-32 py-2 mr-20">
            <h2 className="text-gray-900 text-lg xt-20 font-bold mb-3">{data.first_name + " " + data.last_name}</h2>
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
