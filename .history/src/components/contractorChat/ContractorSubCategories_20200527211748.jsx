import React from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'


function ContractorSubCategories(props) {

    const [cookies, setCookie, removeCookie] = useCookies();

    let [subCategoriesForContractor, setSubCategoriesForContractor] = React.useState(null)

    React.useEffect(() => {
        if(props.guid && subCategoriesForContractor === null) {
            axios.get(`http://185.94.97.164/api/OrderRequest/GetOrderRequestsForClient?orderGuid=${props.guid}`, {
            headers: { Authorization: "Bearer " + cookies.token }
            }).then(res => {
                if(res.data.orders !== subCategoriesForContractor) {
                    console.log(res.data.orders);
                    setSubCategoriesForContractor(res.data.orders)
                }
            })
        }
    }, [props.guid])

    return (
        <>
            {props.guid && subCategoriesForContractor !== null ?
             subCategoriesForContractor.map((subOrderReq, index) => (
                <div className="chatbox-sidebar-content-message-person" key={index}
                onClick={() => props.showPesronMessageModal(subOrderReq.orderRequestGuid)}>
                    <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                    <div className="chatbox-sidebar-content-message-person-main">
                        <div className="chatbox-sidebar-content-message-person-profile">
                            <img src={props.miaLogo} alt="" className="chatbox-sidebar-content-message-person-profile-img" />
                        </div>
                        <div className="chatbox-sidebar-content-message-person-desc">
                            <p className="chatbox-sidebar-content-message-person-desc-top">
                                {subOrderReq.contractor}
                            </p>
                            <div className="chatbox-sidebar-content-message-person-desc-middbox">
                                <p className="chatbox-sidebar-content-message-person-desc-midd">
                                    {subOrderReq.message}
                                </p>
                            </div>
                            <p className="chatbox-sidebar-content-message-person-desc-bottom">
                                {subOrderReq.modifiedDate}
                            </p>
                        </div>
                    </div>
                    <span className="chatbox-sidebar-content-message-person-badge">5</span>
                </div>
            ))
        :null}
        </>
    )
}

export default ContractorSubCategories
