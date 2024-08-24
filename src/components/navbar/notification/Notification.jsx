import React from 'react'
import styles from "./notification.module.css"

const Notification = ({element}) => {
  return (
    <li className={styles.li} style={{backgroundColor : element.seen  ? "#fff" : "#dddddd"}}>
        <img className={styles.notification_image} src="/assets/find-me-logo.png" alt="shop " />
        <div className={styles.notification_content}>
            <h4>{element.title}</h4>
            <p>{element.body}</p>
        </div>
    </li>
  )
}

export default Notification
