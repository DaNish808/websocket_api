import { POST_ALL } from '../constants';

export function postAll(text) {

  return (dispatch, getState) => {

    console.log(text);

    dispatch({
      type: POST_ALL,
      payload: {
        user: getState().me.username,
        text,
        timestamp: new Date()
      }
    });
  };
}