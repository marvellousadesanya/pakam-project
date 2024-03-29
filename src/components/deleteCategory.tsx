import React from "react";
import { useAssessment } from "@/context/assessment";
import axios from "axios";
interface Prop {
  showPopup: () => void;
  itemID: string;
}

export default function DeleteCategory({ showPopup, itemID }: Prop) {
  const { fetchAssessments } = useAssessment();

  const handleDeleteCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://pakam-project-backend.vercel.app/v1/assessment/${itemID}`,

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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="w-[400px] h-[240px] bg-white opacity-100 rounded-[10px] text-sm p-5 shadow-md space-y-12 flex justify-center items-center">
        <div className="space-y-12">
          <h2 className="text-[#005700] text-2xl font-bold">
            Delete Waste Category
          </h2>
          <p className="text-black">
            Are you sure you want to delete this waste category?
          </p>

          <div className="flex justify-end gap-x-3">
            <button
              onClick={showPopup}
              className="text-[#005700] bg-white border px-5 py-2 border-[#005700] rounded-[10px]">
              Cancel
            </button>
            <button
              onClick={handleDeleteCategory}
              className="rounded-[10px] text-white px-5 py-2 bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
