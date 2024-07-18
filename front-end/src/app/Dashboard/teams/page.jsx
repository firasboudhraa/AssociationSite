"use client"

import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import styles from '../../../styles/teams.module.css';
import Search from '@/components/molecules/dashboard/search/Search';
import Pagination from '@/components/molecules/dashboard/pagination/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from '@/components/molecules/spinner/Spinner';

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

  useEffect(() => {
    fetchData();
  }, [pagination.current_page]); 

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

      setMembers(results); // Assuming 'results' contains the array of members
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
              <td>{member.role}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/Dashboard/teams/${member.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <button className={`${styles.button} ${styles.delete}`}>Delete</button>
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
