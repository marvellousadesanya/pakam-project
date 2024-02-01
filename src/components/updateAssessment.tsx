import axios from "axios";
import React, { useState } from "react";
import { useAssessment } from "@/context/assessment";

interface Prop {
  showPopup: () => void;
  itemID: string;
  fullName: string;
  description: string;
  quantity: number;
}

export default function UpdateAssessment({
  showPopup,
  itemID,
  fullName,
  description,
  quantity,
}: Prop) {
  const [newFullName, setNewFullName] = useState(fullName);
  const [newDescription, setNewDescription] = useState(description);
  typeof quantity === "number";
  const [newQuantity, setNewQuantity] = useState<number>(quantity);
  const { fetchAssessments } = useAssessment();

  const handleUpdateCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://pakam-project-backend.vercel.app/v1/assessment/${itemID}`,
        {
          fullName: newFullName,
          description: newDescription,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchAssessments();
        showPopup();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={showPopup}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] h-[400px] bg-white rounded-[10px] text-sm p-5 shadow-md space-y-12">
        <h2 className="text-2xl font-bold">Update Assessment</h2>

        <div className="grid grid-cols-2 gap-y-7 gap-x-12">
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Full Name</label>
            <input
              type="text"
              className="input-field"
              value={newFullName}
              onChange={(e) => setNewFullName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm">Description</label>
            <input
              type="text"
              className="input-field"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm">Quantity</label>
            <input
              type="number"
              className="input-field"
              value={newQuantity}
              onChange={(e) => {
                const value = parseInt(e.target.value); // Parse the input value into an integer
                setNewQuantity(isNaN(value) ? 0 : value); // If parsing fails (e.g., if the input is not a number), set the quantity to 0
              }}
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleUpdateCategory}
            className="text-center bg-[#005700] px-7 py-2 text-white rounded-[8px]">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
