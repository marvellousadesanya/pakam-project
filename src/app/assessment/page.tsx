"use client";

import React, { useState } from "react";
import CreateAssessment from "@/components/createAssessment";
import UpdateAssessment from "@/components/updateAssessment";
import DeleteCategory from "@/components/deleteCategory";

const initialData = [
  {
    fullName: "Marvellous Adesanya",
    Description: "Waste at Sangotedo",
    Quantity: 5,
  },
  {
    fullName: "Niyi Adebanjo",
    Description: "Waste at Lekki",
    Quantity: 7,
  },
  {
    fullName: "Chukwuma Chinonso",
    Description: "Waste at Ikotun",
    Quantity: 13,
  },
];

export default function Assessment() {
  const [data, setData] = useState(initialData);
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

  const handleUpdate = (fullName: string) => {
    setShowUpdatePopup(!showUpdatePopup);
  };

  const handleDelete = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  const handleCreate = () => {
    // // Add your delete logic here
    // setData(data.filter((item) => item.fullName !== fullName));
    setShowCreatePopup(!showCreatePopup);
    // console.log("Delete clicked for:", fullName);
  };

  const createPopupHandler = () => {
    setShowCreatePopup(!showCreatePopup);
  };

  const updatePopupHandler = () => {
    setShowUpdatePopup(!showUpdatePopup);
  };

  const deletePopupHandler = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  return (
    <div className="bg-[#F7F7F4] w-full text-[#464F54] px-20">
      <div>
        <h2 className="text-2xl font-bold pl-12 pt-5">Assessment</h2>
      </div>

      <div className="w-full flex justify-end ">
        <button
          onClick={handleCreate}
          className="bg-[#005700] text-white rounded-[10px] px-7 text-sm py-2">
          Create
        </button>
      </div>

      {showCreatePopup && <CreateAssessment showPopup={createPopupHandler} />}
      {showUpdatePopup && <UpdateAssessment showPopup={updatePopupHandler} />}
      {showDeletePopup && <DeleteCategory showPopup={deletePopupHandler} />}

      <div className="w-full mt-12">
        <main className="bg-white rounded-[6px]">
          <table className="w-full border border-[#E5E5E5] p-12">
            <thead>
              <tr className="font-semibold">
                <input className="ml-5 mt-3" type="checkbox" />
                <td className="py-2">Name</td>
                <td className="py-2">Description</td>
                <td className="py-2">Quantity</td>
                <td className="py-2">Actions</td>
              </tr>
            </thead>
            <tbody className="border border-[#E5E5E5]">
              {data.map((item, index) => (
                <tr key={index} className="border border-[#E5E5E5] mb-12">
                  <input type="checkbox" className="ml-5 mt-3" />
                  <td className="py-2 text-sm">{item.fullName}</td>
                  <td className="py-2 text-sm">{item.Description}</td>
                  <td className="py-2 text-sm">{item.Quantity}</td>
                  <td className="py-2 space-x-5">
                    <button
                      className="text-xs bg-[#005700] text-white px-4 py-2 rounded-[6px]"
                      onClick={() => handleUpdate(item.fullName)}>
                      Update
                    </button>
                    <button
                      onClick={deletePopupHandler}
                      className="text-xs text-[#1E1E1E bg-white border border-[#1E1E1E] px-4 py-2 rounded-[6px]">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
