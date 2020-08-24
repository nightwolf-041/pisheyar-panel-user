import React from 'react'
import axios from 'axios'
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// import classes from './ui.module.css'
import classes from './profileSetting.module.css'

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginImageValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginImageResize,
    FilePondPluginImageCrop
);
  

const ProfileSetting = (props) => {

    const pond = React.useRef(null)

    const [cookies, setCookie, removeCookie] = useCookies();

    const [files, setFiles] = React.useState([])
    const [documentGuid, setDocumentGuid] = React.useState('')

    const [loading, setLoading] = React.useState(true)
    const [cityLoading, setCityLoading] = React.useState(true)
    const [cities, setCities] = React.useState([])
    const [prevCity, setPrevCity] = React.useState('')
    const [selectedCity, setSelectedCity] = React.useState('')
    // const [genderLoading, setGenderLoading] = React.useState(true)
    // const [genders, setGenders] = React.useState([
    //     {value: '2b451e4c-c9b8-415a-bcb4-05da15447b89', label: 'زن'},
    //     {value: '6e48b657-2c83-4481-a9c5-009ffe10158b', label: 'مرد'}
    // ])
    const [prevGender, setPrevGender] = React.useState([])
    const [selectedGender, setSelectedGender] = React.useState('')
    const [profileSettingFirstName, setProfileSettingFirstName] = React.useState('')
    const [profileSettingFirstNameValid, setProfileSettingFirstNameValid] = React.useState(true)
    const [profileSettingLastName, setProfileSettingLastName] = React.useState('')
    const [profileSettingLastNameValid, setProfileSettingLastNameValid] = React.useState(true)
    const [profileSettingEmail, setProfileSettingEmail] = React.useState('')
    const [profileSettingEmailValid, setProfileSettingEmailValid] = React.useState(true)

    React.useEffect(() => {
        axios.get('/Account/GetCurrentClientUser', {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            console.log(res.data);
            setLoading(false)
        })
    }, [])

    const genders = [
        {value: '2b451e4c-c9b8-415a-bcb4-05da15447b89', label: 'زن'},
        {value: '6e48b657-2c83-4481-a9c5-009ffe10158b', label: 'مرد'}
    ]

    const updateProfile = () => {
        let data = {
            userGuid: '',
            firstName: profileSettingFirstName,
            lastName: profileSettingLastName,
            email: profileSettingEmail,
            cityGuid: selectedCity,
            genderGuid: selectedGender,
            profileDocumentGuid: documentGuid
        }
        console.log(data);
    }

    const profileSettingFirstNameChangeHandler = e => {
        setProfileSettingFirstName(e.target.value)
    }

    const profileSettingLastNameChangeHandler = e => {
        setProfileSettingLastName(e.target.value)
    }

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          textAlign: 'right',
          borderBottom: '1px dotted pink',
          color: state.isSelected ? '#ffd617' : '#0b1033',
          backgroundColor: state.isSelected ? '#0b1033' : 'none',
          padding: 10,
        }),
        placeholder: () => ({
            color: 'rgba(11, 16, 51, 0.5)',
            fontSize: '0.8rem',
            marginBottom: '0.5rem'
        }),
        control: () => ({
            height: '2rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignitems: 'center',
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
          const color = '#0b1033'
      
          return { ...provided, opacity, transition, color };
        }
      }

      const handleCityChange = val => {
        setSelectedCity(val)
      }

      const handleGenderChange = val => {
        setSelectedGender(val)
      }


    return (
        <>
        <div className={!props.hidden ? classes.uiModalsBackdrop : classes.uiModalsBackdropHidden}
         onClick={props.hideProfileSettingModal}>
        </div>

        <div className={!props.hidden ? classes.profileSettingModal : classes.ProfileSettingModalHidden}>
        <div className={classes.profileSettingModalInside}>
        <PerfectScrollbar>
            <div className={classes.profileSettingModalInsidePaddingPaper}>
            <FontAwesomeIcon icon={faTimes}
            onClick={props.hideProfileSettingModal}
            className={classes.profileSettingModalCloseIcon} />
            <h4 className={classes.profileSettingModalLabel}>
                اطلاعات کاربری
            </h4>

            <div className={classes.filepondKeeper}>
                <FilePond ref={pond}
                files={files}
                allowMultiple={false}
                maxFiles={1}
                allowFilePoster={true}
                checkValidity={true}
                allowFileSizeValidation={true}
                maxFileSize='1MB'
                labelMaxFileSizeExceeded="حجم فایل زیاد است"
                labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
                allowImagePreview={true}
                imagePreviewHeight={170}
                imagePreviewWidth={170}
                imageCropAspectRatio='1:1'
                imageResizeTargetWidth={200}
                imageResizeTargetHeight={200}
                imagePreviewMaxHeight={200}
                allowImageValidateSize={true}
                imageValidateSizeMinWidth={300}
                imageValidateSizeMaxWidth={750}
                imageValidateSizeMinHeight={300}
                imageValidateSizeMaxHeight={750}
                stylePanelLayout='compact circle'
                styleLoadIndicatorPosition='center bottom'
                styleProgressIndicatorPosition='right bottom'
                styleButtonRemoveItemPosition='left bottom'
                styleButtonProcessItemPosition='right bottom'        
                imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
                imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
                imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
                imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
                imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {minWidth} × {minHeight}"
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                labelFileTypeNotAllowed="فایل انتخابی مجاز نیست"
                server = {{
                    url: 'http://185.211.59.237/Uploader',
                    process: '/FilepondProcess',
                    revert: {
                    url: '/FilepondRevert',
                    method: 'POST'
                    }
                }}
                onprocessfile={(error, file) => setDocumentGuid(file.serverId)}
                onupdatefiles={(fileItems) => {
                    setFiles(
                        fileItems.map(fileItem => fileItem.file)
                    );
                }}
                labelIdle="تصویر پروفایل"
                labelInvalidField="فایل معنبر نیست"
                labelFileProcessing="درحال بارگذاری"
                labelFileProcessingError="خطا در بارگذاری"
                labelFileLoading="درحال بارگیری"
                labelFileLoadError="خطا در بارگیری"
                labelFileProcessingComplete="بارگذاری موفق"
                labelFileProcessingAborted="لغو بارگذاری"
                labelFileProcessingRevertError="خطا در بازگشتن"
                labelFileRemoveError="خطا در حذف"

                labelTapToCancel="لغو"
                labelTapToRetry="تلاش مجدد"
                labelTapToUndo="بازنشانی"
                labelButtonRemoveItem="حذف"
                labelButtonRetryItemLoad="تلاش مجدد"
                labelButtonAbortItemProcessing="لغو"
                labelButtonUndoItemProcessing="بازنشانی"
                labelButtonRetryItemProcessing="تلاش مجدد"
                labelButtonProcessItem="بارگذاری"
                
                >
                </FilePond>
            </div>

            {!cityLoading ?
            <Select key={1}
                menuContainerStyle={{zIndex: 50}}
                menuPortalTarget={document.body}
                inputId="profileSettingCity11"
                instanceId="profileSettingCity12"
                placeholder="شهر"
                className={classes.profileSettingSelect}
                defaultValue={prevCity}
                label="Single select"
                isRtl={true}
                isLoading={cityLoading}
                loadingMessage={() => "درحال بارگیری..."}
                noOptionsMessage={() => "نتیجه ای یافت نشد"}
                styles={customStyles}
                options={cities}
                getOptionLabel={option => `${option.title}`}
                getOptionValue={option => `${option.cityGuid}`}
                onChange={val => handleCityChange(val)}
            />
            :
            <Select key={11}
                menuContainerStyle={{zIndex: 50}}
                menuPortalTarget={document.body}
                inputId="profileSettingCity133"
                instanceId="profileSettingCity133"
                placeholder="شهر"
                className={classes.profileSettingSelect}
                label="Single selectttttt"
                isRtl={true}
                isLoading={cityLoading}
                loadingMessage={() => "درحال بارگیری..."}
                noOptionsMessage={() => "نتیجه ای یافت نشد"}
                styles={customStyles}
                options={cities}
                getOptionLabel={option => `${option.title}`}
                getOptionValue={option => `${option.cityGuid}`}
                onChange={val => handleCityChange(val)}
            />
            }

            {!loading ?
            <Select key={2}
                menuContainerStyle={{zIndex: 50}}
                menuPortalTarget={document.body}
                inputId="profileSettinggender11"
                instanceId="profileSettinggender12"
                placeholder="جنسیت"
                className={classes.profileSettingSelect}
                // defaultValue={prevGender}
                label="Single select"
                isRtl={true}
                // isLoading={loading}
                loadingMessage={() => "درحال بارگیری..."}
                noOptionsMessage={() => "نتیجه ای یافت نشد"}
                styles={customStyles}
                options={genders}
                getOptionLabel={option => `${option.label}`}
                getOptionValue={option => `${option.value}`}
                onChange={val => handleGenderChange(val)}
            />
            :
            <Select key={22}
                menuContainerStyle={{zIndex: 50}}
                menuPortalTarget={document.body}
                inputId="profileSettinggender133"
                instanceId="profileSettinggender133"
                placeholder="جنسیت"
                className={classes.profileSettingSelect}
                label="Single selectttttt"
                isRtl={true}
                // isLoading={loading}
                loadingMessage={() => "درحال بارگیری..."}
                noOptionsMessage={() => "نتیجه ای یافت نشد"}
                styles={customStyles}
                options={genders}
                getOptionLabel={option => `${option.label}`}
                getOptionValue={option => `${option.value}`}
                onChange={val => handleGenderChange(val)}
            />
            }

            <input onChange={e => profileSettingFirstNameChangeHandler(e)}
            value={profileSettingFirstName}
            placeholder="نام"
            className={profileSettingFirstNameValid ?
                classes.profileSettingModalInput :
                classes.profileSettingModalInputInvalid}
            />
            <input onChange={e => profileSettingLastNameChangeHandler(e)}
            value={profileSettingLastName}
            placeholder="نام خانوادگی"
            className={profileSettingLastNameValid ?
                classes.profileSettingModalInput :
                classes.profileSettingModalInputInvalid}
            />

            <input onChange={e => profileSettingLastNameChangeHandler(e)}
            value={profileSettingEmail}
            placeholder="email"
            className={profileSettingEmailValid ?
                classes.profileSettingModalInputEmail :
                classes.profileSettingModalInputEmailInvalid}
            />
            <div className={classes.profileSettingModalButtonsBox}>
                <button className={classes.profileSettingModalButton}
                disabled={loading}
                onClick={() => updateProfile()}>
                    ثبت اطلاعات
                </button>
            </div>
            </div>
            </PerfectScrollbar>
            </div>
        </div>
        </>
    )
}

export default ProfileSetting
