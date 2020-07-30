import React from 'react'
import ClientSubOrders from '../clientChat/ClientSubOrders'

function ClientChatSudebarAccordion() {
    return (
        <div className="collapsible-trigger-main" onClick={clientOrderBoxToggler}>
            <div className="collapsible-trigger-division"
            onClick={() => setGuid(orderReq.orderGuid)}>
                <div className="collapsible-trigger-division-rightbox">
                    {renderLineWithState(orderReq.state)}
                    <div className="collapsible-trigger-division-rightbox-titlebox">
                        <h4>
                            {orderReq.title}
                        </h4>
                    </div>
                </div>

                <div className="collapsible-trigger-division-badge">
                    {orderReq.requestsCount}
                </div>
            </div>
            <Collapse isOpened={toggler} theme={{collapse: 'foo', content: 'bar'}}>
                <ClientSubOrders
                guid={clickedOrderGuid}
                maleAvatar={props.maleAvatar}
                femaleAvatar={props.femaleAvatar}
                showPesronMessageModal={(reqGuid, message, contractor, price, isAllowed, gender) => props.showPesronMessageModal(reqGuid, message, contractor, price, isAllowed, gender)}
                clickedOrderGuid={props.clickedOrderGuid}/>
            </Collapse>
        </div>
    )
}

export default ClientChatSudebarAccordion
