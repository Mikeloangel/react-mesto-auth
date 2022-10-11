import React from "react";

import btnClosePopup from '../images/btn-close.svg';

function InfoToolTip({message = null, imgList, type, onClose }){
  return (
    <div className={`popup popup_info ${type !== 'hidden' ? 'popup_opened' : ''}`}>
      <div className="popup__content popup__content_tooltip">
        <button className="popup__btn-close" title="Закрыть окно" type="button">
          <img alt="Закрыть" className="popup__btn-close-img" src={btnClosePopup} onClick={onClose} />
        </button>
        <img src={imgList[type]} alt={message} className="popup__info-img"/>
        <h2 className="popup__info-title">{message}</h2>
      </div>
    </div>
  )
}

export default InfoToolTip;
