import React, {useState} from 'react'
import {Collapse} from 'react-collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import ClientSubOrders from '../clientChat/ClientSubOrders'
import './clientChatSudebarAccordion.css'

function ClientChatSudebarAccordion(props) {

    let [toggle, setToggle] = useState(false)
    const [clickedOrderGuid, setClickedOrderGuid] = React.useState(null)

    const toggler = guid => {
        setClickedOrderGuid(guid)
        setToggle(toggle => !toggle)
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
            <div className="collapsible-trigger-main" key={index}>
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
        ))
        
    )
}

export default ClientChatSudebarAccordion
