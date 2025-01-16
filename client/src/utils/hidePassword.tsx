
import { faEyeSlash, faEye, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

type HidePasswordType = {
    isHide: boolean,
    setIsHide: React.Dispatch<React.SetStateAction<boolean>>,
    setInputType: React.Dispatch<React.SetStateAction<string>>,
    setEyeIcon: React.Dispatch<React.SetStateAction<IconDefinition>>
}

type HideConfirmPasswordType = {
    isConfirmPasswordHide: boolean,
    setIsConfirmPasswordHide: React.Dispatch<React.SetStateAction<boolean>>,
    setConfirmPasswordType: React.Dispatch<React.SetStateAction<string>>,
    setConfirmPasswordEyeIcon: React.Dispatch<React.SetStateAction<IconDefinition>>
}

const hidePassword = ({ isHide, setIsHide, setInputType, setEyeIcon } : HidePasswordType) => {
    setIsHide(!isHide);
    if(isHide) {
        setInputType('password');
        setEyeIcon(faEyeSlash);
    } else {
        setInputType('text');
        setEyeIcon(faEye);
    }
}

const hideConfirmPassword = ({ 
    isConfirmPasswordHide, 
    setIsConfirmPasswordHide, 
    setConfirmPasswordType, 
    setConfirmPasswordEyeIcon
} : HideConfirmPasswordType) => {
    setIsConfirmPasswordHide(!isConfirmPasswordHide);
    if(isConfirmPasswordHide) {
        setConfirmPasswordType('password');
        setConfirmPasswordEyeIcon(faEyeSlash);
    } else {
        setConfirmPasswordType('text');
        setConfirmPasswordEyeIcon(faEye);
    }
}

export { hidePassword, hideConfirmPassword };