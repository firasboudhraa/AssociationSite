
import React from 'react'
import Search from "@/components/molecules/dashboard/search/Search";
import Pagination from "@/components/molecules/dashboard/pagination/Pagination";
import Link from "next/link";
import Image from "next/image";
import styles from '../../../styles/teams.module.css'

const TeamPage = () => {
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
          <tr >
            <td>
              <div className={styles.member}>
                <Image
                  src={"/noavatar.png"}
                  alt={""}
                  width={40}
                  height={40}
                  className={styles.memberImage}
                />
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div className={styles.buttons}>
                <Link href={`/Dashboard/teams/test`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <button
                  className={`${styles.button} ${styles.delete}`}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
  )
}

export default TeamPage
