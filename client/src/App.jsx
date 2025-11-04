import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import FilterBar from "./components/FilterBar";
import Modal from "./components/Modal";
import {
  fetchRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} from "./services/api";

function App() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [limit, setLimit] = useState(10); // Default page size
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const loadRecords = async () => {
    const params = {
      page,
      limit,
      search,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };
    try {
      const { data } = await fetchRecords(params);
      setRecords(data.records);
      setPages(data.pages);
    } catch (error) {
      console.error("Error loading records:", error);
    }
  };

  // Reload on page or limit change
  useEffect(() => {
    loadRecords();
  }, [page, limit]);

  // Reload on filter changes (search, dates)
  useEffect(() => {
    setPage(1); // Reset to page 1 when filters change
    loadRecords();
  }, [search, startDate, endDate]);

  const handleFilter = () => {
    setPage(1);
    loadRecords();
  };

  const handleCreate = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const handleSave = async (form) => {
    try {
      if (editingRecord) {
        await updateRecord(editingRecord._id, form);
      } else {
        await createRecord(form);
      }
      loadRecords();
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteRecord(id);
        loadRecords();
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Records Management</h1>
      <button
        onClick={handleCreate}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Record
      </button>
      <FilterBar
        search={search}
        setSearch={setSearch}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        limit={limit}
        setLimit={setLimit}
        onFilter={handleFilter}
      />
      <Table records={records} onEdit={handleEdit} onDelete={handleDelete} />
      <Pagination page={page} pages={pages} onPageChange={setPage} />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        record={editingRecord}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;
