import React from "react";

const Table = ({ records, onEdit, onDelete }) => (
  <table className="min-w-full table-auto">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2">Title</th>
        <th className="px-4 py-2">Description</th>
        <th className="px-4 py-2">Date</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record) => (
        <tr key={record._id} className="border-b">
          <td className="px-4 py-2">{record.title}</td>
          <td className="px-4 py-2">{record.description}</td>
          <td className="px-4 py-2">
            {new Date(record.date).toLocaleDateString()}
          </td>
          <td className="px-4 py-2">{record.status}</td>
          <td className="px-4 py-2 flex">
            <button
              onClick={() => onEdit(record)}
              className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(record._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
