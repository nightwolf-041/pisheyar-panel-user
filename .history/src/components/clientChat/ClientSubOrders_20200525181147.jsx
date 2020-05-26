import React from 'react'

function ClientSubOrders() {
    return (
        <>
            {subOrderRequestsForClient.map((subOrderReq, index) => (
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
            ))}
        </>
    )
}

export default ClientSubOrders
