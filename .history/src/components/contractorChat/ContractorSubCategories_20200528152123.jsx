import React from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'


function ContractorSubCategories(props) {

    const [cookies, setCookie, removeCookie] = useCookies();

    let [subCategoriesForContractor, setSubCategoriesForContractor] = React.useState(null)

    React.useEffect(() => {
        if(props.guid && subCategoriesForContractor === null) {
            axios.get(`http://185.94.97.164/api/Order/GetOrdersForContractor?categoryGuid=${props.guid}`, {
            headers: { Authorization: "Bearer " + cookies.token }
            }).then(res => {
                if(res.data.orders !== subCategoriesForContractor) {
                    setSubCategoriesForContractor(res.data.orders)
                }
            })
        }
    }, [props.guid])

    return (
        <>
            {props.guid && subCategoriesForContractor !== null ?
             subCategoriesForContractor.map((subOrder, index) => (
                <div className="chatbox-sidebar-content-order-person"
                key={index}
                onClick={() => props.showOrdersPage(subOrder.orderGuid)}>
                    <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                    <div className="chatbox-sidebar-content-order-person-main">
                        <div className="chatbox-sidebar-content-order-person-profile">
                            <img src={props.miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
                        </div>
                        <div className="chatbox-sidebar-content-message-person-desc">
                            <p className="chatbox-sidebar-content-message-person-desc-top">
                                {subOrder.client}
                            </p>
                            <div className="chatbox-sidebar-content-message-person-desc-middbox">
                                <p className="chatbox-sidebar-content-message-person-desc-midd">
                                    {subOrder.description}
                                </p>
                            </div>
                            <p className="chatbox-sidebar-content-message-person-desc-bottom">
                                {subOrder.modifiedDate}
                            </p>
                        </div>
                    </div>
                    <span className="chatbox-sidebar-content-message-person-badge">9</span>
                </div>
                ))
            :null}
        </>
    )
}

export default ContractorSubCategories
