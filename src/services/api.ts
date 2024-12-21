import { RecordType, PaginatedResponse } from "../types/CommonTypes";

const API_URL = "http://localhost:5000/api/records"; // Replace with your backend API URL

export const fetchRecords = async (
  page: number,
  size: number
): Promise<PaginatedResponse<RecordType>> => {
  const response = await fetch(`http://localhost:5000/api/records?page=${page}&limit=${size}`);
  console.log('response: ', response);
  if (!response.ok) throw new Error("Failed to fetch records");
  return response.json();
};

export const createOrUpdateRecord = async (
  type: "ambulance" | "doctor",
  data: RecordType
): Promise<RecordType> => {
  const method =   "POST";
  const response = await fetch(`http://localhost:5000/api/records`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to save the record");
  return response.json();
};

export const deleteRecord = async (
  type: "ambulance" | "doctor",
  id: number
): Promise<void> => {
  const response = await fetch(`${API_URL}/${type}/${id}, { method: "DELETE" }`);
  if (!response.ok) throw new Error("Failed to delete the record");
};