import { configureStore } from "@reduxjs/toolkit";
import constant from "../Utils/constant";

const initialHomeState = {
  mode: "table",
  pageNo: 1,
  totalPages: 0,
  userData: [],
  modalAction: {
    visible: false,
    action: "",
    data: {}
  },
  formData: {
    first_name: "",
    last_name: "",
    email: "",
    profile_img_link: "",
  },
};

function homeReducer(state = initialHomeState, action) {
  switch (action.type) {
    case constant.MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case constant.USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case constant.MODAL_ACTION:
      return {
        ...state,
        modalAction: {
          visible: action.payload.visible,
          action: action.payload.action,
          data: action.payload?.data ?? {}
        },
      };
    case constant.FORMDATA:
      return {
        ...state,
        formData:{
            ...state.formData,
            ...action.payload,
        }
      }
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});
