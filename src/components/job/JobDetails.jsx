import React from 'react'
import styles from "./style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCity, faClock, faEarth, faLocation, faPhone, faRibbon, faUserGroup } from '@fortawesome/free-solid-svg-icons'

      const JobDetails = ({jobOffers, index}) => {
  return (
    <div>
        {
            jobOffers[index] &&
            <div className={styles.job_details_card}>
                <div className={styles.job_details_title}>
                    <h3></h3>
                    <p>4 Days Ago</p>
                </div>
                <div className={styles.job_details_content}>
                    <div className={styles.job_details_item}>
                        <div className={styles.job_details_left}>
                            <div>
                            <FontAwesomeIcon icon={faUserGroup} />                                
                            <p>Job Category : </p>                             
                            </div>
                            <p>{jobOffers[index].job_category}</p>
                        </div>
                        <div className={styles.job_details_right}>
                            <div>
                                <FontAwesomeIcon icon={faEarth} />   
                                <p>Job Title</p>                             
                            </div>
                            <p>{jobOffers[index].title_en}</p>
                        </div>
                    </div>
                    <div className={styles.job_details_item}>
                        <div className={styles.job_details_left}>
                            <div>
                            <FontAwesomeIcon icon={faRibbon} />
                            <p>Experience : </p>                             
                            </div>
                            <p>{jobOffers[index].experience}</p>
                        </div>
                        <div className={styles.job_details_right}>
                            <div>
                            <FontAwesomeIcon icon={faClock} />
                            <p>Work Hours :</p>                             
                            </div>
                            <p>{jobOffers[index].work_hours}</p>
                        </div>
                    </div>
                    <div className={styles.job_details_item}>
                        <div className={styles.job_details_left}>
                            <div>
                            <FontAwesomeIcon icon={faCity} />                                
                            <p>City : </p>                             
                            </div>
                            <p>{jobOffers[index].city}</p>
                        </div>
                        <div className={styles.job_details_right}>
                            <div>
                                <FontAwesomeIcon icon={faEarth} />   
                                <p>Location</p>                             
                            </div>
                            <p>{jobOffers[index].location}</p>
                        </div>
                    </div>
                    <div className={styles.job_details_item}>
                        <div className={styles.job_details_left}>
                            <div>
                            <FontAwesomeIcon icon={faPhone} />                                
                            <p>Phone : </p>                             
                            </div>
                            <p>{jobOffers[index].phone}</p>
                        </div>
                        <div className={styles.job_details_right}>
                            <div>
                                <FontAwesomeIcon icon={faLocation} />   
                                <p>Salary</p>                             
                            </div>
                            <p>{jobOffers[index].salary}</p>
                        </div>
                    </div>
                    <div className={styles.job_details_req}>
                        <h5>Requirement</h5>
                        <p>{jobOffers[index].requirements_en}</p>
                    </div>
                </div>
            </div>
        }
    </div>
)
}

export default JobDetails