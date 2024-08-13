import {
  ADD_CHARGE_ACCOUNT,
  DELETE_BULK_CHARGE_ACCOUNTS,
  DELETE_CHARGE_ACCOUNT,
  EDIT_CHARGE_ACCOUNT,
  GET_CHARGE_ACCOUNTS,
  SET_CHARGE_ACCOUNT_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  chargeAccounts: [],
  currentChargeAccount: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CHARGE_ACCOUNTS: {
      return {
        ...state,
        chargeAccounts: action.payload,
      };
    }
    case SET_CHARGE_ACCOUNT_DETAILS: {
      return {
        ...state,
        currentChargeAccount: action.payload,
      };
    }
    case ADD_CHARGE_ACCOUNT: {
      return {
        ...state,
        chargeAccounts: [action.payload, ...state.chargeAccounts],
      };
    }
    case EDIT_CHARGE_ACCOUNT: {
      return {
        ...state,
        chargeAccounts: state.chargeAccounts.map(chargeAccount =>
          chargeAccount.code === action.payload.code ? action.payload : chargeAccount,
        ),
      };
    }
    case DELETE_CHARGE_ACCOUNT: {
      return {
        ...state,
        chargeAccounts: state.chargeAccounts.filter(chargeAccount => chargeAccount.code !== action.payload),
      };
    }
    case DELETE_BULK_CHARGE_ACCOUNTS: {
      return {
        ...state,
        chargeAccounts: state.chargeAccounts.filter(chargeAccount => !action.payload.includes(chargeAccount.code)),
      };
    }

    default:
      return state;
  }
};
