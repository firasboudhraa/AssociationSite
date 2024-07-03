"use client";

import React from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from '../../../../styles/pagination.module.css';

const Pagination = ({ pagination, setPagination }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChangePage = (newPage) => {
    setPagination(prev => ({ ...prev, current_page: newPage }));
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    replace(`${pathname}?${params}`);
  };

  const { current_page, last_page } = pagination;

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={current_page === 1}
        onClick={() => handleChangePage(current_page - 1)}
      >
        Previous
      </button>
      <span className={styles.pageInfo}>
        Page {current_page} of {last_page}
      </span>
      <button
        className={styles.button}
        disabled={current_page === last_page}
        onClick={() => handleChangePage(current_page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
