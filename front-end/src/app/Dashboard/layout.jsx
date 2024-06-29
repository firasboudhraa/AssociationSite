import Navbar from "@/components/molecules/dashboard/navbar/navbar"
import Sidebar from "@/components/molecules/dashboard/sidebar/sidebar"
import styles from "../../styles/dashbord.module.css"



const layout = ({children}) => {
  return (
    <div className={styles.container}>
        <div className={styles.menu}>
            <Sidebar/>
        </div>
        <div className={styles.content}>
            <Navbar/>
            {children}
        </div>
      
    </div>
  )
}

export default layout
