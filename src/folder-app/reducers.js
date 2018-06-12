import { combineReducers } from 'redux';

import { api } from '../endpoints/api';

const UPDATE = 'IMAGES::UPDATE';

const update = images => ({
  type: UPDATE,
  payload: images
});

const images = (state = [], action) => {
  switch (action.type) {
    case UPDATE:
      return [
        ...state,
        ...action['payload']
      ];
    default:
      return state;
  }
};

const folderAppReducer = combineReducers({
  images
});

export const updateImages = dispath =>
  api.get('https://api.imgur.com/3/account/me/images')
    .then(images => dispath(update(images)));

export default folderAppReducer;