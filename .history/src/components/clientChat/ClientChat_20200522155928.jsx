// this file is chat page of panel and in the end import in panelMainPathes directory and use in ChatBox component 

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { withCookies } from 'react-cookie';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Collapsible from 'react-collapsible';
import Header from '../header/Header';
// import anime from 'animejs'
import './clientChat.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faSearch, faDownload, faPaperclip, faArrowLeft, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import amooLogo from '../../assets/images/johnny-sins.jpg'
import miaLogo from '../../assets/images/mia-khalife.jpg'
import rubyLogo from '../../assets/images/ruby-rose.jpg'
import mehdiImage from '../../assets/images/mehdi.jpg'
import mamadImage from '../../assets/images/mamad.png'
import ChatLeftMessage from '../chatLeftMessage/ChatLeftMessage';


class ClientChat extends Component {
    constructor(props) {
        super(props);
        const { cookies } = props;

        this.state = { 
            token: cookies.get('token'),
            currentTab: true,
            collapsibleOpen: false,
            collapsibleTriggerOpen: false
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
    }

    toggleCurrentTicket = () => {
        this.setState({currentTab: false})
    }
    toggleCurrentMessage = () => {
        this.setState({currentTab: true})
    }

    removeCookie =() => {
        const {cookies} = this.props
        cookies.remove('token', {path: '/'})
    }


    render() {

        // if(this.props.showChatHamburger === true) {
        //     anime({
        //         targets: this.chatSidebar.current,
        //         right: 0,
        //         duration: 300,
        //         easing: 'linear'
        //     })
        // }else{
        //     anime({
        //         targets: this.chatSidebar.current,
        //         right: '-150%',
        //         duration: 400,
        //         easing: 'easeInSine'
        //     })
        // }

        return (
            <>
            <Header />
            <div className="chatboxkeeper">
            <div className="chatbox-sidebar" ref={this.chatSidebar}>
                <div className="chatbox-sidebar-header">
                <FontAwesomeIcon icon={faTimes} className="chatbox-sidebar-header-close-icon"
                // onClick={this.hideChatHamburgerHandler}
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
                        "chatbox-sidebar-header-buttons-btn chatbox-sidebar-header-buttons-btn-ticket"}
                        onClick={this.toggleCurrentTicket}>
                            تیکت ها
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
                 <Collapsible
                 trigger={
                 <div className={!this.state.collapsibleTriggerOpen ? 
                    "collapsible-trigger-division" :
                    "collapsible-trigger-division-opended"
                 }>
                    <div className="collapsible-trigger-division-rightbox">
                        <div className="collapsible-trigger-division-line bg-dark"></div>
                        <h4>برنامه نویسی</h4>
                    </div>

                     <div className="collapsible-trigger-division-leftbox">
                         <div className="collapsible-trigger-division-badge">6</div>
                         <FontAwesomeIcon
                         icon={!this.state.collapsibleTriggerOpen ? 
                         faAngleDown : faAngleUp}
                         className="collapsible-trigger-division-badge-icon" />
                     </div>
                 </div>
                 }
                 open={this.state.collapsibleTriggerOpen}
                 onOpen={() => this.setState({collapsibleOpen: true})}
                 onClose={() => this.setState({collapsibleOpen: false})}
                 onTriggerOpening={() => this.setState({collapsibleTriggerOpen: true})}
                 onTriggerClosing={() => this.setState({collapsibleTriggerOpen: false})}
                 easing="ease-in"
                 triggerClassName="collapsible-trigger"
                 transitionTime={100} >
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
                </Collapsible>
                    
                    </>
                    :
                    <>
                    {/* <div className="chatbox-sidebar-content-ticket-person">
                        <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                        <div className="chatbox-sidebar-content-ticket-person-main">
                            <div className="chatbox-sidebar-content-ticket-person-profile">
                                <img src={miaLogo} alt="" className="chatbox-sidebar-content-ticket-person-profile-img" />
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

                    <div className="chatbox-sidebar-content-ticket-person">
                        <div className="chatbox-sidebar-content-message-person-line bg-dark"></div>
                        <div className="chatbox-sidebar-content-ticket-person-main">
                            <div className="chatbox-sidebar-content-ticket-person-profile">
                                <img src={miaLogo} alt="" className="chatbox-sidebar-content-ticket-person-profile-img" />
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

                    <div className="chatbox-sidebar-content-ticket-person">
                        <div className="chatbox-sidebar-content-message-person-line bg-danger"></div>
                        <div className="chatbox-sidebar-content-ticket-person-main">
                            <div className="chatbox-sidebar-content-ticket-person-profile">
                                <img src={miaLogo} alt="" className="chatbox-sidebar-content-ticket-person-profile-img" />
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
                    </div> */}
                    </>
    }
    </PerfectScrollbar>
                </div>
                <div className="chatbox-sidebar-content-ticket">
                    <div className="chatbox-sidebar-content-ticket-person">
                        <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                        <div className="chatbox-sidebar-content-ticket-person-main">
                            <div className="chatbox-sidebar-content-ticket-person-profile">
                                <img src={miaLogo} alt="" className="chatbox-sidebar-content-ticket-person-profile-img" />
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

                    <div className="chatbox-sidebar-content-ticket-person">
                        <div className="chatbox-sidebar-content-message-person-line bg-dark"></div>
                        <div className="chatbox-sidebar-content-ticket-person-main">
                            <div className="chatbox-sidebar-content-ticket-person-profile">
                                <img src={miaLogo} alt="" className="chatbox-sidebar-content-ticket-person-profile-img" />
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

                    <div className="chatbox-sidebar-content-ticket-person">
                        <div className="chatbox-sidebar-content-message-person-line bg-danger"></div>
                        <div className="chatbox-sidebar-content-ticket-person-main">
                            <div className="chatbox-sidebar-content-ticket-person-profile">
                                <img src={miaLogo} alt="" className="chatbox-sidebar-content-ticket-person-profile-img" />
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
                </div>

            </div>
            <div className="chatbox-main">
                <div className="chatbox-main-header">
                {/* <FontAwesomeIcon icon={faBars} className="chatbox-main-header-menu-icon"
                onClick={this.showChatHamburgerHandler}
                /> */}
                <button className="chatbox-main-header-ignore-button">
                    قبول / رد کردن
                </button>
                    <div className="chatbox-main-header-person">
                        <div className="chatbox-main-header-person-profile">
                            <img src={rubyLogo} alt="" className="chatbox-main-header-person-profile-img" />
                        </div>
                        <div className="chatbox-main-header-person-desc-box">
                            <p className="chatbox-main-header-person-desc-top">
                                روزبه شامخی
                            </p>
                            <p className="chatbox-main-header-person-desc-bottom">
                                روزبه شامخی
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatbox-main-content">
                    <PerfectScrollbar>

                        <div className="chatbox-main-content-loader"></div>

                        <div className="chatbox-main-content-sended-right">
                            <div className="chatbox-main-content-sended-right-desc">
                                <p className="chatbox-main-content-sended-right-desc-text">
                                    فردا بیا بریم باشگاه برگردیم خونه کار کنیم کدارو بزنیم
                                </p>
                                <span className="chatbox-main-content-sended-right-desc-date">
                                    1399/8/24 pm
                                </span>
                            </div>
                            <div className="chatbox-main-content-sended-right-profbox">
                                <img src={amooLogo} alt="" className="chatbox-main-content-sended-right-profile" />
                            </div>
                        </div>

                        <div className="chatbox-main-content-sended-right">
                            <div className="chatbox-main-content-sended-right-desc">
                                <p className="chatbox-main-content-sended-right-desc-text">
                                    نگی نگفتما بیا بریم
                                </p>
                                <span className="chatbox-main-content-sended-right-desc-date">
                                    1399/8/24 pm
                                </span>
                            </div>
                            <div className="chatbox-main-content-sended-right-profbox">
                                <img src={amooLogo} alt="" className="chatbox-main-content-sended-right-profile" />
                            </div>
                        </div>

                        <div className="chatbox-main-content-sended-left">
                            <div className="chatbox-main-content-sended-left-desc">
                                <p className="chatbox-main-content-sended-left-desc-text">
                                    فردا نمیتونم حال ندارم
                                </p>
                                <span className="chatbox-main-content-sended-left-desc-date">
                                    1395/8/15 pm
                                </span>
                            </div>
                            <div className="chatbox-main-content-sended-left-profbox">
                                <img src={rubyLogo} alt="" className="chatbox-main-content-sended-left-profile" />
                            </div>
                        </div>

                        <div className="chatbox-main-content-sended-left">
                            <div className="chatbox-main-content-sended-left-desc">
                                <p className="chatbox-main-content-sended-left-desc-text">
                                    بمونه پس فردا
                                </p>
                                <span className="chatbox-main-content-sended-left-desc-date">
                                    1395/8/15 pm
                                </span>
                            </div>
                            <div className="chatbox-main-content-sended-left-profbox">
                                <img src={rubyLogo} alt="" className="chatbox-main-content-sended-left-profile" />
                            </div>
                        </div>
                        <ChatLeftMessage 
                        message="امروز نمیشه اصلا"
                        date="1395/8/15 pm"
                        image={rubyLogo}
                        />
                        <div className="chatbox-main-content-sended-left">
                            <div className="chatbox-main-content-sended-left-desc">
                                <p className="chatbox-main-content-sended-left-desc-text">
                                    بمونه پس فردا
                                </p>
                                <span className="chatbox-main-content-sended-left-desc-date">
                                    1395/8/15 pm
                                </span>
                            </div>
                            <div className="chatbox-main-content-sended-left-profbox">
                                <img src={rubyLogo} alt="" className="chatbox-main-content-sended-left-profile" />
                            </div>
                        </div>

                        <div className="chatbox-main-content-sended-right">
                            <div className="chatbox-main-content-sended-right-desc">
                                <p className="chatbox-main-content-sended-right-desc-text">
                                    باشه
                                </p>
                                <span className="chatbox-main-content-sended-right-desc-date">
                                    1399/8/24 pm
                                </span>
                            </div>
                            <div className="chatbox-main-content-sended-right-profbox">
                                <img src={amooLogo} alt="" className="chatbox-main-content-sended-right-profile" />
                            </div>
                        </div>

                    </PerfectScrollbar>
                </div>

                <div className="chatbox-main-content-sended-bottom">
                    <div className="chatbox-main-content-sended-bottom-icons">
                    <FontAwesomeIcon icon={faArrowLeft} className="chatbox-main-content-sended-bottom-tel-icon"/>
                    <FontAwesomeIcon icon={faPaperclip} className="chatbox-main-content-sended-bottom-att-icon"/>
                    </div>
                    <textarea rows="4" cols="50" className="chatbox-main-content-sended-textarea" placeholder="پیام خود را بنویسید"></textarea>
                </div>
            </div>

            </div>
            </>
        );
    }
}

export default withRouter(withCookies(ClientChat));
