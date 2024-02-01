"use client";

import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import CreateAssessment from "@/components/createAssessment";
import UpdateAssessment from "@/components/updateAssessment";
import DeleteCategory from "@/components/deleteCategory";
import { Assessment } from "@/types/assessment";
import { useAssessment } from "@/context/assessment";
import Image from "next/image";

export default function Assessment() {
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const { isLoading, fetchAssessments, assessments } = useAssessment();
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Assessment>();

  useEffect(() => {
    fetchAssessments();
    console.log("fetched");
  }, []);

  const createPopupHandler = () => {
    setShowCreatePopup(!showCreatePopup);
  };

  const showUpdatePopupFn = () => {
    setShowUpdatePopup(!showUpdatePopup);
  };
  const showDeletePopupFn = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  const updatePopupHandler = (item: Assessment) => {
    showUpdatePopupFn();
    setSelectedItem(item);
  };

  const deletePopupHandler = (item: Assessment) => {
    showDeletePopupFn();
    setSelectedItem(item);
  };

  return (
    <div className="bg-[#F7F7F4] w-full text-[#464F54] px-20">
      <div>
        <h2 className="text-2xl font-bold pl-12 pt-5">Assessment</h2>
      </div>

      <div className="w-full flex justify-end ">
        <button
          onClick={createPopupHandler}
          className="bg-[#005700] text-white rounded-[10px] px-7 text-sm py-2">
          Create
        </button>
      </div>

      {showCreatePopup && <CreateAssessment showPopup={createPopupHandler} />}
      {showUpdatePopup && selectedItem && (
        <UpdateAssessment
          itemID={selectedItem?._id}
          showPopup={showUpdatePopupFn}
          fullName={selectedItem?.fullName}
          description={selectedItem?.description}
          quantity={selectedItem?.quantity}
        />
      )}
      {showDeletePopup && selectedItem && (
        <DeleteCategory
          itemID={selectedItem._id}
          showPopup={showDeletePopupFn}
        />
      )}

      <div className="w-full mt-12">
        <div className="flex gap-2 w-full bg-white border border-[#E5E5E5] px-5 py-2">
          <Image
            src="/refresh-icon.svg"
            alt="Refresh icon"
            height={18}
            width={16}
            onClick={fetchAssessments}
          />
          <h2>Refresh</h2>
        </div>
        <main className="bg-white rounded-[6px]">
          {!isLoading ? (
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
                {assessments?.map((item: Assessment) => (
                  <tr key={item._id} className="border border-[#E5E5E5] mb-12">
                    <input type="checkbox" className="ml-5 mt-3" />
                    <td className="py-2 text-sm">{item.fullName}</td>
                    <td className="py-2 text-sm">{item.description}</td>
                    <td className="py-2 text-sm">{item.quantity}</td>
                    <td className="py-2 space-x-5">
                      <button
                        className="text-xs bg-[#005700] text-white px-4 py-2 rounded-[6px]"
                        onClick={() => updatePopupHandler(item)}>
                        Update
                      </button>

                      <button
                        onClick={() => deletePopupHandler(item)}
                        className="text-xs text-[#1E1E1E bg-white border border-[#1E1E1E] px-4 py-2 rounded-[6px]">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full flex justify-center items-center py-12">
              <BeatLoader color="green" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
