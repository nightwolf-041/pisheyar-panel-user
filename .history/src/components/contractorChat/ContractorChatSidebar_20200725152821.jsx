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
import ContractorSubCategories from './ContractorSubCategories'
import SidebarControlers from '../sidebarControlers/SidebarControlers';


function ContractorChatSidebar(props) {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [userInfo, setUserInfo] = React.useState(null)
    const [userInfoLoading, setUserInfoLoading] = React.useState(true)
    const [contractorGender, setContractorGender] = React.useState()
    const [contractorChats, setContractorChats] = React.useState([])
    const [contractorChatsLoading, setContractorChatsLoading] = React.useState(true)
    const [contractorCategories, setContractorCategories] = React.useState([])
    const [ontractorCategoriesLoading, setContractorCategoriesLoading] = React.useState(true)
    const [clickedOrderGuid, setClickedOrderGuid] = React.useState(null)
    const [serachValue, setSerachValue] = React.useState('')

    React.useEffect(() => {
        
        axios.get(`http://185.211.59.237/Account/GetCurrentContractorUser`, {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            setUserInfoLoading(false)
            if(res.data.state === 1) {
                setUserInfo(res.data.user)
                let infoGender = {...res.data.user.gender}
                setContractorGender(infoGender.name)
            }
        }).catch(err => {

        })

        axios.get('http://185.211.59.237/Contractor/GetCategories', {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            setContractorCategoriesLoading(false)
            if(res.data.state === 1) {
                console.log(res.data.contractorCategories);
                setContractorCategories(res.data.contractorCategories)
            }
        }).catch(err => {
            
        })

    }, [])

    React.useEffect(() => {
        axios.get(`http://185.211.59.237/OrderRequest/GetChatRooms?search=${serachValue}`, {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            setContractorChatsLoading(false)
            if(res.data.state === 1) {
                setContractorChats(res.data.chatRooms)
            }
        }).catch(err => {

        })
    }, [serachValue])

    const setGuid = (guid) => {
        setClickedOrderGuid(guid)
    }

    const searchChangeHandler = e => {
        props.setCurrentTabRight()
        setSerachValue(e.target.value)
    }


    return (
        <div className="chatbox-sidebar"
            style={!props.hamburgerMenuToggle ? {right: '-350px'} : {right: 0}}>
                <div className="chatbox-sidebar-header">
                <FontAwesomeIcon icon={faTimes} className="chatbox-sidebar-header-close-icon"
                onClick={props.hideHamburgerMenu}
                />
                    <div className="chatbox-sidebar-header-person">
                        {!userInfoLoading ?
                        <div className="chatbox-sidebar-header-person-profbox">
                            <div className="chatbox-sidebar-header-person-profile">
                                <img src={
                                        userInfo !== null && contractorGender === "مرد" ?
                                        props.maleAvatar : 
                                        userInfo !== null && contractorGender === "زن" ?
                                        props.femailAvatar :
                                        null
                                    }
                                    alt="avatar"
                                    className="chatbox-sidebar-header-person-profile-img" />
                            </div>
                            <div className="chatbox-sidebar-header-person-desc">
                                <p className="chatbox-sidebar-header-person-desc-top">
                                    {userInfo !== null ?
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
                        <div className="contractorSidebar-loader-keeper">
                            <div className="contractorChat-loader"></div>
                        </div>
                        }
                    </div>

                    <SidebarControlers 
                    charge={true}
                    logout={props.removeCookie}
                    showPaymentModalModal={props.showPaymentModalModal}
                    />

                    <div className="chatbox-sidebar-header-search-box">
                        <div className="chatbox-sidebar-header-search">
                        <FontAwesomeIcon icon={faSearch}  className="chatbox-sidebar-header-search-icon"/>
                            <input type="search" className="chatbox-sidebar-header-search-input" placeholder="جستجو" onChange={searchChangeHandler} />
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
                    {!contractorChatsLoading ?
                    contractorChats !== null && contractorChats.length > 0 ? 
                    contractorChats.map((chat, index) => (
                        <div className={chat.orderRequestGuid !== props.clickedOrderGuid ?
                        "chatbox-sidebar-content-message-person-contract" :
                        "chatbox-sidebar-content-message-person-contract-active"
                        }
                        key={index}
                        onClick={() => props.startChatHandler(chat.orderRequestGuid, chat.isAllow)}>
                            <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                            <div className="chatbox-sidebar-content-message-person-main">
                                <div className="chatbox-sidebar-content-message-person-profile">
                                    <img
                                    // src={props.maleAvatar}
                                    src={
                                        chat.gender === "مرد" ?
                                        props.maleAvatar : 
                                        chat.gender === "زن" ?
                                        props.femailAvatar :
                                        null
                                    }
                                    alt="" className="chatbox-sidebar-content-message-person-profile-img" />
                                </div>
                                <div className="chatbox-sidebar-content-message-person-desc">
                                    <div className="chatbox-sidebar-content-message-person-desc-titlebox">
                                        <p className={chat.orderRequestGuid !== props.clickedOrderGuid ?
                                        "chatbox-sidebar-content-message-person-desc-title" :
                                        "chatbox-sidebar-content-message-person-desc-title-active"
                                        }>
                                            {chat.title}
                                        </p>
                                    </div>
                                    <div className="chatbox-sidebar-content-message-person-desc-topbox">
                                        <p className={chat.orderRequestGuid !== props.clickedOrderGuid ?
                                        "chatbox-sidebar-content-message-person-desc-top" :
                                        "chatbox-sidebar-content-message-person-desc-top-active"
                                        }>
                                            {chat.client}
                                        </p>
                                    </div>
                                    <div className="chatbox-sidebar-content-message-person-desc-middbox">
                                        <p className={chat.orderRequestGuid !== props.clickedOrderGuid ?
                                        "chatbox-sidebar-content-message-person-desc-midd" :
                                        "chatbox-sidebar-content-message-person-desc-midd-active"
                                        }>
                                            {chat.recentMessage}
                                        </p>
                                    </div>
                                    <p className={chat.orderRequestGuid !== props.clickedOrderGuid ?
                                    "chatbox-sidebar-content-message-person-desc-bottom" :
                                    "chatbox-sidebar-content-message-person-desc-bottom-active"
                                    }>
                                        {chat.modifiedDate}
                                    </p>
                                </div>
                            </div>
                            {/* <span className="chatbox-sidebar-content-message-person-badge">
                                0
                            </span> */}
                            <span className="">
                            </span>
                        </div>
                    ))
                    :
                    <div className="chatbox-sidebar-no-option">
                        پیامی یافت نشد
                    </div>
                    :
                    <div className="contractorSidebar-loader-keeper">
                        <div className="contractorChat-loader"></div>
                    </div>
                    }
                    </>
                    :
                    <>
                    {!ontractorCategoriesLoading ?
                    contractorCategories !== null && contractorCategories.length > 0 ?
                        contractorCategories.map((ctg, index) => (
                           <div className={ctg.categoryGuid !== props.orderCategoryGuid ?
                            "chatbox-sidebar-content-order-person" :
                            "chatbox-sidebar-content-order-person-active"
                           }
                           key={index}
                           onClick={() => props.showOrdersPage(ctg.categoryGuid)}>
                               {/* <div className="chatbox-sidebar-content-message-person-line bg-success"></div> */}
                               <div className={ctg.categoryGuid !== props.orderCategoryGuid ?
                                   "chatbox-sidebar-content-order-person-main" :
                                   "chatbox-sidebar-content-order-person-main-active"
                               }>
                                   <div className="chatbox-sidebar-content-order-person-profile">
                                       <img src={props.ctgAvatar} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
                                   </div>
                                   <h4>{ctg.name}</h4>
                               </div>
                               <span className={ctg.categoryGuid !== props.orderCategoryGuid ?
                                "chatbox-sidebar-content-message-person-badge" :
                                "chatbox-sidebar-content-message-person-badge-active"
                               }>
                                   {ctg.ordersCount}
                                </span>
                           </div>
                           ))
                       :
                       <div className="chatbox-sidebar-no-option">
                            خدمتی یافت نشد
                       </div>
                       : 
                       <div className="contractorSidebar-loader-keeper">
                           <div className="contractorChat-loader"></div>
                       </div>
                    }
                       </>
                    }
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default ContractorChatSidebar
