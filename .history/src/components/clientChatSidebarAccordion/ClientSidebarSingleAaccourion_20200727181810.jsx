import React from 'react'

function ClientSidebarSingleAaccourion() {
    return (
        <div className="collapsible-trigger-main">
            <div className="collapsible-trigger-division"
            onClick={() => toggler(orderReq.orderGuid)}>
                <div className="collapsible-trigger-division-rightbox">
                    {renderLineWithState(orderReq.state)}
                    <div className="collapsible-trigger-division-rightbox-titlebox">
                        <h4>
                            {orderReq.title}
                        </h4>
                    </div>
                </div>

                <div className="collapsible-trigger-division-badge-box">
                    <div className="collapsible-trigger-division-badge">
                        {orderReq.requestsCount}
                    </div>
                    <FontAwesomeIcon icon={toggle ? faAngleUp : faAngleDown} className="collapsible-trigger-division-badge-icon" />
                </div>
            </div>
            <Collapse isOpened={toggle} className="react-collapse-main">
                <ClientSubOrders
                refresh={props.refreshSubNenuItems}
                guid={clickedOrderGuid}
                maleAvatar={props.maleAvatar}
                femaleAvatar={props.femaleAvatar}
                showPesronMessageModal={(reqGuid, message, contractor, price, isAllowed, gender) => props.showPesronMessageModal(reqGuid, message, contractor, price, isAllowed, gender)}
                clickedOrderGuid={props.clickedOrderGuid}/>
            </Collapse>
        </div>
    )
}

export default ClientSidebarSingleAaccourion