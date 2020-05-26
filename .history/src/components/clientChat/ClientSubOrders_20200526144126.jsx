import React from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'


function ClientSubOrders(props) {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    let [subOrderRequestsForClient, setSubOrderRequestsForClient] =
    React.useState(cookies.ordersForClients)

    React.useEffect(() => {
        if(props.guid && subOrderRequestsForClient === null) {
            axios.get(`http://185.94.97.164/api/OrderRequest/GetOrderRequestsForClient?orderGuid=${props.guid}`, {
            headers: { Authorization: "Bearer " + cookies.token }
            }).then(res => {
                if(res.data.orders !== cookies.ordersForClients) {
                    console.log(res.data.orders);
                    console.log(cookies.ordersForClients);
                    // setSubOrderRequestsForClient(res.data.orders)
                    setCookie('ordersForClients', res.data.orders, {path: '/'})
                }
                if(res.data.orders === cookies.ordersForClients) {
                    console.log('داریمش');
                }
            })
        }
    }, [props.guid])

    // const showPesronMessageModal = (orderRequestGuid) => {
    //     console.log(orderRequestGuid);
    //     props.showPesronMessageModal(orderRequestGuid)
    // }

    return (
        <>
            {props.guid && cookies.ordersForClients !== null ?
             cookies.ordersForClients.map((subOrderReq, index) => (
                <div className="chatbox-sidebar-content-message-person" key={index}
                onClick={() => props.showPesronMessageModal(subOrderReq.orderRequestGuid)}>
                    <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                    <div className="chatbox-sidebar-content-message-person-main">
                        <div className="chatbox-sidebar-content-message-person-profile">
                            <img src={props.miaLogo} alt="" className="chatbox-sidebar-content-message-person-profile-img" />
                        </div>
                        <div className="chatbox-sidebar-content-message-person-desc">
                            <p className="chatbox-sidebar-content-message-person-desc-top">
                                مهدی رودکی
                            </p>
                            <div className="chatbox-sidebar-content-message-person-desc-middbox">
                                <p className="chatbox-sidebar-content-message-person-desc-midd">
                                    بودیم پارسال با هم دسته جمعی رفته بودیم بودیم پارسال با هم دسته جمعی رفته بودیم
                                </p>
                            </div>
                            <p className="chatbox-sidebar-content-message-person-desc-bottom">
                                دیروز
                            </p>
                        </div>
                    </div>
                    <span className="chatbox-sidebar-content-message-person-badge">5</span>
                </div>
            ))
        :null}
        </>
    )
}

export default ClientSubOrders
