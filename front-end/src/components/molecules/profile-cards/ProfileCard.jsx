"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '../../../styles/profileCard.module.css';

const ProfileCard = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/teams?page=1&perPage=5')
            .then(response => {
                setTeam(response.data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching team data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.profileWrapper}>
            {team.length === 0 ? (
                <div className={styles.noMembers}>No members yet</div>
            ) : (
                team.map(member => (
                    <div key={member.id} className={styles.profile}>
                        <div className={styles.profileImage}>
                            <Image
                                src={member.photo}
                                alt="Profile"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <ul className={styles.socialIcons}>
                            <li>
                                <a href="#instagram" title="Instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#twitter" title="Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#threads" title="Threads">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M19 7.5c-1.333 -3 -3.667 -4.5 -7 -4.5c-5 0 -8 2.5 -8 9s3.5 9 8 9s7 -3 7 -5s-1 -5 -7 -5c-2.5 0 -3 1.25 -3 2.5c0 1.5 1 2.5 2.5 2.5c2.5 0 3.5 -1.5 3.5 -5s-2 -4 -3 -4s-1.833 .333 -2.5 1" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#linkedin" title="Linkedin">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                        <path d="M8 11l0 5" />
                                        <path d="M8 8l0 .01" />
                                        <path d="M12 16l0 -5" />
                                        <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <div className={styles.profileName}>
                            <h2>{member.name}</h2>
                            <div className={styles.profileBio}>
                                {member.function}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProfileCard;
