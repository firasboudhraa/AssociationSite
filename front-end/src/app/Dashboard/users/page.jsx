"use client";

import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import styles from "@/styles/users.module.css";
import Search from "@/components/molecules/dashboard/search/Search";
import Pagination from "@/components/molecules/dashboard/pagination/Pagination";
import Link from "next/link";
import Image from "next/image";
import Spinner from '@/components/molecules/spinner/Spinner'

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/users");
      setUsers(Array.isArray(result.data.results) ? result.data.results : []);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/usersdelete/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete the user");
      console.error(err);
    }
  };

  if (loading) return <Spinner/>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/Dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.photo || "/noavatar.png"}
                    alt={user.name}
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.name}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{user.role}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/Dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
