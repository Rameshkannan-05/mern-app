import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterBar = ({
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  limit,
  setLimit,
  onFilter,
}) => (
  <div className="flex flex-wrap gap-4 mb-4">
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border px-2 py-1"
    />
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      placeholderText="Start Date"
      className="border px-2 py-1"
    />
    <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      placeholderText="End Date"
      className="border px-2 py-1"
    />
    <select
      value={limit}
      onChange={(e) => setLimit(parseInt(e.target.value))}
      className="border px-2 py-1"
    >
      <option value={5}>5 per page</option>
      <option value={10}>10 per page</option>
      <option value={20}>20 per page</option>
      <option value={50}>50 per page</option>
    </select>
    <button
      onClick={onFilter}
      className="bg-green-500 text-white px-4 py-1 rounded"
    >
      Filter
    </button>
  </div>
);

export default FilterBar;
