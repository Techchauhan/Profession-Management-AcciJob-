'use client';
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import UserTable from "@/components/Table";

interface userData {
  key: string;
  username: string;
  age: number | string;
  profession: string;

}


export default function Home() {
  const [existingUsers, setExistingUsers] = useState<userData[]>([]);

  // Load existing users from localStorage on component mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setExistingUsers(users);
  }, []);

  // Handle form submission
  const handleSubmit = (formData: Omit<userData, "key" >) => {
    console.log("Form Submitted:", formData);

    // Update localStorage and state
    const updatedUsers = [...existingUsers, { ...formData, key: Date.now().toString() }];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setExistingUsers(updatedUsers);
  };

  // Handle user deletion
  const handleDelete = (key: string) => {
    const filteredUsers = existingUsers.filter((user) => user.key !== key);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
    setExistingUsers(filteredUsers);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header handleSubmit={handleSubmit} />
      <UserTable existingUsers={existingUsers} onDelete={handleDelete} />
    </div>
  );
}
