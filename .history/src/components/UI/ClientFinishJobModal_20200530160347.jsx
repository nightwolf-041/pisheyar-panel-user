import React from 'react'
import Rating from 'react-rating'
import classes from './ui.module.css';


function ClientFinishJobModal() {
    return (
        <div className={classes.clientFinish}>
            <Rating />
        </div>
    )
}

export default ClientFinishJobModal
