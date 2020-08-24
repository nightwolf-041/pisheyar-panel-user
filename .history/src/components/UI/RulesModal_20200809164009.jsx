import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classes from '*.module.css'

function RulesModal(props) {
    return (
        <div className={props.show ? classes.rulesModal : classes.rulesModalHidden}>
            
        </div>
    )
}

export default RulesModal
