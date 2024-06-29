import React from 'react'
import Card from '@/components/molecules/dashboard/card/card'
import styles from '@/styles/dashbord.module.css'
import Chart from '@/components/molecules/dashboard/chart/chart'
import Righbar from '@/components/molecules/dashboard/rightbar/rightbar'
import Donation from '@/components/molecules/dashboard/donations/donation'

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card/>
          <Card/>
          <Card />
        </div>
        <Donation/>
        <Chart/>
      </div> 
      <div className={styles.side}>
        <Righbar/>
      </div>
    </div>
  )
}

export default Dashboard;
