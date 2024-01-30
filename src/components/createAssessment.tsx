import React from "react";

interface Prop {
  showPopup: () => void;
}

export default function CreateAssessment({ showPopup }: Prop) {
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
            <input type="text" className="input-field" />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm">Description</label>
            <input type="text" className="input-field" />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm">Quantity</label>
            <input type="text" className="input-field" />
          </div>
        </div>

        <div>
          <button className="text-center bg-[#005700] px-7 py-2 text-white rounded-[8px]">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
