"use client"

import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import styles from '../../../styles/teams.module.css';
import Search from '@/components/molecules/dashboard/search/Search';
import Pagination from '@/components/molecules/dashboard/pagination/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from '@/components/molecules/spinner/Spinner';
import { useSearchParams, useRouter } from 'next/navigation'; // Correct import

const TeamPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 5,
    total: 0,
    last_page: 0,
  });

  const searchParams = useSearchParams();
  const router = useRouter(); 

  useEffect(() => {
    fetchData();
  }, [pagination.current_page, searchParams]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`http://localhost:8000/api/teams`, {
        params: {
          page: pagination.current_page,
          perPage: pagination.per_page,
        },
      });

      const { results, pagination: fetchedPagination } = result.data;

      setMembers(results);
      setPagination({
        current_page: fetchedPagination.current_page,
        per_page: fetchedPagination.per_page,
        total: fetchedPagination.total,
        last_page: fetchedPagination.last_page,
      });
    } catch (err) {
      setError('Something went wrong');
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/teamsdelete/${id}`); 
      setMembers(members.filter((member) => member.id !== id));
    } catch (err) {
      setError('Failed to delete the member');
      console.error(err);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a member..." />
        <Link href="/Dashboard/teams/add">
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
          {members.map((member) => (
            <tr key={member.id}>
              <td>
                <div className={styles.member}>
                  <Image
                    src={member.photo || '/noavatar.png'}
                    alt={member.name}
                    width={40}
                    height={40}
                    className={styles.memberImage}
                  />
                  {member.name}
                </div>
              </td>
              <td>{member.email}</td>
              <td>{new Date(member.created_at).toLocaleDateString()}</td>
              <td>{member.function}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/Dashboard/teams/${member.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default TeamPage;
