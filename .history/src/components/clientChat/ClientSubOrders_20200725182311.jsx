import React from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'


function ClientSubOrders(props) {

    const [cookies, setCookie, removeCookie] = useCookies();

    let [subOrderRequestsForClient, setSubOrderRequestsForClient] = React.useState(null)
    let [subOrderIsAllowed, setSubOrderIsAllowed] = React.useState(null)
    let [requestLoading, setRequestLoading] = React.useState(false)

    React.useEffect(() => {

        // console.log(props.guid);

        setRequestLoading(true)
        axios.get(`http://185.211.59.237/OrderRequest/GetOrderRequestsForClient?orderGuid=${props.guid}`, {
            headers: { Authorization: "Bearer " + cookies.token }
            }).then(res => {
                // console.log(res.data);
                setRequestLoading(false)
                if(res.data.state === 1){
                    console.log(res.data.orderRequests);
                    setSubOrderIsAllowed(res.data.isAllowed)
                    setSubOrderRequestsForClient(res.data.orderRequests)
                }
            }).catch(err => {

            })
    }, [props.guid])
    // acceptanceStatus
    const renderLineWithState = state => {
        if(state === "لغو شده") {
            return(<div className="chatbox-sidebar-content-message-person-line bg-danger"></div>)
        }else if(state === "در انتظار تایید"){
            return(<div className="chatbox-sidebar-content-message-person-line bg-warning"></div>)
        }else if(state === "تایید شده"){
            return(<div className="chatbox-sidebar-content-message-person-line bg-info"></div>)
        }else {
            return(<div className="chatbox-sidebar-content-message-person-line bg-success"></div>)
        }
    }


    return (
        <>
        {props.guid && !requestLoading ?
            props.guid && subOrderRequestsForClient !== null ?
             subOrderRequestsForClient.map((subOrderReq, index) => (
                <div key={index}
                className={subOrderReq.orderRequestGuid !== props.clickedOrderGuid ?
                    "chatbox-sidebar-content-message-person" :
                    "chatbox-sidebar-content-message-person-active"
                }
                    
                    onClick={() => props.showPesronMessageModal(
                    subOrderReq.orderRequestGuid,
                    subOrderReq.message,
                    subOrderReq.contractor,
                    subOrderReq.offeredPrice,
                    subOrderReq.isAllowed,
                    subOrderReq.gender)}
                    >
                    {renderLineWithState(subOrderReq.acceptanceStatus)}
                    <div className="chatbox-sidebar-content-message-person-main">
                        <div className="chatbox-sidebar-content-message-person-profile">
                            <img
                            // src={props.maleAvatar}
                            src={
                                subOrderReq.gender === "مرد" ?
                                    props.maleAvatar :
                                subOrderReq.gender === "زن" ?
                                    props.femaleAvatar :
                                    null
                            }
                                alt="avatar" className="chatbox-sidebar-content-message-person-profile-img" />
                        </div>
                        <div className="chatbox-sidebar-content-message-person-desc">
                            <div className="chatbox-sidebar-content-message-person-desc-topbox">
                                <p className={subOrderReq.orderRequestGuid !== props.clickedOrderGuid ?
                                "chatbox-sidebar-content-message-person-desc-top" :
                                "chatbox-sidebar-content-message-person-desc-top-active"
                            }>
                                    {subOrderReq.contractor}
                                </p>
                            </div>
                            <div className="chatbox-sidebar-content-message-person-desc-middbox">
                                <p className={subOrderReq.orderRequestGuid !== props.clickedOrderGuid ?
                                "chatbox-sidebar-content-message-person-desc-midd" :
                                "chatbox-sidebar-content-message-person-desc-midd-active"
                                }>
                                    {subOrderReq.message}
                                </p>
                            </div>
                            <p className={subOrderReq.orderRequestGuid !== props.clickedOrderGuid ?
                            "chatbox-sidebar-content-message-person-desc-bottom" :
                            "chatbox-sidebar-content-message-person-desc-bottom-active"
                            }>
                                {subOrderReq.modifiedDate}
                            </p>
                        </div>
                    </div>
                    {/* <span className="chatbox-sidebar-content-message-person-badge">
                        0
                    </span> */}
                    <span className="">
                    </span>
                </div>
            ))
            :
            <div className="clientSubOrders-no-message-box">
                سفارشی یافت نشد
            </div>
            : 
        <div className="clientSubOrders-loader-keeper">
            <div className="clientChat-loader"></div>
        </div>
        }
        </>
    )
}

export default ClientSubOrders
