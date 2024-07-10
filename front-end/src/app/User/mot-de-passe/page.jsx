import React from 'react';
import ChangePasswordForm from '../../../components/molecules/user/password/ChangePassword';
import styles from '../../../styles/changePassword.module.css';

const ChangePasswordPage = () => {
  return (
    <div className={styles.container}>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
