import React from 'react'
import './contractorChat.css'

function ContractorChatSidebar() {
    return (
        <div className="chatbox-sidebar"
            style={!props.hamburgerMenuToggle ? {right: '-350px'} : {right: 0}}
            ref={props.chatSidebar}>
                <div className="chatbox-sidebar-header">
                <FontAwesomeIcon icon={faTimes} className="chatbox-sidebar-header-close-icon"
                onClick={props.hideHamburgerMenu}
                />
                    <div className="chatbox-sidebar-header-person">
                        <div className="chatbox-sidebar-header-person-profbox">
                            <div className="chatbox-sidebar-header-person-profile">
                                <img src={amooLogo} alt="" className="chatbox-sidebar-header-person-profile-img" />
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
                    <div className="chatbox-sidebar-content-message-person"
                    onClick={props.hideOrdersPage}>
                                <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                                <div className="chatbox-sidebar-content-message-person-main">
                                    <div className="chatbox-sidebar-content-message-person-profile">
                                        <img src={miaLogo} alt="" className="chatbox-sidebar-content-message-person-profile-img" />
                                    </div>
                                    <div className="chatbox-sidebar-content-message-person-desc">
                                        <p className="chatbox-sidebar-content-message-person-desc-top">
                                            مهدی رودکی
                                        </p>
                                        <div className="chatbox-sidebar-content-message-person-desc-middbox">
                                            <p className="chatbox-sidebar-content-message-person-desc-midd">
                                                بودیم پارسال با هم دسته جمعی 
                                            </p>
                                        </div>
                                        <p className="chatbox-sidebar-content-message-person-desc-bottom">
                                            دیروز
                                        </p>
                                    </div>
                                </div>
                                <span className="chatbox-sidebar-content-message-person-badge">5</span>
                            </div>
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
                                                <img src={miaLogo} alt="" className="collapsible-trigger-division-profile-img" />
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
                                        <img src={miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
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
                                        <img src={miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
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
                                        <img src={miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
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