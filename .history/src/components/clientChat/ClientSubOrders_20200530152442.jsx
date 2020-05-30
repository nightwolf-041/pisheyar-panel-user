import React from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'


function ClientSubOrders(props) {

    const [cookies, setCookie, removeCookie] = useCookies();

    let [subOrderRequestsForClient, setSubOrderRequestsForClient] = React.useState(null)
    let [subOrderIsAllowed, setSubOrderIsAllowed] = React.useState(null)
    let [requestLoading, setRequestLoading] = React.useState(false)

    React.useEffect(() => {

        setRequestLoading(true)
        axios.get(`http://185.94.97.164/api/OrderRequest/GetOrderRequestsForClient?orderGuid=${props.guid}`, {
            headers: { Authorization: "Bearer " + cookies.token }
            }).then(res => {
                // console.log(res.data);
                setRequestLoading(false)
                setSubOrderIsAllowed(res.data.isAllowed)
                setSubOrderRequestsForClient(res.data.orders)
            })
    }, [props.guid])

    return (
        <>
        {props.guid && !requestLoading ?
            props.guid && subOrderRequestsForClient !== null ?
             subOrderRequestsForClient.map((subOrderReq, index) => (
                <div className="chatbox-sidebar-content-message-person" key={index}
                    onClick={() => props.showPesronMessageModal(
                    subOrderReq.orderRequestGuid,
                    subOrderReq.message,
                    subOrderReq.contractor,
                    subOrderReq.offeredPrice,
                    subOrderReq.isAllowed)}
                    >
                    <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                    <div className="chatbox-sidebar-content-message-person-main">
                        <div className="chatbox-sidebar-content-message-person-profile">
                            <img src={props.miaLogo} alt="" className="chatbox-sidebar-content-message-person-profile-img" />
                        </div>
                        <div className="chatbox-sidebar-content-message-person-desc">
                            <p className="chatbox-sidebar-content-message-person-desc-top">
                                {subOrderReq.contractor}
                            </p>
                            <div className="chatbox-sidebar-content-message-person-desc-middbox">
                                <p className="chatbox-sidebar-content-message-person-desc-midd">
                                    {subOrderReq.message}
                                </p>
                            </div>
                            <p className="chatbox-sidebar-content-message-person-desc-bottom">
                                {subOrderReq.modifiedDate}
                            </p>
                        </div>
                    </div>
                    <span className="chatbox-sidebar-content-message-person-badge">5</span>
                </div>
            ))
        :
        <div className="clientSubOrders-no-message-box">
            سفارشی یافت نشد
        </div>
        : 
        <div className="clientSubOrders-loader-keeper">
            <div className="clientSubOrders-loader"></div>
        </div>
        }
        </>
    )
}

export default ClientSubOrders
