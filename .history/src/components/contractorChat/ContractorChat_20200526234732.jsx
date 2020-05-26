// this file is chat page of panel and in the end import in panelMainPathes directory and use in ChatBox component 

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr'
import { withCookies } from 'react-cookie';
import PerfectScrollbar from 'react-perfect-scrollbar'
// import Collapsible from 'react-collapsible';
import ChatLeftMessage from '../chatMessages/ChatLeftMessage';
import ChatRightMessage from '../chatMessages/ChatRightMessage';
import Header from '../header/Header';
import ClientChatMessageModal from '../UI/ClientChatMessageModal';
import ClientAcceptModal from '../UI/ClientAcceptModal';
import ContractAcceptModal from '../UI/ContractAcceptModal';
import OrdersPage from '../ordersPage/OrdersPage';
import 'react-accessible-accordion/dist/fancy-example.css';
import ContractorChatSidebar from './ContractorChatSidebar';
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
            contractAcceptModalHidden: true,
            showOrdersPage: false,
            orderRequestAcceptState: 0
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
        .build()

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

    showContractAcceptModal = () => {
        this.setState({contractAcceptModalHidden: false})
    }
    hideContractAcceptModal = () => {
        this.setState({contractAcceptModalHidden: true})
    }

    startChatHandler = (guid) => {
        const {cookies} = this.props

        axios.get(`http://185.94.97.164/api/OrderRequest/GetChatMessages?orderRequestGuid=${guid}`, {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            console.log(res.data);
            this.setState({
                orderRequestAcceptState: res.data.state,
                chatMessages: res.data.chatMessages
            })
            this._scrollRef.scrollTo(0, this._scrollRef.scrollHeight)
        })
    }

    render() {

        return (
            <>
            <Header showHamburgerMenu={this.showHamburgerMenu} />

            <ClientChatMessageModal hidden={this.state.messageModalHidden}
            hidePersonMessageModal={this.hidePersonMessageModal} />

            <ClientAcceptModal hidden={this.state.acceptModalHidden}
             hidePersonAcceptModal={this.hidePersonAcceptModal} />

            <ContractAcceptModal hidden={this.state.contractAcceptModalHidden}
            showContractAcceptModal={this.showContractAcceptModal}
            hideContractAcceptModal={this.hideContractAcceptModal} />

            <div className="chatboxkeeper">
                <ContractorChatSidebar 
                miaLogo={miaLogo}
                amooLogo={amooLogo}
                hamburgerMenuToggle={this.state.hamburgerMenuToggle}
                hideHamburgerMenu={this.hideHamburgerMenu}
                removeCookie={this.removeCookie}
                currentTab={this.state.currentTab}
                toggleCurrentOrder={this.toggleCurrentOrder}
                toggleCurrentMessage={this.toggleCurrentMessage}
                hideOrdersPage={this.hideOrdersPage}
                showOrdersPage={this.showOrdersPage}
                startChatHandler={guid => this.startChatHandler(guid)}
                />

                {this.state.orderRequestAcceptState === 1}
            <div className="chatbox-main">
                <div className="chatbox-main-header">
                <button className="chatbox-main-header-ignore-button"
                onClick={this.showPesronAcceptModal}>
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

                {this.state.showOrdersPage ? 
                <OrdersPage hideOrdersPage={this.hideOrdersPage}
                showContractAcceptModal={this.showContractAcceptModal} />
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
