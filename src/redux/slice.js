import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  userProfile: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
  },
  contactInfo: {
    phoneNumber: "",
    altPhone: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "",
  },
  employmentInfo: {
    jobTitle: "",
    employmentStatus: "",
    companyName: "",
    experience: "",
    resume: "",
  },
  financialInfo: {
    income: "",
    loanStatus: "",
    loanAmount: "",
    creditScore: "",
  },
  preferences: {
    contactMode: "",
    hobbies: [],
    newsletter: false,
  },
  // formData: {
  //   // name: "",
  //   // email: "",
  //   // password: "",
  //   // confirmPassword: "",
  //   // gender: "",
  //   // dob: "",
  //   // phoneNumber: "",
  //   // altPhone: "",
  //   // address1: "",
  //   // address2: "",
  //   // city: "",
  //   // postalCode: "",
  //   // country: "",
  //   // jobTitle: "",
  //   // employmentStatus: "",
  //   // companyName: "",
  //   // experience: "",
  //   // resume: null,
  //   // income: "",
  //   // loanStatus: "",
  //   // loanAmount: "",
  //   // creditScore: "",
  //   contactMode: "",
  //   hobbies: [],
  //   newsletter: false,
  // },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    jumpToStep: (state,action) => {
      state.step=action.payload;
    },
    updateFormData: (state, action) => {
      const { stateName, data } = action.payload;
      if (state[stateName]) {
        state[stateName] = { ...state[stateName], ...data };
      }
      // state.formData = { ...state.formData, ...action.payload };
    },
    resetForm: (state) => {
      state.step = 1;
      state.userProfile = initialState.userProfile;
      state.contactInfo = initialState.contactInfo;
      state.employmentInfo = initialState.employmentInfo;
      state.financialInfo = initialState.financialInfo;
      state.preferences = initialState.preferences;
    },
  },
});

export const { nextStep, prevStep, updateFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
