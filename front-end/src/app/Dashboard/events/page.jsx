import React from 'react'
import styles from '../../../styles/events.module.css'
import Pagination from '../../../components/molecules/dashboard/pagination/Pagination'
import Search from '@/components/molecules/dashboard/search/Search'
import Link from "next/link";
import Image from 'next/image';


const EventsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for an event..." />
        <Link href="/Dashboard/events/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
            <tr >
              <td>
                <div className={styles.event}>
                  <Image
                    src={""}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.eventImage}
                  />
                  {}
                </div>
              </td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/Dashboard/events/test`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form >
                    <input type="hidden" name="id" value={""} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
      <Pagination  />
    </div>
  )
}

export default EventsPage
