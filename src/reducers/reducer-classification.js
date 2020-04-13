import _ from 'lodash'

import {
    customerList,
    customerData,
    documentTypes
} from "../mockdata/mockData";

import * as appConstants from '../constants/appConstants';
import {Utils} from '../utils/utils';

export default {
    fetchCustomerList: function () {
        //implement server call here fro customer list
        return customerList;
    },

    fetchCustomerData: function () {
        //implement server call here fro customer data
        return customerData;
    },

    fetchDocumentTypes: function () {
        //implement server call here fro customer data
        return documentTypes;
    },

    handleClassificationDropDownOnBlur: function (state, dropdownType, selectedItems) {
        let oRet = {...state}
        if (dropdownType === appConstants.dropdownTypes.CUSTOMER_NAMES) {
            Object.assign(oRet, {selectedCustomers: selectedItems});
        } else {
            Object.assign(oRet, {selectedDocuments: selectedItems});
        }
        return oRet;
    },

    handleClassificationCreateButtonCLicked: function (state) {
        let customerData = this.fetchCustomerData();
        let selectedDocuments = state.selectedDocuments;
        let selectedCustomers = state.selectedCustomers;


        let oHeaderData = [];
        oHeaderData.push({label: "Document Types"});
        for (let customer of selectedCustomers) {
            oHeaderData.push({label: customer});
        }

        let aBodyData = [];
        for (let doc of selectedDocuments) {
            let values = {}
            values["Document Types"] = doc

            for (let customer of selectedCustomers) {
                values[customer] = customerData[customer][doc]
            }
            let temp = {};
            temp["documentName"] = doc;
            temp["rowData"] = values
            aBodyData.push(temp);
        }


        let oTableData = {
            headerData: oHeaderData,
            bodyData: aBodyData
        }

        return {
            ...state,
            customerData,
            classificationTableData: oTableData
        }
    },


    handleTableCellDataChanged: function (state, customerName, docName, newVal) {

        //update database
        let customerDataCloned = Utils.getDirtyData(state.customerData);
        customerDataCloned[customerName][docName] = newVal;

        //update table data
        let tableDataCloned = Utils.getDirtyData(state.classificationTableData);
        let bodyData = tableDataCloned.bodyData
        let editedRowIndex = _.findIndex(bodyData, function (o) {
            return o.documentName === docName;
        });
        let editedRowData = bodyData[editedRowIndex].rowData;
        editedRowData[customerName] = newVal;

        return {
            ...state,
            customerDataCloned,
            classificationTableDataCloned: tableDataCloned
        }
    },

    handleTableSaveDiscardClicked: function (state, buttonType) {
        let oRet = {...state}

        if(buttonType === "save"){
            let customerData = state.customerDataCloned,
                classificationTableData = state.classificationTableDataCloned;
            Object.assign(oRet, {customerData, classificationTableData});

            //TODO: handle any server calls to update Database
        }

        Object.assign(oRet, {customerDataCloned:null, classificationTableDataCloned:null});
        return oRet;
    }

}