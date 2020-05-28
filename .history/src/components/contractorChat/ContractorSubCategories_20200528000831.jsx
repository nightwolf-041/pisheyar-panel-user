import React from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'


function ContractorSubCategories(props) {

    const [cookies, setCookie, removeCookie] = useCookies();

    let [subCategoriesForContractor, setSubCategoriesForContractor] = React.useState(null)

    React.useEffect(() => {
        if(props.guid && subCategoriesForContractor === null) {
            axios.get(`http://185.94.97.164/api/Contractor/GetCategories?orderGuid=${props.guid}`, {
            headers: { Authorization: "Bearer " + cookies.token }
            }).then(res => {
                if(res.data.orders !== subCategoriesForContractor) {
                    console.log(res.data);
                    setSubCategoriesForContractor(res.data.orders)
                }
            })
        }
    }, [props.guid])

    // console.log(subCategoriesForContractor);

    return (
        <>
            {/* {props.guid && subCategoriesForContractor !== null ?
             subCategoriesForContractor.map((subOrderReq, index) => (
                <div className="chatbox-sidebar-content-order-person"
                key={index}
                onClick={props.showOrdersPage}>
                    <div className="chatbox-sidebar-content-message-person-line bg-success"></div>
                    <div className="chatbox-sidebar-content-order-person-main">
                        <div className="chatbox-sidebar-content-order-person-profile">
                            <img src={props.miaLogo} alt="" className="chatbox-sidebar-content-order-person-profile-img" />
                        </div>
                        <h4 className="chatbox-sidebar-content-order-person-desc">
                            جوشکاری
                        </h4>
                    </div>
                    <span className="chatbox-sidebar-content-message-person-badge">9</span>
                </div>
                ))
            :null} */}
        </>
    )
}

export default ContractorSubCategories
