import React, {useState} from 'react'
import {Collapse} from 'react-collapse';
import ClientSubOrders from '../clientChat/ClientSubOrders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import './clientChatSudebarAccordion.css'

function ClientSidebarSingleAaccourion(props) {

    let [toggle, setToggle] = useState(false)
    const [clickedAccordionGuid, setClickedAccordionGuid] = React.useState(null)

    const toggler = guid => {
        setClickedAccordionGuid(guid)
        setToggle(toggle => !toggle)
    }

    const renderLineWithState = lineState => {
        if(lineState === "در حال انجام") {
            return(<div className="collapsible-trigger-division-line-accoudion bg-info"></div>)
        }else if(lineState === "در انتظار تایید"){
            return(<div className="collapsible-trigger-division-line-accoudion bg-warning"></div>)
        }else if(lineState === "لغو شده") {
            return(<div className="collapsible-trigger-division-line-accoudion bg-danger"></div>)
        }else{
            return(<div className="collapsible-trigger-division-line-accoudion bg-success"></div>)
        }
    }

    const renderSubTextClassWithState = lineState => {
        if(lineState === "در حال انجام") {
            return "collapsible-trigger-division-rightbox-titlebox-state-info"
        }else if(lineState === "در انتظار تایید"){
            return "collapsible-trigger-division-rightbox-titlebox-state-warning"
        }else if(lineState === "لغو شده") {
            return "collapsible-trigger-division-rightbox-titlebox-state-danger"
        }else{
            return "collapsible-trigger-division-rightbox-titlebox-state-success"
        }
    }

    return (
        <div className="collapsible-trigger-main">
            <div className="collapsible-trigger-division"
            onClick={() => toggler(props.orderGuid)}>
                <div className="collapsible-trigger-division-rightbox">
                    {renderLineWithState(props.lineState)}
                    <div className="collapsible-trigger-division-rightbox-titlebox">
                        <h4>
                            {props.title}
                        </h4>
                        <p className={renderSubTextClassWithState(props.lineState)}>
                            وضعیت: {props.lineState}
                        </p>
                    </div>
                </div>

                <div className="collapsible-trigger-division-badge-box">
                    <div className="collapsible-trigger-division-badge">
                        {props.requestsCount}
                    </div>
                    <FontAwesomeIcon icon={toggle ? faAngleUp : faAngleDown} className="collapsible-trigger-division-badge-icon" />
                </div>
            </div>
            <Collapse isOpened={toggle} className="react-collapse-main">
                <ClientSubOrders
                refresh={props.refreshSubNenuItems}
                guid={clickedAccordionGuid}
                maleAvatar={props.maleAvatar}
                femaleAvatar={props.femaleAvatar}
                showPesronMessageModal={(reqGuid, contractorGuid, message, contractor, price, isAllowed, gender) => props.showPesronMessageModal(reqGuid, contractorGuid, message, contractor, price, isAllowed, gender)}
                clickedOrderGuid={props.clickedOrderGuid}/>
            </Collapse>
        </div>
    )
}

export default ClientSidebarSingleAaccourion
