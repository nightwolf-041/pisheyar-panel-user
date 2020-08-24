import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classes from 'rulesModal.module.css'

function RulesModal(props) {
    return (
        <div className={props.show ? classes.rulesModal : classes.rulesModalHidden}>
            <PerfectScrollbar>
                <h4>asfdsadfadsfdsfadfsdf</h4>
                <h4>asfdsadfadsfdsfadfsdf</h4>
                <h4>asfdsadfadsfdsfadfsdf</h4>
                <h4>asfdsadfadsfdsfadfsdf</h4>
                <h4>asfdsadfadsfdsfadfsdf</h4>
                <h4>asfdsadfadsfdsfadfsdf</h4>
            </PerfectScrollbar>
        </div>
    )
}

export default RulesModal
