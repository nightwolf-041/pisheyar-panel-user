import React from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'
import ClientSubOrders from './ClientSubOrders';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import './clientChat.css'
import UserSettingDropdown from '../userSettingDropdown/UserSettingDropdown';
import SidebarControlers from '../sidebarControlers/SidebarControlers';

function ClientChatSidebar(props) {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [userInfo, setUserInfo] = React.useState()
    const [clientGender, setClientGender] = React.useState()
    const [clientOrders, setClientOrders] = React.useState([])
    const [clickedOrderGuid, setClickedOrderGuid] = React.useState(null)

    React.useEffect(() => {

        axios.get(`http://185.211.59.237/Account/GetCurrentClientUser`, {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            if(res.data.state === 1 ){
                setUserInfo(res.data.user)
                if(res.data.user.length > 0) {
                    let gender = {...res.data.user.gender}
                    setClientGender(gender)
                    console.log(gender);
                }
            }
        }).catch(err => {
            
        })

        axios.get('http://185.211.59.237/Order/GetClientOrders', {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            if(res.data.state === 1) {
                setClientOrders(res.data.orders)
                console.log(res.data.orders)
            }
        }).catch(err => {

        })

    }, [])

    const setGuid = (guid) => {
        setClickedOrderGuid(guid)
    }

    return (
        <div className="chatbox-sidebar"
        style={!props.hamburgerMenuToggle ? {right: '-500px'} : {right: 0}}>
            
            <div className="chatbox-sidebar-header">
            {/* <UserSettingDropdown /> */}
            <FontAwesomeIcon icon={faTimes} className="chatbox-sidebar-header-close-icon"
            onClick={props.hideHamburgerMenu}
            />
                <div className="chatbox-sidebar-header-person">
                    <div className="chatbox-sidebar-header-person-profbox">
                        <div className="chatbox-sidebar-header-person-profile">
                            <img src={
                                userInfo && userInfo.gender === "مرد" ?
                                props.maleAvatar :
                                props.femaleAvatar
                            }
                            alt="avatar"
                            className="chatbox-sidebar-header-person-profile-img" />
                        </div>
                        <div className="chatbox-sidebar-header-person-desc">
                            <p className="chatbox-sidebar-header-person-desc-top">
                                {userInfo ?
                                    `${userInfo.firstName} ${userInfo.lastName}`
                                    :null
                                }
                            </p>
                            <div className="chatbox-sidebar-header-person-desc-bottom-box">
                                <p className="chatbox-sidebar-header-person-desc-bottom">
                                    {userInfo ?
                                        userInfo.email
                                        :null
                                    }
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                <SidebarControlers logout={props.removeCookie} />
                <div className="chatbox-sidebar-header-search-box">
                    <div className="chatbox-sidebar-header-search">
                    <FontAwesomeIcon icon={faSearch}  className="chatbox-sidebar-header-search-icon"/>
                        <input type="search" className="chatbox-sidebar-header-search-input" placeholder="جستجو" />
                    </div>
                </div>
                <div className="chatbox-sidebar-header-buttons">
                    <button className={!props.currentTab ?
                    "chatbox-sidebar-header-buttons-btn" :
                     "chatbox-sidebar-header-buttons-btn chatbox-sidebar-header-buttons-btn-message" }
                     onClick={props.toggleCurrentMessage}>
                        پیام ها
                    </button>
                </div>
                <div className="chatbox-sidebar-header-lines">
                    <div className='chatbox-sidebar-header-line-right-toggle'></div>
                </div>
            </div>

            <div className="chatbox-sidebar-content-message">
            <PerfectScrollbar>
                {props.currentTab ?
            <>
            {clientOrders !== null ?
                <Accordion allowMultipleExpanded={false}>
                    
                    {clientOrders.map((orderReq, index) => (
                        <AccordionItem key={index}>
                        <AccordionItemHeading >
                            <AccordionItemButton>
                                <div className="collapsible-trigger-division"
                                onClick={() => setGuid(orderReq.orderGuid)}>
                                    <div className="collapsible-trigger-division-rightbox">
                                        <div className="collapsible-trigger-division-line bg-dark"></div>
                                        <h4>{orderReq.category}</h4>
                                    </div>

                                    <div className="collapsible-trigger-division-badge">
                                        {orderReq.requestsCount}
                                    </div>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            
                            <ClientSubOrders
                            guid={clickedOrderGuid}
                            // miaLogo={props.miaLogo}
                            maleAvatar={props.maleAvatar}
                            femaleAvatar={props.femaleAvatar}
                            showPesronMessageModal={(reqGuid, message, contractor, price, isAllowed, gender) => props.showPesronMessageModal(reqGuid, message, contractor, price, isAllowed, gender)} />
                      
                        </AccordionItemPanel>
                    </AccordionItem>
                    ))}
                    
                </Accordion>
                :
                <div className="chatbox-sidebar-no-option">
                    پیامی یافت نشد
                </div> 
                }
                </>
                    :
                    null
                    }
                </PerfectScrollbar>
            </div>

        </div>
    )
}

export default ClientChatSidebar
