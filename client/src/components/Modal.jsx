import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, record, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    status: "active",
  });

  useEffect(() => {
    if (record) setForm(record);
  }, [record]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">
          {record ? "Edit Record" : "Create Record"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full mb-2 p-2 border"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full mb-2 p-2 border"
            required
          />
          <input
            type="date"
            value={
              form.date ? new Date(form.date).toISOString().split("T")[0] : ""
            }
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full mb-2 p-2 border"
            required
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full mb-4 p-2 border"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
