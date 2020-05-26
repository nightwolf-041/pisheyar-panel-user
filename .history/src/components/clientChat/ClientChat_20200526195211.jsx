

import React, { Component } from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {HubConnectionBuilder, HubInvocationMessage, LogLevel}from '@aspnet/signalr'
import { withCookies } from 'react-cookie';
import PerfectScrollbar from 'react-perfect-scrollbar'
// import Collapsible from 'react-collapsible';
import ChatLeftMessage from '../chatMessages/ChatLeftMessage';
import ChatRightMessage from '../chatMessages/ChatRightMessage';
import Header from '../header/Header';
import ClientChatMessageModal from '../UI/ClientChatMessageModal';
import ClientAcceptModal from '../UI/ClientAcceptModal';
import ContractorResume from '../contractorResume/ContractorResume';
import 'react-accessible-accordion/dist/fancy-example.css';
import ClientChatSidebar from './ClientChatSidebar';
import './clientChat.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

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
            showResumePage: false,
            clickedOrderGuid: null,
            orderRequestAcceptState: 0,
            OrderRequestAccept: 0,
            chatMessages: [],

            messageTextAreaValue: ''
         };
         this.chatSidebar = React.createRef()
         this.chatBoxMainRef = React.createRef()
    }


    componentDidMount() {
        const {cookies} = this.props
        const token = cookies.get('token')
        if(token === undefined) {
            this.props.history.replace('/login')
        }

        const connection = this.state.connection
        
        const start = async () => {
            await connection.start().catch(err => {
            console.log(err);
            })

            // this.setState({connection})
          }
        start();

        connection.on('ReceiveMessage', (clientName, text, sendAt) => {
            console.log('received message: ' + text);
            const chatMessages = this.state.chatMessages
            console.log(chatMessages);
            let newMsg = {
                text, 
                sendAt,
                from: "سرویس گیرنده"
            }
            chatMessages.push(newMsg)
            this.setState({chatMessages: chatMessages})
            console.log(chatMessages);
        })

        connection.onclose(() => {
            setInterval(() => {
                start()
            }, 5000)
        })
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

    showHamburgerMenu = () => {
        let toggleState = this.state.hamburgerMenuToggle
        this.setState({hamburgerMenuToggle: !toggleState})
    }
    hideHamburgerMenu = () => {
        this.setState({hamburgerMenuToggle: false})
    }

    showPesronMessageModal = (reqGuid) => {
        console.log(reqGuid);
        this.setState({
            messageModalHidden: false,
            clickedOrderGuid: reqGuid
        })
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

    showResumePage = () => {
        this.setState({showResumePage: true})
    }
    
    hideResumePage = () => {
        this.setState({showResumePage: false})
    }

    startChatHandler = () => {
        const connection = this.state.connection
        const guid = this.state.clickedOrderGuid
        const {cookies} = this.props
        const token = cookies.get('token')

        axios.post('http://185.94.97.164/api/OrderRequest/Accept', {
            orderRequestGuid: guid
        }, {
            headers: { Authorization: "Bearer " + token }
        }).then(res => {
            console.log(res.data);
            console.log(this.state.clickedOrderGuid);
            this.setState({
                orderRequestAcceptState: res.data.state,
                messageModalHidden: true
            })

            connection.invoke('JoinRoomAsync', guid)

            axios.get(`http://185.94.97.164/api/OrderRequest/GetChatMessages?orderRequestGuid=${guid}`, {
                headers: { Authorization: "Bearer " + token }
            }).then(res => {
                console.log(res.data);
                this.setState({chatMessages: res.data.chatMessages})
                this._scrollBarRef.scrollTop = Number.MAX_SAFE_INTEGER
            })
        })

        // connection.invoke('OrderRequestRoomHandlerAsync', guid)
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
        this._scrollBarRef.scrollTop = Number.MAX_SAFE_INTEGER
    }
 
    render() {

        console.log(this.state.chatMessages);

        return (
            <>
            <Header showHamburgerMenu={this.showHamburgerMenu} />

            <ClientChatMessageModal hidden={this.state.messageModalHidden}
            hidePersonMessageModal={this.hidePersonMessageModal}
            startChatHandler={this.startChatHandler} />

            <ClientAcceptModal hidden={this.state.acceptModalHidden}
             hidePersonAcceptModal={this.hidePersonAcceptModal} />

            <div className="chatboxkeeper">
                <ClientChatSidebar
                hamburgerMenuToggle={this.state.hamburgerMenuToggle}
                hideHamburgerMenu={this.hideHamburgerMenu}
                amooLogo={amooLogo}
                miaLogo={miaLogo}
                removeCookie={this.removeCookie}
                currentTab={this.state.currentTab}
                toggleCurrentTicket={this.toggleCurrentTicket}
                toggleCurrentMessage={this.toggleCurrentMessage}
                showPesronMessageModal={(reqGuid) => this.showPesronMessageModal(reqGuid)}
                />
          
          {this.state.orderRequestAcceptState === 1 ?
            <div className="chatbox-main">
                

                {this.state.showResumePage ? 
                <ContractorResume hideResumePage={this.hideResumePage} />
                :
                <>
                <div className="chatbox-main-header">
                <button className="chatbox-main-header-ignore-button"
                onClick={this.showPesronAcceptModal}>
                    قبول / رد کردن
                </button>
                    <div className="chatbox-main-header-person">
                        <div className="chatbox-main-header-person-profile"
                        onClick={this.showResumePage}>
                            <img src={rubyLogo} alt="" className="chatbox-main-header-person-profile-img" />
                        </div>
                        <div className="chatbox-main-header-person-desc-box">
                            <p className="chatbox-main-header-person-desc-top"
                            onClick={this.showResumePage}>
                                روزبه شامخی
                            </p>
                            <p className="chatbox-main-header-person-desc-bottom">
                                روزبه شامخی
                            </p>
                        </div>
                    </div>
                </div>
                <div className="chatbox-main-content" ref={this.chatBoxMainRef}>
                    <PerfectScrollbar
                    ref={ref => this._scrollBarRef = ref }
                    option={{suppressScrollX: true}}>

                    <div className="chatbox-main-content-loader"></div>

                    {/* {this.state.orderRequestAcceptState === 1 ? */}

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
                    {/* : null  */}
                    {/* } */}

                    </PerfectScrollbar>
                </div>

                <div className="chatbox-main-content-sended-bottom">
                    <div className="chatbox-main-content-sended-bottom-icons">
                    <FontAwesomeIcon icon={faArrowLeft} 
                    onClick={this.sendMessageHandler}
                    className="chatbox-main-content-sended-bottom-tel-icon"/>
                    <FontAwesomeIcon icon={faPaperclip} className="chatbox-main-content-sended-bottom-att-icon"/>
                    </div>
                    <textarea rows="4" cols="50" className="chatbox-main-content-sended-textarea"
                    onChange={e => this.messageTextAreaChangeHandler(e)} placeholder="پیام خود را بنویسید..."></textarea>
                </div>
                </>
                }

            </div>
            : <div className="chatbox-main-content" ref={this.chatBoxMainRef}></div> 
            }

            </div>
            </>
        );
    }
}

export default withRouter(withCookies(ClientChat));
