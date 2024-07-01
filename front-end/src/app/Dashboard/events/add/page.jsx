import React from 'react'
import styles from '../../../../styles/addEvent.module.css'

const AddEventpage = () => {
  return (
    <div className={styles.container}>
    <form  className={styles.form}>
      <input type="text" placeholder="title" name="title" required />
      <input type="number" placeholder="price" name="price" required />
      <input type="text" placeholder="size" name="size" />
      <textarea
        required
        name="desc"
        id="desc"
        rows="16"
        placeholder="Description"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  </div>
  )
}

export default AddEventpage
