

export default function getInitialState() {
  let sCurrentScreen = "HOME";
  let oCustomerList = {};
  let oCustomerData = {};

  return {
    currentScreen:sCurrentScreen,
    customerList: oCustomerList,
    customerData: oCustomerData,
  }
}