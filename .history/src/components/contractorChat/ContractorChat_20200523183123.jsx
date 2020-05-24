// this file is chat page of panel and in the end import in panelMainPathes directory and use in ChatBox component 

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr'
import { withCookies } from 'react-cookie';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Collapsible from 'react-collapsible';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import ChatLeftMessage from '../chatMessages/ChatLeftMessage';
import ChatRightMessage from '../chatMessages/ChatRightMessage';
import Header from '../header/Header';
import ClientChatMessageModal from '../UI/ClientChatMessageModal';
import ClientAcceptModal from '../UI/ClientAcceptModal';
import OrdersPage from '../ordersPage/OrdersPage';
import './contractorChat.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch, faPaperclip, faArrowLeft, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import amooLogo from '../../assets/images/johnny-sins.jpg'
import miaLogo from '../../assets/images/mia-khalife.jpg'
import rubyLogo from '../../assets/images/ruby-rose.jpg'


class ClientChat extends Component {
    constructor(props) {
        super(props);
        const { cookies } = props;

        this.state = { 
            token: cookies.get('token'),
            currentTab: true,
            hamburgerMenuToggle: false,
            collapsibleOpen: false,
            collapsibleTriggerOpen: false,
            messageModalHidden: true,
            acceptModalHidden: true,
            showOrdersPage: false
         };
         this.chatSidebar = React.createRef()
    }

    // showChatHamburgerHandler = () => {
    //     this.props.onShowChatHamburger()
    // }
    // hideChatHamburgerHandler = () => {
    //     this.props.onHideChatHamburger()
    // }
    componentDidMount() {
        const {cookies} = this.props
        const token = cookies.get('token')
        if(token === undefined) {
            this.props.history.replace('/login')
        }

        let connection = new HubConnectionBuilder()
        .withUrl("http://185.94.97.164/ClientHub", {
            accessTokenFactory: () => token
        })
        .configureLogging(LogLevel.Information)
        .build();

        // connection.on("send", data => {
        //     console.log(data);
        // });

        // connection.start()
        // .then(() => connection.invoke("send", "Hello"));
    }

    toggleCurrentOrder = () => {
        this.setState({currentTab: false})
    }
    toggleCurrentMessage = () => {
        this.setState({currentTab: true})
    }

    removeCookie =() => {
        const {cookies} = this.props
        cookies.remove('token', {path: '/'})
    }

    showHamburgerMenu = () => {
        let toggleState = this.state.hamburgerMenuToggle
        this.setState({hamburgerMenuToggle: !toggleState})
    }
    hideHamburgerMenu = () => {
        this.setState({hamburgerMenuToggle: false})
    }

    showPesronMessageModal = () => {
        this.setState({messageModalHidden: false})
    }
    hidePersonMessageModal = () => {
        this.setState({messageModalHidden: true})
    }

    showPesronAcceptModal = () => {
        this.setState({acceptModalHidden: false})
    }
    hidePersonAcceptModal = () => {
        this.setState({acceptModalHidden: true})
    }

    showOrdersPage = () => {
        this.setState({showOrdersPage: true})
    }
    hideOrdersPage = () => {
        this.setState({showOrdersPage: false})
    }

    render() {

        return (
            <>
            <Header showHamburgerMenu={this.showHamburgerMenu} />

            <ClientChatMessageModal hidden={this.state.messageModalHidden}
            hidePersonMessageModal={this.hidePersonMessageModal} />

            <ClientAcceptModal hidden={this.state.acceptModalHidden}
             hidePersonAcceptModal={this.hidePersonAcceptModal} />

            <div className="chatboxkeeper">
            <div className={!this.state.hamburgerMenuToggle ? "chatbox-sidebar" : "chatbox-sidebarToggle"}
            ref={this.chatSidebar}>
                <div className="chatbox-sidebar-header">
                <FontAwesomeIcon icon={faTimes} className="chatbox-sidebar-header-close-icon"
                onClick={this.hideHamburgerMenu}
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
                        <FontAwesomeIcon icon={faSearch} onClick={this.removeCookie}  className="chatbox-sidebar-header-search-icon"/>
                            <input type="search" className="chatbox-sidebar-header-search-input" placeholder="جستجو" />
                        </div>
                    </div>
                    <div className="chatbox-sidebar-header-buttons">
                        <button className={this.state.currentTab ? 
                        "chatbox-sidebar-header-buttons-btn" :
                        "chatbox-sidebar-header-buttons-btn chatbox-sidebar-header-buttons-btn-order"}
                        onClick={this.toggleCurrentOrder}>
                            سفارش ها
                        </button>
                        <button className={!this.state.currentTab ?
                        "chatbox-sidebar-header-buttons-btn" :
                         "chatbox-sidebar-header-buttons-btn chatbox-sidebar-header-buttons-btn-message" }
                         onClick={this.toggleCurrentMessage}>
                            پیام ها
                        </button>
                    </div>
                    <div className="chatbox-sidebar-header-lines">
                        <div className={this.state.currentTab ? 
                        "chatbox-sidebar-header-line-left" :
                        "chatbox-sidebar-header-line-left-toggle"}></div>
                        <div className={!this.state.currentTab ? 
                        'chatbox-sidebar-header-line-right' :
                        'chatbox-sidebar-header-line-right-toggle'}></div>
                    </div>
                </div>

                <div className="chatbox-sidebar-content-message">
                <PerfectScrollbar>
                    {this.state.currentTab ?
                    <>
                    {/* <Accordion allowMultipleExpanded={true}>
                        <AccordionItem>
                            <AccordionItemHeading >
                                <AccordionItemButton >
                                    <div className="collapsible-trigger-division">
                                        <div className="collapsible-trigger-division-rightbox">
                                            <div className="collapsible-trigger-division-line bg-dark"></div>
                                            <h4>برنامه نویسی</h4>
                                        </div>

                                        <div className="collapsible-trigger-division-badge">6</div>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                            <div className="chatbox-sidebar-content-message-person">
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
                                                بودیم پارسال با هم دسته جمعی رفته بودیم بودیم پارسال با هم دسته جمعی رفته بودیم
                                            </p>
                                        </div>
                                        <p className="chatbox-sidebar-content-message-person-desc-bottom">
                                            دیروز
                                        </p>
                                    </div>
                                </div>
                                <span className="chatbox-sidebar-content-message-person-badge">5</span>
                            </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <div className="collapsible-trigger-division">
                                        <div className="collapsible-trigger-division-rightbox">
                                            <div className="collapsible-trigger-division-line bg-dark"></div>
                                            <h4>برنامه نویسی</h4>
                                        </div>

                                        <div className="collapsible-trigger-division-badge">6</div>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                            <div className="chatbox-sidebar-content-order-person">
                                <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                                <div className="chatbox-sidebar-content-order-person-main">
                                    <div className="chatbox-sidebar-content-order-person-profile">
                                        <img src={miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
                                    </div>
                                    <div className="chatbox-sidebar-content-order-person-desc">
                                        <p className="chatbox-sidebar-content-order-person-desc-top">
                                            شایان فلاح
                                        </p>
                                        <div className="chatbox-sidebar-content-order-person-desc-middbox">
                                            <p className="chatbox-sidebar-content-order-person-desc-midd">
                                                هوا بس ناجوانمردانه سرد است
                                            </p>
                                        </div>
                                        <p className="chatbox-sidebar-content-order-person-desc-bottom">
                                            پریروز
                                        </p>
                                    </div>
                                </div>
                                <span className="chatbox-sidebar-content-message-person-badge">9</span>
                            </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion> */}
                     <div className="chatbox-sidebar-content-message-person">
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
                            <div className="chatbox-sidebar-content-message-person">
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
                                                بودیم پارسال با هم دسته جمعی رفته بودیم بودیم پارسال با هم دسته جمعی رفته بودیم
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
                                            <h4>نامه نویسی</h4>
                                        </div>

                                        <div className="collapsible-trigger-division-badge">6</div>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                            <div className="chatbox-sidebar-content-order-person">
                                <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                                <div className="chatbox-sidebar-content-order-person-main">
                                    <div className="chatbox-sidebar-content-order-person-profile">
                                        <img src={miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
                                    </div>
                                    <div className="chatbox-sidebar-content-order-person-desc">
                                        <p className="chatbox-sidebar-content-order-person-desc-top">
                                            جوشکاری آبی
                                        </p>
                                    </div>
                                </div>
                                <span className="chatbox-sidebar-content-message-person-badge">9</span>
                            </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <div className="collapsible-trigger-division">
                                        <div className="collapsible-trigger-division-rightbox">
                                            <div className="collapsible-trigger-division-line bg-dark"></div>
                                            <h4>نامه نویسی</h4>
                                        </div>

                                        <div className="collapsible-trigger-division-badge">6</div>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                            <div className="chatbox-sidebar-content-order-person">
                                <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                                <div className="chatbox-sidebar-content-order-person-main">
                                    <div className="chatbox-sidebar-content-order-person-profile">
                                        <img src={miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
                                    </div>
                                    <div className="chatbox-sidebar-content-order-person-desc">
                                        <p className="chatbox-sidebar-content-order-person-desc-top">
                                            نجاری
                                        </p>
                                    </div>
                                </div>
                                <span className="chatbox-sidebar-content-message-person-badge">9</span>
                            </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <div className="collapsible-trigger-division">
                                        <div className="collapsible-trigger-division-rightbox">
                                            <div className="collapsible-trigger-division-line bg-dark"></div>
                                            <h4>نامه نویسی</h4>
                                        </div>

                                        <div className="collapsible-trigger-division-badge">6</div>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                            <div className="chatbox-sidebar-content-order-person">
                                <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                                <div className="chatbox-sidebar-content-order-person-main">
                                    <div className="chatbox-sidebar-content-order-person-profile">
                                        <img src={miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
                                    </div>
                                    <div className="chatbox-sidebar-content-order-person-desc">
                                        <p className="chatbox-sidebar-content-order-person-desc-top">
                                            تراشکاری
                                        </p>
                                    </div>
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
            <div className="chatbox-main">
                <div className="chatbox-main-header">
                {/* <FontAwesomeIcon icon={faBars} className="chatbox-main-header-menu-icon"
                onClick={this.showChatHamburgerHandler}
                /> */}
                <button className="chatbox-main-header-ignore-button"
                onClick={this.showPesronAcceptModal}>
                    قبول / رد کردن
                </button>
                    <div className="chatbox-main-header-person">
                        <div className="chatbox-main-header-person-profile"
                        onClick={this.showOrdersPage}>
                            <img src={rubyLogo} alt="" className="chatbox-main-header-person-profile-img" />
                        </div>
                        <div className="chatbox-main-header-person-desc-box">
                            <p className="chatbox-main-header-person-desc-top"
                            onClick={this.showOrdersPage}>
                                روزبه شامخی
                            </p>
                            <p className="chatbox-main-header-person-desc-bottom">
                                روزبه شامخی
                            </p>
                        </div>
                    </div>
                </div>

                {this.state.showOrdersPage ? 
                <OrdersPage hideOrdersPage={this.hideOrdersPage} />
                :
                <>
                <div className="chatbox-main-content">
                    <PerfectScrollbar>

                        <div className="chatbox-main-content-loader"></div>

                        <ChatRightMessage
                        message="سلام چطوری فردا بیا بریم اون تست ها رو حل کنیم دیگه"
                        date=" 1399/8/24 pm"
                        image={amooLogo}
                        />
                        <ChatRightMessage
                        message="نگی نگفتما بیا بریم"
                        date=" 1399/8/24 pm"
                        image={amooLogo}
                        />

                        <ChatLeftMessage 
                        message="نمیتونم حال ندارم"
                        date="1395/8/15 pm"
                        image={rubyLogo}
                        />
                        <ChatLeftMessage 
                        message="فردا نمیشه اصلا"
                        date="1395/8/15 pm"
                        image={rubyLogo}
                        />
                        <ChatLeftMessage 
                        message="بمونه پس فردا"
                        date="1395/8/15 pm"
                        image={rubyLogo}
                        />

                        <ChatRightMessage
                        message="باشه بابا"
                        date=" 1399/8/24 pm"
                        image={amooLogo}
                        />
                        <ChatRightMessage
                        message="حله"
                        date=" 1399/8/24 pm"
                        image={amooLogo}
                        />

                    </PerfectScrollbar>
                </div>

                <div className="chatbox-main-content-sended-bottom">
                    <div className="chatbox-main-content-sended-bottom-icons">
                    <FontAwesomeIcon icon={faArrowLeft} className="chatbox-main-content-sended-bottom-tel-icon"/>
                    <FontAwesomeIcon icon={faPaperclip} className="chatbox-main-content-sended-bottom-att-icon"/>
                    </div>
                    <textarea rows="4" cols="50" className="chatbox-main-content-sended-textarea" placeholder="پیام خود را بنویسید..."></textarea>
                </div>
                </>
                }

            </div>

            </div>
            </>
        );
    }
}

export default withRouter(withCookies(ClientChat));
