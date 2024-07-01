import React from 'react'
import styles from '../../../../styles/singleEvent.module.css'
import Image from 'next/image'

const SingleEventPage = () => {
  return (
<div className={styles.container}>
    <div className={styles.infoContainer}>
      <div className={styles.imgContainer}>
        <Image src="/noavatar.png" alt="" fill />
      </div>
    </div>
    <div className={styles.formContainer}>
      <form  className={styles.form}>
        <input type="hidden" name="id" value={""} />
        <label>Title</label>
        <input type="text" name="title" placeholder={""} />
        <label>Price</label>
        <input type="number" name="price" placeholder={""} />
        <label>Size</label>
        <textarea
          type="text"
          name="size"
          placeholder={ "size"}
        />
        <label>Description</label>
        <textarea
          name="desc"
          id="desc"
          rows="10"
          placeholder={""}
        ></textarea>
        <button>Update</button>
      </form>
    </div>
  </div>
  )
}

export default SingleEventPage
