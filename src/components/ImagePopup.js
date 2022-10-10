import React from "react";

import btnClosePopup from '../images/btn-close.svg';

export default class ImagePopup extends React.Component {
  render() {
    return (
      <div className={`popup popup_${this.props.name} ${this.props.card ? 'popup_opened' : '' }`}>
        <div className="popup__content popup__content_viewplace">
          <button className="popup__btn-close" title="Закрыть форму" type="button" onClick={this.props.handleClose}>
            <img alt="Закрыть" className="popup__btn-close-img" src={btnClosePopup} />
          </button>
          <figure className="popup__fig">
            <img src={this.props.card?.link} alt={this.props.card?.name} className="popup__fig-img" />
            <figcaption className="popup__fig-caption">{this.props.card?.name}</figcaption>
          </figure>
        </div>
      </div>
    )
  }
}
