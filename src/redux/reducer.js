import { CHANGE_IS_DROPSHIP, CHANGE_STEP, RESET_STATE, SAVE_FORM_DATA, SELECT_PAYMENT, SELECT_SHIPMENT } from "./constan";

let initialState = {
  step: 1,
  dataCart: [],
  dataForm: {
    email: '',
    phone: '',
    address: '',
    dropshipper_name: '',
    dropshipper_phone: '',
  },
  isDropShip: false,
  shippingFee: 0,
  shipments: [
    { id: 1, name: 'GO-SEND', days: 'today', price: 15000, selected: false },
    { id: 2, name: 'JNE', days: '2 days', price: 9000, selected: false },
    { id: 3, name: 'Personal Courier', days: '1 day', price: 29000, selected: false },
  ],
  payments: [
    { id: 1, name: 'e-Wallet', balance: 1500000, selected: false },
    { id: 2, name: 'Bank Transfer', balance: null, selected: false },
    { id: 3, name: 'Virtual Account', balance: null, selected: false },
  ]
}

export const allData = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FORM_DATA:
      return {
        ...state,
        dataForm: {
          ...state.dataForm,
          email: action.payload.email,
          phone: action.payload.phone,
          address: action.payload.address,
          dropshipper_name: action.payload.dropshipper_name,
          dropshipper_phone: action.payload.dropshipper_phone,
        }
      }

    case RESET_STATE:
      return {
        step: 1,
        dataCart: [],
        dataForm: {
          ...state.dataForm,
          email: '',
          phone: '',
          address: '',
          dropshipper_name: '',
          dropshipper_phone: '',
        },
        isDropShip: false,
        shippingFee: 0,
        shipments: [
          { id: 1, name: 'GO-SEND', days: 'today', price: 15000, selected: false },
          { id: 2, name: 'JNE', days: '2 days', price: 9000, selected: false },
          { id: 3, name: 'Personal Courier', days: '1 day', price: 29000, selected: false },
        ],
        payments: [
          { id: 1, name: 'e-Wallet', balance: 1500000, selected: false },
          { id: 2, name: 'Bank Transfer', balance: null, selected: false },
          { id: 3, name: 'Virtual Account', balance: null, selected: false },
        ]
      }

    case CHANGE_STEP:
      return {
        ...state,
        step: action.payload
      }

    case CHANGE_IS_DROPSHIP:
      return {
        ...state,
        isDropShip: action.payload
      }

    case SELECT_SHIPMENT:
      const updatedShipments = state.shipments.map((shipment) =>
        shipment.id === action.payload.id
          ? { ...shipment, selected: true }
          : { ...shipment, selected: false }
      );
      return { 
        ...state, 
        shipments: updatedShipments,
        shippingFee: action.payload.price
      };

    case SELECT_PAYMENT:
      const updatedPayments = state.payments.map((payment) =>
        payment.id === action.payload.id
          ? { ...payment, selected: true }
          : { ...payment, selected: false }
      );
      return { 
        ...state,
        payments: updatedPayments 
      };
    
    default:
      return state
  }
}