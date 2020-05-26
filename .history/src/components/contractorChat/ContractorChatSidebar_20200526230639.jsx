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
// import 'react-accessible-accordion/dist/fancy-example.css';
import './contractorChat.css'


function ContractorChatSidebar(props) {

    const [cookies, setCookie, removeCookie] = useCookies();
    const [contractorChats, setContractorChats] = React.useState([])

    React.useEffect(() => {
        axios.get('http://185.94.97.164/api/OrderRequest/GetChatRooms', {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            console.log(res.data.chatRooms);
            setContractorChats(res.data.chatRooms)
        })
    }, [])
    // recentMessage client

    return (
        <div className="chatbox-sidebar"
            style={!props.hamburgerMenuToggle ? {right: '-350px'} : {right: 0}}>
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
                        "chatbox-sidebar-header-buttons-btn chatbox-sidebar-header-buttons-btn-order"}
                        onClick={props.toggleCurrentOrder}>
                            سفارش ها
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
                    <>
                    {contractorChats.map((chat, index) => (
                        <div className="chatbox-sidebar-content-message-person"
                        key={index}
                        onClick={props.startChatHandler}>
                            <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                            <div className="chatbox-sidebar-content-message-person-main">
                                <div className="chatbox-sidebar-content-message-person-profile">
                                    <img src={props.miaLogo} alt="" className="chatbox-sidebar-content-message-person-profile-img" />
                                </div>
                                <div className="chatbox-sidebar-content-message-person-desc">
                                    <p className="chatbox-sidebar-content-message-person-desc-top">
                                        {chat.client}
                                    </p>
                                    <div className="chatbox-sidebar-content-message-person-desc-middbox">
                                        <p className="chatbox-sidebar-content-message-person-desc-midd">
                                            {chat.recentMessage}
                                        </p>
                                    </div>
                                    <p className="chatbox-sidebar-content-message-person-desc-bottom">
                                        {chat.modifiedDate}
                                    </p>
                                </div>
                            </div>
                            <span className="chatbox-sidebar-content-message-person-badge">5</span>
                        </div>
                    ))}
                    </>
                    :
                    <Accordion allowMultipleExpanded={false}>
                        <AccordionItem>
                            <AccordionItemHeading >
                                <AccordionItemButton >
                                <div className="collapsible-trigger-division">
                                    <div className="collapsible-trigger-division-rightbox">
                                        <div className="collapsible-trigger-division-line bg-dark"></div>
                                        <div className="collapsible-trigger-division-main">
                                            <div className="collapsible-trigger-division-profile">
                                                <img src={props.miaLogo} alt="" className="collapsible-trigger-division-profile-img" />
                                            </div>
                                            <h4>همه</h4>
                                        </div>
                                    </div>

                                    <div className="collapsible-trigger-division-badge">6</div>
                                </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                            <div className="chatbox-sidebar-content-order-person"
                            onClick={props.showOrdersPage}>
                                <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                                <div className="chatbox-sidebar-content-order-person-main">
                                    <div className="chatbox-sidebar-content-order-person-profile">
                                        <img src={props.miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
                                    </div>
                                    <h4 className="chatbox-sidebar-content-order-person-desc">
                                        جوشکاری
                                    </h4>
                                </div>
                                <span className="chatbox-sidebar-content-message-person-badge">9</span>
                            </div>
                            <div className="chatbox-sidebar-content-order-person"
                            onClick={props.showOrdersPage}>
                                <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                                <div className="chatbox-sidebar-content-order-person-main">
                                    <div className="chatbox-sidebar-content-order-person-profile">
                                        <img src={props.miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
                                    </div>
                                    <h4 className="chatbox-sidebar-content-order-person-desc">
                                        نجاری
                                    </h4>
                                </div>
                                <span className="chatbox-sidebar-content-message-person-badge">9</span>
                            </div>
                            <div className="chatbox-sidebar-content-order-person"
                            onClick={props.showOrdersPage}>
                                <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                                <div className="chatbox-sidebar-content-order-person-main">
                                    <div className="chatbox-sidebar-content-order-person-profile">
                                        <img src={props.miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
                                    </div>
                                    <h4 className="chatbox-sidebar-content-order-person-desc">
                                        تراشکاری
                                    </h4>
                                </div>
                                <span className="chatbox-sidebar-content-message-person-badge">9</span>
                            </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
                    }
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default ContractorChatSidebar
