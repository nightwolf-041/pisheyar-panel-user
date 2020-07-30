import React, {useState} from 'react'
import {Collapse} from 'react-collapse';
import ClientSubOrders from '../clientChat/ClientSubOrders'
import './clientChat.css'

function ClientChatSudebarAccordion(props) {

    let [toggle, setToggle] = useState(false)

    const toggler = () => {
        setToggle(toggle => !toggle)
    }

    return (
        <div className="collapsible-trigger-main" onClick={toggler}>
            <div className="collapsible-trigger-division"
            onClick={props.setGuid}>
                <div className="collapsible-trigger-division-rightbox">
                    {props.renderLineWithState}
                    <div className="collapsible-trigger-division-rightbox-titlebox">
                        <h4>
                            {props.title}
                        </h4>
                    </div>
                </div>

                <div className="collapsible-trigger-division-badge">
                    {props.requestsCount}
                </div>
            </div>
            <Collapse isOpened={toggle}>
                <ClientSubOrders
                guid={props.clickedOrderGuid}
                maleAvatar={props.maleAvatar}
                femaleAvatar={props.femaleAvatar}
                showPesronMessageModal={(reqGuid, message, contractor, price, isAllowed, gender) => props.showPesronMessageModal(reqGuid, message, contractor, price, isAllowed, gender)}
                clickedOrderGuid={props.clickedOrderGuid}/>
            </Collapse>
        </div>
    )
}

export default ClientChatSudebarAccordion
