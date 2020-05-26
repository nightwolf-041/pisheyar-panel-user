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

            connection: new HubConnectionBuilder()
            .withUrl('http://185.94.97.164/ChatHub', {
                accessTokenFactory: () => cookies.get('token'),
            })
            .configureLogging(LogLevel.Debug)
            .build(),
            
            currentTab: true,
            hamburgerMenuToggle: false,
            collapsibleOpen: false,
            collapsibleTriggerOpen: false,
            messageModalHidden: true,
            acceptModalHidden: true,
            contractAcceptModalHidden: true,
            showOrdersPage: false,
            orderRequestAcceptState: 0,
            clickedOrderGuid: null,
            messageTextAreaValue: '',
            chatMessages: []
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

        this.setState({clickedOrderGuid: guid})

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

    messageTextAreaChangeHandler = e => {
        this.setState({messageTextAreaValue: e.target.value})
    }

    sendMessageHandler = () => {
        const connection = this.state.connection
        const value = this.state.messageTextAreaValue
        connection.invoke(
            'SendMessageAsync',
            this.state.clickedOrderGuid,
            value,
        );
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

            {this.state.orderRequestAcceptState === 1 ? 
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
                  <div className="chatbox-main-content" ref={ref => this.chatBoxMainRef = ref}>
                    <PerfectScrollbar
                    onScrollY={container => console.log(`scrolled to: ${container.scrollTop}.`)}
                    containerRef={ref => this._scrollRef = ref}
                    // option={{suppressScrollX: true}}
                    >

                    <div className="chatbox-main-content-loader"></div>

                    {
                    this.state.chatMessages !== [] ?
                        this.state.chatMessages.map((msg, index) => {
                            if (msg.from === "سرویس گیرنده") {
                                return <ChatRightMessage
                                key={index}
                                message={msg.text}
                                date={msg.sentAt}
                                image={amooLogo}
                                />
                            }else {
                                return <ChatLeftMessage
                                key={index}
                                message={msg.text}
                                date={msg.sentAt}
                                image={rubyLogo}
                                />
                            }
                            return null
                            }
                        )
                        : null
                    }

                    </PerfectScrollbar>
                </div>

                <div className="chatbox-main-content-sended-bottom">
                    <div className="chatbox-main-content-sended-bottom-icons">
                    <FontAwesomeIcon icon={faArrowLeft} className="chatbox-main-content-sended-bottom-tel-icon"/>
                    <FontAwesomeIcon icon={faPaperclip} className="chatbox-main-content-sended-bottom-att-icon"/>
                    </div>
                    <textarea rows="4" cols="50" className="chatbox-main-content-sended-textarea" onChange={e => this.messageTextAreaChangeHandler(e)} placeholder="پیام خود را بنویسید..."></textarea>
                </div>
                </>
                }

            </div>
            : <div className="chatbox-main-content-empty"></div> 
            }

            </div>
            </>
        );
    }
}

export default withRouter(withCookies(ClientChat));
