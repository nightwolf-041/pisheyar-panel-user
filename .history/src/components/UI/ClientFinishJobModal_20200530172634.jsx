import React from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import Rating from 'react-rating'
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import classes from './ui.module.css';


function ClientFinishJobModal(props) {

    const [cookies, setCookie, removeCookie] = useCookies();
    const [loading, setLoading] = React.useState(false)
    const [finishMessage, setFinishMessage] = React.useState('')
    const [finishMessageValid, setFinishMessageValid] = React.useState(true)
    const [finishPrice, setFinishPrice] = React.useState('')
    const [finishPriceValid, setFinishPriceValid] = React.useState(true)

    const [rating, setRating] = React.useState()

    React.useEffect(() => {
        if(props.hidden === true) {
            setFinishMessage('')
            setFinishMessageValid(true)
            setFinishPrice('')
            setFinishPriceValid(true)
        }
    })

    const orderRequestCreate = () => {

        if(finishMessage.length <= 5) {
            setFinishMessageValid(false)
        }else{
            setFinishMessageValid(true)
        }

        if(finishPrice.length < 4) {
            setFinishPriceValid(false)
        }else{
            setFinishPriceValid(true)
        }

        if(finishMessage.length > 5 && finishPrice.length >= 4) {

            setFinishMessageValid(true)
            setFinishPriceValid(true)
            setLoading(true)

            axios.post('http://185.94.97.164/api/OrderRequest/Accept', {
                orderRequestGuid: props.orderReqGuid,
                comment: finishMessage,
                rate: rating,
                cost: finishPrice
              }, {
                headers: { Authorization: "Bearer " + cookies.token }
              }).then(res => {
                console.log(res);
              })
        }
    }

    const finishMsgChangeHandler = e => {
        setFinishMessage(e.target.value)
    }

    const finishPriceChangeHandler = e => {
        setFinishPriceValue(e.target.value)
    }

    // const changeRating = ( newRating, name ) => {
    //     setRating(newRating)
    // }
    const ratingChangeHandler = val => {
        setRating(val)
        console.log(val);
    }

    return (
        <div className={!props.hidden ? 
        classes.clientFinishModal : 
        classes.clientFinishModalHidden}
        >
            <textarea
            onChange={e => finishMsgChangeHandler(e)}
            value={finishMessage}
            placeholder="نظر"
            className={finishMessageValid ? 
                classes.clientFinishModalTextarea :
                classes.clientFinishModalTextareaInvalid }>
            </textarea>
            <input
            onChange={e => finishPriceChangeHandler(e)}
            value={finishPrice}
            placeholder="قیمت نهایی"
            className={finishPriceValid ?
                classes.clientFinishModalInput :
                classes.clientFinishModalInputInvalid}
            />
            <h5 className={classes.clientFinishModalRatingTitle}>امتیاز</h5>
            <div className={classes.clientFinishModalRatingBox}>
                <Rating 
                emptySymbol={<FontAwesomeIcon icon={faStar} style={{color: '#ffd41746', fontSize: '1.4rem', margin: '0 0.1rem'}} /> }
                fullSymbol={<FontAwesomeIcon icon={faStar} style={{color: '#ffd617', fontSize: '1.5rem', margin: '0 0.1rem'}} /> }
                // placeholderSymbol={<FontAwesomeIcon icon={faStar} /> }
                start={0}
                stop={5}
                step={1}
                initialRating={rating}
                fractions={4}
                // quiet={true}
                onChange={val => ratingChangeHandler(val)}
                />
                {/* <StarRatings
                rating={rating}
                starRatedColor="gold"
                changeRating={(newRating, name) => changeRating( newRating, name )}
                numberOfStars={5}
                name='rating'
                // rating={2.403}
                starDimension="25px"
                starSpacing="5px"
                isAggregateRating={true}
                /> */}
            </div>
            <div className={classes.clientFinishModalButtonsBox}>
                <button className={classes.clientFinishModalButton}
                disabled={loading}
                onClick={props.hideClientFinishModal}>
                    انصراف
                </button>
                <button className={classes.clientFinishModalButton}
                disabled={loading}
                onClick={() => orderRequestCreate()}>
                    اتمام کار
                </button>
            </div>
        </div>
    )
}

export default ClientFinishJobModal