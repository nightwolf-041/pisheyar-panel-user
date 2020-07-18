
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {
  HubConnectionBuilder,
  HubInvocationMessage,
  LogLevel
} from '@aspnet/signalr'
import { withCookies } from 'react-cookie'
import PerfectScrollbar from 'react-perfect-scrollbar'
// import Collapsible from 'react-collapsible';
import ChatLeftMessage from '../chatMessages/ChatLeftMessage'
import ChatRightMessage from '../chatMessages/ChatRightMessage'
import Header from '../header/Header'
import ClientChatMessageModal from '../UI/ClientChatMessageModal'
import ClientAcceptModal from '../UI/ClientAcceptModal'
import ContractAcceptModal from '../UI/ContractAcceptModal'
import OrdersPage from '../ordersPage/OrdersPage'
import 'react-accessible-accordion/dist/fancy-example.css'
import ContractorChatSidebar from './ContractorChatSidebar'
import './contractorChat.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faSearch,
  faPaperclip,
  faArrowLeft,
  faAngleDown,
  faAngleUp
} from '@fortawesome/free-solid-svg-icons'

import maleAvatar from '../../assets/images/male.png'
import femaleAvatar from '../../assets/images/female.png'
import ctgAvatar from '../../assets/images/ctgAvatar.png'

class ClientChat extends Component {
  constructor (props) {
    super(props)
    const { cookies } = props

    this.state = {
      token: cookies.get('token'),

      connection: new HubConnectionBuilder()
        .withUrl('http://185.211.59.237/ChatHub', {
          accessTokenFactory: () => cookies.get('token')
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
      contractAcceptModalOrderGuid: null,
      contractAcceptModalOrderTitle: null,
      showOrdersPage: false,
      orderRequestAcceptState: 0,
      orderRequestAcceptMsg: '',

      contractorInfo: null,
      contractorGender: null,

      clickedOrderGuid: null,
      prevClickedOrderGuid: null,
      clickedOrderIsAllowed: null,

      messageTextAreaValue: '',
      chatMessages: [],

      orderPageData: [],
      orderPageDataState: 0,
      orderCategoryGuid: null
    }
    this.chatSidebar = React.createRef()
    this._scrollRef = null
  }

  componentDidMount () {
    const { cookies } = this.props
    const token = cookies.get('token')
    
    if (token === undefined) {
      this.props.history.replace('/login')
    }

    axios.get(`http://185.211.59.237/Account/GetCurrentContractorUser`, {
      headers: { Authorization: "Bearer " + token }
    }).then(res => {
        let infoGender = {...res.data.user.gender}
        this.setState({
          contractorInfo: res.data.user,
          contractorGender: infoGender.name
        })
    })

    const connection = this.state.connection

    const start = () => {
      connection.start().catch(err => {
        console.log(err)
      })
    }
    start()

    connection.onclose(() => {
        start()
    })

    connection.on('ReceiveMessage', (clientName, text, sentAt, from) => {
      console.log(text)
      const chatMessages = this.state.chatMessages
      console.log(sentAt, from)

      if(chatMessages !== null) {
        chatMessages.push({
            text,
            sentAt,
            from
        })
      } 
      this.setState(
        {
          chatMessages: chatMessages
        },
        () => {
          if(this.state.chatMessages !== null && this.state.chatMessages !== [] && chatMessages !== null && chatMessages !== [] && chatMessages.length > 0 && this.state.chatMessages.length > 0 && this.state.showOrdersPage === false) {
            this._scrollRef.scrollTo(0, this._scrollRef.scrollHeight)
          }
        }
      )
    })
  }

  componentDidUpdate = () => {
    const connection = this.state.connection

    connection.onclose(() => {
        connection.start().catch((err) => {
            console.log(err);
        })
    })
}  

  toggleCurrentOrder = () => {
    this.setState({
      currentTab: false
    })
  }
  toggleCurrentMessage = () => {
    this.setState({
      currentTab: true
    })
  }

  removeCookie = () => {
    const { cookies } = this.props
    cookies.remove('token', {
      path: '/'
    })
  }

  showHamburgerMenu = () => {
    let toggleState = this.state.hamburgerMenuToggle
    this.setState({
      hamburgerMenuToggle: !toggleState
    })
  }
  hideHamburgerMenu = () => {
    this.setState({
      hamburgerMenuToggle: false
    })
  }

  showPesronMessageModal = () => {
    this.setState({
      messageModalHidden: false
    })
  }
  hidePersonMessageModal = () => {
    this.setState({
      messageModalHidden: true
    })
  }

  showPesronAcceptModal = () => {
    this.setState({
      acceptModalHidden: false
    })
  }
  hidePersonAcceptModal = () => {
    this.setState({
      acceptModalHidden: true
    })
  }

  showOrdersPage = (guid) => {

    const { cookies } = this.props

    axios.get(`http://185.211.59.237/Order/GetOrdersForContractor?categoryGuid=${guid}`, {
        headers: { Authorization: "Bearer " + cookies.get('token') }
    }).then(res => {
      console.log(res.data.orders);
        this.setState({
            showOrdersPage: true,
            orderCategoryGuid: guid,
            orderPageData: res.data.orders,
            orderPageDataState: res.data.state,
            orderRequestAcceptState: 1
        })
    })

  }

  hideOrdersPage = () => {
    this.setState({
      showOrdersPage: false
    })
  }

  showContractAcceptModal = (orderGuid, title) => {
    console.log(orderGuid);
    console.log(title);
    this.setState({
      contractAcceptModalOrderGuid: orderGuid,
      contractAcceptModalOrderTitle: title,
      contractAcceptModalHidden: false
    })
  }
  hideContractAcceptModal = () => {
    this.setState({
      contractAcceptModalHidden: true
    })
  }

  removeOrdeerPageData = guid => {

    const orderPageDataArr = this.state.orderPageData
    const updatedOrderPageData = orderPageDataArr.filter(data => {
      return data.orderGuid !== guid
    })
    console.log(updatedOrderPageData);
    this.setState({
      contractAcceptModalHidden: true,
      orderPageData: updatedOrderPageData
    })

  }

  startChatHandler = (guid, isAllowed) => {

    console.log(isAllowed);

    const { cookies } = this.props
    const connection = this.state.connection

    this.setState({prevClickedOrderGuid: this.state.clickedOrderGuid}, () => {
      this.setState({
        clickedOrderGuid: guid,
        clickedOrderIsAllowed: isAllowed,
        showOrdersPage: false
      })
    })

      axios
        .get(
          `http://185.211.59.237/OrderRequest/GetChatMessages?orderRequestGuid=${guid}`,
          {
            headers: {
              Authorization: 'Bearer ' + cookies.get('token')
            }
          }
        )
        .then(res => {

          connection.invoke('LeaveRoomAsync', this.state.prevClickedOrderGuid).catch(err => console.log(err))
          connection.invoke('JoinRoomAsync', guid).catch(err => console.log(err))

          if(res.data.state === 1){
              this.setState({
                  orderRequestAcceptState: res.data.state,
                  orderRequestAcceptMsg: res.data.message,
                  chatMessages: res.data.chatMessages
              })
              if(this.state.chatMessages !== null && this.state.chatMessages !== [] && this.state.chatMessages.length > 0 && this.state.showOrdersPage === false) {
                  this._scrollRef.scrollTo(0, this._scrollRef.scrollHeight)
              }
          }
          if(res.data.state === 2 || res.data.state === 3 || res.data.state === 4) {
              this.setState({
                  orderRequestAcceptState: res.data.state,
                  orderRequestAcceptMsg: res.data.message,
                  chatMessages: []
              })
          }
        
      })
  }

  messageTextAreaChangeHandler = e => {
    this.setState({
      messageTextAreaValue: e.target.value
    })
  }

  sendMessageHandler = () => {
    const connection = this.state.connection
    const value = this.state.messageTextAreaValue

    if(value.length > 0) {
        this.setState({
            messageTextAreaValue: '',
            // orderRequestAcceptState: 1
        })
        if(this.state.clickedOrderIsAllowed) {
          this.setState({
            // messageTextAreaValue: '',
            orderRequestAcceptState: 1
          })
        }
    }

    connection.invoke('SendMessageAsync', this.state.clickedOrderGuid, value).catch(err => console.log(err))
  }


  renderByAcceptState = () => {
      if(this.state.orderRequestAcceptState === 1 || this.state.orderRequestAcceptState === 4) {
          return (
            <div className='chatbox-main'>
                
            {!this.state.showOrdersPage ?
            <div className='chatbox-main-header'>
              {/* <button
                className='chatbox-main-header-ignore-button'
                onClick={this.showPesronAcceptModal}
              >
                قبول / رد کردن
              </button> */}
              <div></div>
              <div className='chatbox-main-header-person'>
                <div className='chatbox-main-header-person-profile'>
                  <img
                    src={
                      this.state.contractorGender === "مرد" ?
                      maleAvatar :
                      femaleAvatar
                    }
                    alt=''
                    className='chatbox-main-header-person-profile-img'
                  />
                </div>
                <div className='chatbox-main-header-person-desc-box'>
                  <p className='chatbox-main-header-person-desc-top'>
                    روزبه شامخی
                  </p>
                  <p className='chatbox-main-header-person-desc-bottom'>
                    روزبه شامخی
                  </p>
                </div>
              </div>
            </div>
            :null
            }

            {this.state.showOrdersPage ? (
              <OrdersPage
                data={this.state.orderPageData}
                dataState={this.state.orderPageDataState}
                hideOrdersPage={this.hideOrdersPage}
                showContractAcceptModal={(orderGuid, title) => this.showContractAcceptModal(orderGuid, title)}
              />
            ) : (
              <>
                <div
                  className='chatbox-main-content'
                  ref={ref => (this.chatBoxMainRef = ref)}
                >

                  {!this.state.clickedOrderIsAllowed ?
                      <div className="client-chat-allowed-message">
                        <p>
                          چت بسته شده است
                        </p>
                      </div>
                    :null
                  }

                  <PerfectScrollbar
                    // onScrollY={container =>
                    //   console.log(`scrolled to: ${container.scrollTop}.`)
                    // }
                    containerRef={ref => (this._scrollRef = ref)}
                    // option={{suppressScrollX: true}}
                  >
                    <div className='chatbox-main-content-loader'> </div>
                    {this.state.orderRequestAcceptState === 4 ? 
                        <div className="chatbox-main-content-no-message">
                            نتیجه ای یافت نشد
                        </div>
                        :null
                    }
                    {this.state.chatMessages !== null && this.state.chatMessages !== [] && this.state.orderRequestAcceptState === 1
                        ? this.state.chatMessages.map((msg, index) => {
                            if (msg.from === 'سرویس دهنده') {
                              return (
                                <ChatRightMessage
                                  key={index}
                                  message={msg.text}
                                  date={msg.sentAt}
                                  image={
                                    this.state.contractorGender === "مرد" ?
                                    maleAvatar :
                                    femaleAvatar
                                  }
                                />
                              )
                            } else {
                              return (
                                <ChatLeftMessage
                                  key={index}
                                  message={msg.text}
                                  date={msg.sentAt}
                                  image={maleAvatar}
                                />
                              )
                            }
                            return null
                          })
                        : null}
                  </PerfectScrollbar>
                </div>
                <div className='chatbox-main-content-sended-bottom'>
                  <div className='chatbox-main-content-sended-bottom-icons'>
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      onClick={this.sendMessageHandler}
                      className='chatbox-main-content-sended-bottom-tel-icon'
                    />
                    <FontAwesomeIcon
                      icon={faPaperclip}
                      className='chatbox-main-content-sended-bottom-att-icon'
                    />
                  </div>
                  <textarea
                    rows='4'
                    cols='50'
                    className='chatbox-main-content-sended-textarea'
                    value={this.state.messageTextAreaValue}
                    onChange={e => this.messageTextAreaChangeHandler(e)}
                    placeholder='پیام خود را بنویسید...'
                  ></textarea>
                </div>
              </>
            )}
          </div>
          )
      }else if (this.state.orderRequestAcceptState === 2) {
        return (
            <div className='chatbox-main'>
                <div className="chatbox-main-content-stateTwoThree">
                    <p className="chatbox-main-content-stateTwoThree-desc">
                        کاربر مورد نظر یافت نشد
                    </p>
                </div>
            </div>
        )
      }else if (this.state.orderRequestAcceptState === 3) {
        return (
            <div className='chatbox-main'>
                <div className="chatbox-main-content-stateTwoThree">
                    <p className="chatbox-main-content-stateTwoThree-desc">
                        درخواست سفارش مورد نظر یافت نشد
                    </p>
                </div>
            </div>
        )
      }else{
        return (
            <div className='chatbox-main'>
                <div className="chatbox-main-content-empty"></div>
            </div>
        )
      }
  }

  render () {
    console.log(this.state.showOrdersPage)
    return (
      <>
        <Header showHamburgerMenu={this.showHamburgerMenu} />
        <ClientChatMessageModal
          hidden={this.state.messageModalHidden}
          hidePersonMessageModal={this.hidePersonMessageModal}
        />
        {/* <ClientAcceptModal
          hidden={this.state.acceptModalHidden}
          hidePersonAcceptModal={this.hidePersonAcceptModal}
        /> */}
        <ContractAcceptModal
          hidden={this.state.contractAcceptModalHidden}
          orderGuid={this.state.contractAcceptModalOrderGuid}
          title={this.state.contractAcceptModalOrderTitle}
          hideContractAcceptModal={this.hideContractAcceptModal}
          removeOrdeerPageData={guid => this.removeOrdeerPageData(guid)}
        />
        <div className='chatboxkeeper'>
          <ContractorChatSidebar
            maleAvatar={maleAvatar}
            femaleAvatar={femaleAvatar}
            ctgAvatar={ctgAvatar}
            hamburgerMenuToggle={this.state.hamburgerMenuToggle}
            hideHamburgerMenu={this.hideHamburgerMenu}
            removeCookie={this.removeCookie}
            currentTab={this.state.currentTab}
            toggleCurrentOrder={this.toggleCurrentOrder}
            toggleCurrentMessage={this.toggleCurrentMessage}
            hideOrdersPage={this.hideOrdersPage}
            showOrdersPage={orderGuid => this.showOrdersPage(orderGuid)}
            startChatHandler={(guid, isAllowed) => this.startChatHandler(guid, isAllowed)}
          />
     
          {this.renderByAcceptState()}
        </div>
      </>
    )
  }
}

export default withRouter(withCookies(ClientChat))
