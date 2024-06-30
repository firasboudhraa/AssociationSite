import Navbar from "@/components/molecules/dashboard/navbar/navbar"
import Sidebar from "@/components/molecules/dashboard/sidebar/sidebar"
import styles from "../../styles/dashbord.module.css"
import Footer from "@/components/molecules/dashboard/footer/Footer"



const layout = ({children}) => {
  return (
    <div className={styles.container}>
        <div className={styles.menu}>
            <Sidebar/>
        </div>
        <div className={styles.content}>
            <Navbar/>
            {children}
            <Footer/>
        </div>
      
    </div>
  )
}

export default layout
