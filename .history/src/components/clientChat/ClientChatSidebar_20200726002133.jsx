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
import 'react-accessible-accordion/dist/fancy-example.css';
import {Collapse} from 'react-collapse';
import './clientChat.css'
import SidebarControlers from '../sidebarControlers/SidebarControlers';

function ClientChatSidebar(props) {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [sidebarLoading, setSidebarLoading] = React.useState(true)
    const [userInfo, setUserInfo] = React.useState(null)
    const [userInfoLoading, setUserInfoLoading] = React.useState(true)
    const [clientGender, setClientGender] = React.useState()
    const [clientOrders, setClientOrders] = React.useState([])
    const [clickedOrderGuid, setClickedOrderGuid] = React.useState(null)
    const [searchValue, setSearchValue] = React.useState('')


    React.useEffect(() => {
        axios.get(`http://185.211.59.237/Account/GetCurrentClientUser`, {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            setUserInfoLoading(false)
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

        axios.get(`http://185.211.59.237/Order/GetClientOrders`, {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            setSidebarLoading(false)
            if(res.data.state === 1) {
                setClientOrders(res.data.orders)
                console.log(res.data.orders)
            }
        }).catch(err => {

        })

    }, [])

    React.useEffect(() => {
        axios.get(`http://185.211.59.237/Order/GetClientOrders?search=${searchValue}`, {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            setSidebarLoading(false)
            if(res.data.state === 1) {
                setClientOrders(res.data.orders)
                console.log(res.data.orders)
            }
        }).catch(err => {

        })

    }, [searchValue, props.sidebarForceRefreshState])

    const setGuid = (guid) => {
        console.log(guid);
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

    const searchChangeHandler = e => {
        setSearchValue(e.target.value)
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
                    {!userInfoLoading ?
                    <div className="chatbox-sidebar-header-person-profbox">
                        <div className="chatbox-sidebar-header-person-profile">
                            <img src={
                                userInfo && userInfo.gender === "مرد" ?
                                props.maleAvatar :
                                userInfo && userInfo.gender === "زن" ?
                                props.femaleAvatar :
                                null
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
                    :
                    <div className="clientSidebar-loader-keeper">
                        <div className="clientChat-loader"></div>
                    </div>
                    }
                </div>
                <SidebarControlers logout={props.removeCookie} />
                <div className="chatbox-sidebar-header-search-box">
                    <div className="chatbox-sidebar-header-search">
                    <FontAwesomeIcon icon={faSearch}  className="chatbox-sidebar-header-search-icon"/>
                        <input type="search" className="chatbox-sidebar-header-search-input" placeholder="جستجو" onChange={searchChangeHandler} />
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
            {/* {
                sidebarLoading ?
                <div className="clientSidebar-loader-keeper">
                    <div className="clientChat-loader"></div>
                </div>
                :
                clientOrders !== null && clientOrders.length > 0 ?
                    <Accordion allowMultipleExpanded={false}>
                        
                        {clientOrders.map((orderReq, index) => (
                            <AccordionItem key={index}>
                            <AccordionItemHeading >
                                <AccordionItemButton>
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
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                
                                {clickedOrderGuid !== null ?
                                    <ClientSubOrders
                                    guid={clickedOrderGuid}
                                    // miaLogo={props.miaLogo}
                                    maleAvatar={props.maleAvatar}
                                    femaleAvatar={props.femaleAvatar}
                                    showPesronMessageModal={(reqGuid, message, contractor, price, isAllowed, gender) => props.showPesronMessageModal(reqGuid, message, contractor, price, isAllowed, gender)}
                                    clickedOrderGuid={props.clickedOrderGuid}/>
                                    : null
                                }
                        
                            </AccordionItemPanel>
                        </AccordionItem>
                        ))}
                        
                    </Accordion>
                    :
                    <div className="chatbox-sidebar-no-option">
                        پیامی یافت نشد
                    </div> 
                    } */}
                    {clientOrders.map((orderReq, index) => (
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
                    <Collapse isOpened={true} theme={{collapse: 'foo', content: 'bar'}}>
                        <div>Customly animated container</div>
                    </Collapse>
                    ))
                    </>
                    : null
                    }
                </PerfectScrollbar>
            </div>

        </div>
    )
}

export default ClientChatSidebar
