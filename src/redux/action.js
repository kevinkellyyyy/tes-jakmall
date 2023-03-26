import { CHANGE_IS_DROPSHIP, CHANGE_STEP, RESET_STATE, SAVE_FORM_DATA, SELECT_PAYMENT, SELECT_SHIPMENT } from "./constan";

export const resetState = () => {
  return {
    type: RESET_STATE
  }
}

export const changeStep = (data) => {
  return {
    type: CHANGE_STEP,
    payload: data
  }
}

export const setIsDropship = (data) => {
  return {
    type: CHANGE_IS_DROPSHIP,
    payload: data
  }
}

export const saveData = (data) => {
  return async (dispatch) => {
    dispatch({ 
      type: SAVE_FORM_DATA,
      payload: data
    });

    await Promise.resolve();
    dispatch({ 
      type: CHANGE_STEP,
      payload: 2 
    });
  };
};

export const selectShipment = (data) => {
  return {
    type: SELECT_SHIPMENT,
    payload: data
  }
}

export const selectPayment = (data) => {
  return {
    type: SELECT_PAYMENT,
    payload: data
  }
}

export const resetBackToStep1 = (data) => {
  return async (dispatch) => {
    dispatch(resetState());

    await Promise.resolve();
    dispatch(changeStep(1));
  };
};