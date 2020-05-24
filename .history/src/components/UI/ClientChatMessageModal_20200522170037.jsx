import React from 'react'
import classes from './ui.module.css'

const ClientChatMessageModal = (props) => {
    return (
        <div className={classes.messageModal}>
            <h4 className={classes.messageModalTitle}>
                پیام متخصص
            </h4>
            <p className={classes.messageModalDesc}>
                با سلام و درود بر شما من متخصص در امر تعمیرات در خدمت شما هستم
            </p>
        </div>
    )
}

export default ClientChatMessageModal
