import React from 'react'

function ClientSidebarSingleAaccourion() {

    let [toggle, setToggle] = useState(false)
    const [clickedAccordionGuid, setClickedAccordionGuid] = React.useState(null)

    const toggler = guid => {
        setClickedAccordionGuid(guid)
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
        <div className="collapsible-trigger-main">
            <div className="collapsible-trigger-division"
            onClick={() => toggler(props.orderGuid)}>
                <div className="collapsible-trigger-division-rightbox">
                    {renderLineWithState(props.lineState)}
                    <div className="collapsible-trigger-division-rightbox-titlebox">
                        <h4>
                            {props.title}
                        </h4>
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
                showPesronMessageModal={(reqGuid, message, contractor, price, isAllowed, gender) => props.showPesronMessageModal(reqGuid, message, contractor, price, isAllowed, gender)}
                clickedOrderGuid={props.clickedOrderGuid}/>
            </Collapse>
        </div>
    )
}

export default ClientSidebarSingleAaccourion
