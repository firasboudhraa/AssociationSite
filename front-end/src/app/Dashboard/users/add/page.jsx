import React from 'react'
import styles from '../../../../styles/addUser.module.css'

const AddUserPage = () => {
  return (
    <div className={styles.container}>
    <form  className={styles.form}>
      <input type="text" placeholder="username" name="username" required />
      <input type="email" placeholder="email" name="email" required />
      <input
        type="password"
        placeholder="password"
        name="password"
        required
      />
      <input type="phone" placeholder="phone" name="phone" />
      <input type="file" name="profilePicture" accept="image/*" />
      <select name="isAdmin" id="isAdmin">
        <option value={false}>
          Is Admin?
        </option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <textarea
        name="address"
        id="address"
        rows="16"
        placeholder="Address"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  </div>
  )
}

export default AddUserPage
