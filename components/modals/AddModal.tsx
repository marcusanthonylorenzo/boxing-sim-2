import React, { useState } from "react";
import { Boxer } from "../../constants/BoxerModel";
import useNextRouter from "../../hooks/useNextRouter";

type Props = {
  onHandleAddBoxer: (boxer?: any) => void;
  showAddModal: boolean;
  setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  isUserToggle: boolean;
  setIsUserToggle: React.Dispatch<React.SetStateAction<boolean>>;
};


const AddModal = ({
  onHandleAddBoxer, showAddModal, setAddModalVisibility, isUserToggle, setIsUserToggle
}: Props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [hometown, setHometown] = useState<string>("");
  const [homestate, setHomestate] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  // const [isUserToggle, setIsUserToggle] = useState<boolean>(false);
  const [birthday, setBirthday] = useState<number | null>(null);
  const [bio, setBio] = useState<string>("");
  const [color, setColor] = useState<string>("#F9A8D4");

  const { router } = useNextRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBoxerWithCustomAttributes = await
    {   
        first_name: firstName ? firstName : undefined,
        last_name: lastName ? lastName : undefined,
        nickname: nickname ? nickname : undefined,
        hometown: hometown ? hometown : undefined,
        homestate: homestate ? homestate : undefined,
        country: country ? country: undefined,
    }
    await onHandleAddBoxer(newBoxerWithCustomAttributes);
    // onHandleAddBoxer({ first_name, last_name, wins, is_user, created_at, id });
    setFirstName("");
    setLastName("");
    setNickname("");
    setHometown("");
    setHomestate("");
    setCountry("");
    setBio("");
    setAddModalVisibility(!showAddModal);
    router.reload();
  };

  const handleIsUserToggle = () => {
    setIsUserToggle(!isUserToggle)
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[35vw] my-6 mx-auto max-w-3xl">
          {/*bio*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">Create Boxer</h3>
              <button
                className="pb-1 ml-auto bg-transparent border-0 text-black opacity-40 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setAddModalVisibility(!showAddModal)}>
                x
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4">
                  <label className="flex text-gray-700 text-sm font-bold mb-2">
                    <h5 className="p-0 mr-6">Details</h5>
                    <span className="mr-2 text-green-500">User Character?</span>
                    <input
                      id={`isUser-checkbox`}
                      className={``}
                      type="checkbox"
                      checked={isUserToggle}
                      onChange={e => handleIsUserToggle()}
                    />
                  </label>
                    <input
                      className="shadow appearance-none border rounded w-[30%] mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      name="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      // required
                    />
                    <input
                      className="shadow appearance-none border rounded w-[30%] mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      name="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                      // required
                      />
                    <input
                      className="shadow appearance-none border rounded w-[30%] mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="nickname"
                      type="text"
                      placeholder="Nickname"
                      value={nickname}
                      name="nickname"
                      onChange={(e) => setNickname(e.target.value)}
                      // required
                      />
                </div>
                <div id={`AddModal-row-2`}
                  className={`mb-2`}>
                  <input
                    className="shadow appearance-none border rounded w-[30%] mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="hometown"
                    type="text"
                    placeholder="Hometown"
                    value={hometown}
                    name="hometown"
                    onChange={(e) => setHometown(e.target.value)}
                    // required
                    />
                  <input
                    className="shadow appearance-none border rounded w-[30%] mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="homestate"
                    type="text"
                    placeholder="State"
                    value={homestate}
                    name="homestate"
                    onChange={(e) => setHomestate(e.target.value)}
                    // required
                    />
                  <input
                    className="shadow appearance-none border rounded w-[30%] mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="country"
                    type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={(e) => setCountry(e.target.value)}
                    // required
                    />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
                  <textarea
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="bio"
                    rows={4}
                    value={bio}
                    name="bio"
                    onChange={(e) => setBio(e.target.value)}
                    // required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Shorts Color
                  </label>
                  <input
                    className="w-12 shadow appearance-none border  rounded text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="color"
                    type="color"
                    value={color}
                    name="bio"
                    onChange={(e) => setColor(e.target.value)}
                    // required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
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

export default AddModal;
