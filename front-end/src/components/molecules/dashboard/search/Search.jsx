"use client";

import React from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MdSearch } from "react-icons/md";
import styles from '../../../../styles/search.module.css'

const Search = ({ placeholder }) => {
  return (
    <div className={styles.container}>
        <MdSearch/>
        <input type="text" placeholder={placeholder} className={styles.input} />
      
    </div>
  )
}

export default Search
