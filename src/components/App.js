import React, { useState } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';

import api from "../utils/Api";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import PopupWithNotification from './PopupWithNotification';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  //States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selecetdCardToDelete, setSelecetdCardToDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const [isLogged, setIsLogged] = useState(true);
  // const [isLogged, setIsLogged] = useState(false);

  //On mount effects
  React.useEffect(() => {
    //retrieve currentUser
    api.getUserMe()
      .then(setCurrentUser)
      .catch(err => api.handleError(err, setApiErrorMessage));
  }, [])

  //on CurrentUser changes retrieves initial cards
  React.useEffect(() => {
    api
      .getInitialCards()
      .then(setCards)
      .catch(err => api.handleError(err, setApiErrorMessage));
  }, [currentUser]);

  //handlers
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);

    setSelectedCard(null);
    setSelecetdCardToDelete(null);
  }

  function closeNotificationPopup() {
    setApiErrorMessage(null);
  }

  function handleUpdateUser(newInfo, submitButtonOnUpdate) {
    submitButtonOnUpdate(true);

    api.pathchUserMe(newInfo)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(err => api.handleError(err, setApiErrorMessage))
      .finally(() => {
        submitButtonOnUpdate(false);
      });
  }

  function handleUpdateAvatar(link, submitButtonOnUpdate) {
    submitButtonOnUpdate(true);
    api.patchUserAvatar(link)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => api.handleError(err, setApiErrorMessage))
      .finally(() => {
        submitButtonOnUpdate(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const likePromise = isLiked ? api.deleteLike(card._id) : api.putLike(card._id);

    likePromise
      .then(newCard => setCards(cards => cards.map(c => c._id === card._id ? newCard : c)))
      .catch(err => api.handleError(err, setApiErrorMessage))
  }

  function handleCardDelete(card) {
    setSelecetdCardToDelete(card);
  }

  function handleConfirmCardDelete(cardToDelete, handleSubmitButtonOnApiUpdate) {
    handleSubmitButtonOnApiUpdate(true);
    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch(err => api.handleError(err, setApiErrorMessage))
      .finally(() => {
        handleSubmitButtonOnApiUpdate(false);
      });
  }

  function handleAddCard(newCard, submitButtonOnUpdate) {
    submitButtonOnUpdate(true);
    api.postCard(newCard)
      .then(addedCard => {
        setCards([addedCard, ...cards])
        closeAllPopups();
      })
      .catch(err => api.handleError(err, setApiErrorMessage))
      .finally(() => {
        submitButtonOnUpdate(false);
      });
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="root">

        <Header />

        <Switch>
          <Route exact path={'/'}>
            {isLogged ?
              (<>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  handleCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </>)
              : <Redirect to={'/sign-in'} />}
          </Route>

          <Route path={'/sign-up'}>
            <p>Sign up / Register</p>
          </Route>

          <Route path={'/sign-in'}>
            <p>Sign in / Login</p>
          </Route>

          <Route path={'*'}>
            <p>404 Resource not found</p>
          </Route>

        </Switch>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />

        <DeleteConfirmationPopup onClose={closeAllPopups} callbackObject={selecetdCardToDelete} onSubmit={handleConfirmCardDelete} />

        <ImagePopup card={selectedCard} name="viewplace" handleClose={closeAllPopups} />

        {/* Popup with notification, shows API errors */}
        <PopupWithNotification onClose={closeNotificationPopup} message={apiErrorMessage} title="Ошибка в работе API" />

      </div>
    </currentUserContext.Provider>
  );
}

export default App;
