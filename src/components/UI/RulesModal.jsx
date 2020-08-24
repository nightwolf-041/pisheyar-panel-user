import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classes from './ui.module.css'
import styles from './rulesModal.module.css'

function RulesModal(props) {
    return (
        <>
            <div className={props.show ? classes.uiModalsBackdrop : classes.uiModalsBackdropHidden}
            onClick={props.hideRulesModal}>
            </div>

            <div className={props.show ? styles.rulesModal : styles.rulesModalHidden}>
                <PerfectScrollbar>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                    <h4>asfdsadfadsfdsfadfsdf</h4>
                </PerfectScrollbar>
            </div>
        </>
    )
}

export default RulesModal
