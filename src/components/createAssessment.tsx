import React, { useState } from "react";
import axios from "axios";
import { useAssessment } from "@/context/assessment";

interface Prop {
  showPopup: () => void;
}

export default function CreateAssessment({ showPopup }: Prop) {
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const { fetchAssessments } = useAssessment();

  const handleCreateAssessment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://pakam-project-backend.vercel.app/v1/create",
        {
          fullName,
          description,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
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
        <h2 className="text-2xl font-bold">Create Assessment</h2>

        <div className="grid grid-cols-2 gap-y-7 gap-x-12">
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Full Name</label>
            <input
              type="text"
              className="input-field"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm">Description</label>
            <input
              type="text"
              className="input-field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm">Quantity</label>
            <input
              type="text"
              className="input-field"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleCreateAssessment}
            className="text-center bg-[#005700] px-7 py-2 text-white rounded-[8px]">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
