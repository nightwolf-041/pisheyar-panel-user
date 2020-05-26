import React from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import './clientChat.css'
import ClientSubOrders from './ClientSubOrders';

function ClientChatSidebar(props) {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [clientOrders, setClientOrders] = React.useState([])
    const [clickedOrderGuid, setClickedOrderGuid] = React.useState('')

    React.useEffect(() => {
        axios.get('http://185.94.97.164/api/Order/GetClientOrders', {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            console.log(res.data.orders);
            setClientOrders(res.data.orders)
        })
    }, [])

    const setGuid = (guid) => {
        
        setClickedOrderGuid(guid)
    }

    return (
        <div className="chatbox-sidebar"
        style={!props.hamburgerMenuToggle ? {right: '-500px'} : {right: 0}}>
            <div className="chatbox-sidebar-header">
            <FontAwesomeIcon icon={faTimes} className="chatbox-sidebar-header-close-icon"
            onClick={props.hideHamburgerMenu}
            />
                <div className="chatbox-sidebar-header-person">
                    <div className="chatbox-sidebar-header-person-profbox">
                        <div className="chatbox-sidebar-header-person-profile">
                            <img src={props.amooLogo} alt="" className="chatbox-sidebar-header-person-profile-img" />
                        </div>
                        <div className="chatbox-sidebar-header-person-desc">
                            <p className="chatbox-sidebar-header-person-desc-top">
                                محمد میرزایی
                            </p>
                            <p className="chatbox-sidebar-header-person-desc-bottom">
                                befoys@info.com
                            </p>
                        </div>
                    </div>
                </div>
                <div className="chatbox-sidebar-header-search-box">
                    <div className="chatbox-sidebar-header-search">
                    <FontAwesomeIcon icon={faSearch} onClick={props.removeCookie}  className="chatbox-sidebar-header-search-icon"/>
                        <input type="search" className="chatbox-sidebar-header-search-input" placeholder="جستجو" />
                    </div>
                </div>
                <div className="chatbox-sidebar-header-buttons">
                    <button className={props.currentTab ? 
                    "chatbox-sidebar-header-buttons-btn" :
                    "chatbox-sidebar-header-buttons-btn chatbox-sidebar-header-buttons-btn-ticket"}
                    onClick={props.toggleCurrentTicket}>
                        تیکت ها
                    </button>
                    <button className={!props.currentTab ?
                    "chatbox-sidebar-header-buttons-btn" :
                     "chatbox-sidebar-header-buttons-btn chatbox-sidebar-header-buttons-btn-message" }
                     onClick={props.toggleCurrentMessage}>
                        پیام ها
                    </button>
                </div>
                <div className="chatbox-sidebar-header-lines">
                    <div className={props.currentTab ? 
                    "chatbox-sidebar-header-line-left" :
                    "chatbox-sidebar-header-line-left-toggle"}></div>
                    <div className={!props.currentTab ? 
                    'chatbox-sidebar-header-line-right' :
                    'chatbox-sidebar-header-line-right-toggle'}></div>
                </div>
            </div>

            <div className="chatbox-sidebar-content-message">
            <PerfectScrollbar>
                {props.currentTab ?

                <Accordion allowMultipleExpanded={true}>
                    {clientOrders.map((orderReq, index) => (
                        <AccordionItem key={index}>
                        <AccordionItemHeading >
                            <AccordionItemButton>
                                <div className="collapsible-trigger-division"
                                onClick={() => setGuid(orderReq.orderGuid)}>
                                    <div className="collapsible-trigger-division-rightbox">
                                        <div className="collapsible-trigger-division-line bg-dark"></div>
                                        <h4>{orderReq.title}</h4>
                                    </div>

                                    <div className="collapsible-trigger-division-badge">6</div>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            
                            <ClientSubOrders
                            guid={clickedOrderGuid} />
                      
                        </AccordionItemPanel>
                    </AccordionItem>
                    ))}
                    
                </Accordion>
                    :
                    <>
                    <div className="chatbox-sidebar-content-ticket-person">
                        <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                        <div className="chatbox-sidebar-content-ticket-person-main">
                            <div className="chatbox-sidebar-content-ticket-person-profile">
                                <img src={props.miaLogo} alt="" className="chatbox-sidebar-content-ticket-person-profile-img" />
                            </div>
                            <div className="chatbox-sidebar-content-ticket-person-desc">
                                <p className="chatbox-sidebar-content-ticket-person-desc-top">
                                    شایان فلاح
                                </p>
                                <div className="chatbox-sidebar-content-ticket-person-desc-middbox">
                                    <p className="chatbox-sidebar-content-ticket-person-desc-midd">
                                        هوا بس ناجوانمردانه سرد است
                                    </p>
                                </div>
                                <p className="chatbox-sidebar-content-ticket-person-desc-bottom">
                                    پریروز
                                </p>
                            </div>
                        </div>
                        <span className="chatbox-sidebar-content-message-person-badge">9</span>
                    </div>

                    </>
                    }
                </PerfectScrollbar>
            </div>

        </div>
    )
}

export default ClientChatSidebar
