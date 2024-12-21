import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import {
  fetchRecords,
  createOrUpdateRecord,
  deleteRecord,
} from "../services/api";
import { RecordType } from "../types/CommonTypes";

const Dashboard: React.FC = () => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: any = await fetchRecords(currentPage, 10); // Fetch for ambulance or doctor
      setRecords(data.data);
      setTotalPages(Math.ceil(data.pagination.total / 10));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  if (loading) return <LoadingState />;
  if (error) return <div>Error: {error}</div>;
  if (records.length === 0) return <EmptyState />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Records</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setModalOpen(true)}
      >
        Add New
      </button>
      {/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
      </Modal> */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.title}</td>
              <td>{record.description}</td>
              <td>{record.location}</td>
              <td>
                {record.image ? (
                  <img src={record.image} alt={record.title} className="h-10" />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <button
                  className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => setModalOpen(true)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() =>
                    deleteRecord("ambulance", record.id).then(fetchData)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Dashboard;
