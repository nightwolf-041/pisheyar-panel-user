import React, {useState} from 'react'
import {Collapse} from 'react-collapse';
import ClientSubOrders from '../clientChat/ClientSubOrders'
import './clientChatSudebarAccordion.css'

function ClientChatSudebarAccordion(props) {

    let [toggle, setToggle] = useState(false)
    const [clickedOrderGuid, setClickedOrderGuid] = React.useState(null)

    const toggler = () => {
        setToggle(toggle => !toggle)
    }

    const setGuid = guid => {
        setClickedOrderGuid(guid)
    }

    const renderLineWithState = state => {
        if(state === "در حال انجام") {
            return(<div className="collapsible-trigger-division-line bg-info"></div>)
        }else if(state === "در انتظار تایید"){
            return(<div className="collapsible-trigger-division-line bg-warning"></div>)
        }else if(state === "لغو شده") {
            return(<div className="collapsible-trigger-division-line bg-danger"></div>)
        }else{
            return(<div className="collapsible-trigger-division-line bg-success"></div>)
        }
    }

    
    return (
        props.clientOrders.map((orderReq, index) => (
            <div className="collapsible-trigger-main" onClick={toggler} key={index}>
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
                <Collapse isOpened={toggle}>
                    <ClientSubOrders
                    guid={clickedOrderGuid}
                    maleAvatar={props.maleAvatar}
                    femaleAvatar={props.femaleAvatar}
                    showPesronMessageModal={(reqGuid, message, contractor, price, isAllowed, gender) => props.showPesronMessageModal(reqGuid, message, contractor, price, isAllowed, gender)}
                    clickedOrderGuid={props.clickedOrderGuid}/>
                </Collapse>
            </div>
        ))
        
    )
}

export default ClientChatSudebarAccordion
