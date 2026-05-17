import type { ReactNode } from "react";

export interface Employee {
  id: number; // Or string, depending on your server.js
  name: string;
  email: string;
  role: string; // e.g., 'Admin', 'Developer'
  department: string; // e.g., 'Engineering', 'HR'
  status: "Active" | "Inactive"; // Using a Union type for specific values

  // 🛡️ ADD THESE MISSING FIELDS:
  doj: string;
  location: string;
  employmentType: string;

  // Optional backend metadata fields:
  createdAt?: string;
  updatedAt?: string;
  salary?: number;
}

export interface FilterState {
  search: string;
  filter: string;
}

export interface ModalState {
  isOpen: boolean; // Controls visibility
  onClose: () => void; // Function to close the modal
  title: string; // The header text
  children?: ReactNode;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
}

export interface EmpFormstate {
  name: string;
  email: string;
  department: string;
  doj: string;
  location: string;
  employmentType: string;
}
