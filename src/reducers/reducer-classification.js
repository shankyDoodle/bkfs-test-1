import _ from 'lodash'

import {
    customerList,
    customerData,
    documentTypes
} from "../mockdata/mockData";

import * as appConstants from '../constants/appConstants';
import {Utils} from '../utils/utils';

export default {
    fetchCustomerData: function () {
        //implement server call here fro customer data
        return customerData;
    },

    switchToClassificationScreen: function(state, customerList, documentTypes){
        return {
            ...state,
            customerList,
            documentTypes
        }
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

    createCSVData: function(oTableData){
        let aData = [];

        let aHeaderData = oTableData.headerData;
        let aHeaderDataRow = [];
        for (let header of aHeaderData) {
            aHeaderDataRow.push(header.label);
        }
        aData.push(aHeaderDataRow);


        let aBodyData = oTableData.bodyData;
        _.forEach(aBodyData, function (oData) {
            let oRowData = oData.rowData;
            let row = [];
            for (let header of aHeaderData) {
                row.push(oRowData[header.label]);
            }
            aData.push(row);
        })

        return aData;
    },

    fetchSampleFiles: function(){
      //TODO: ideally fetch files from server
      return documentTypes;
    },

    handleClassificationCreateButtonCLicked: function (state) {
        let customerData = this.fetchCustomerData();
        let oSampleFiles = this.fetchSampleFiles();

        let selectedDocuments = state.selectedDocuments;
        let selectedCustomers = state.selectedCustomers;

        let sFilePrefix = "./pdfs/";

        let aHeaderData = [];
        aHeaderData.push({label: "Document Types"});
        for (let customer of selectedCustomers) {
            aHeaderData.push({label: customer});
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
            temp["file"] = sFilePrefix + oSampleFiles[doc];
            aBodyData.push(temp);
        }


        let oTableData = {
            headerData: aHeaderData,
            bodyData: aBodyData
        }

        let aCSVData = this.createCSVData(oTableData);

        return {
            ...state,
            customerData,
            classificationTableData: oTableData,
            csvData: aCSVData
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

        let aCSVData = this.createCSVData(tableDataCloned);

        return {
            ...state,
            isScreenDirty:true,
            csvData: aCSVData
        }
    },

    handleTableSaveDiscardClicked: function (state, buttonType) {
        let oRet = {...state}

        Object.assign(oRet, {isScreenDirty:false})
        if(buttonType === "save"){
            let customerData = state.customerData.clonedObject;
            let classificationTableData = state.classificationTableData.clonedObject;

            delete state.customerData.clonedObject
            delete state.customerData.isDirty
            delete state.classificationTableData.clonedObject;
            delete state.classificationTableData.isDirty;
            Object.assign(oRet, {customerData, classificationTableData});

            //TODO: handle any server calls to update Database
        }else {
            let customerData = state.customerData;
            let classificationTableData = state.classificationTableData;
            Object.assign(oRet, {customerData, classificationTableData});
        }

        delete state.customerData.clonedObject
        delete state.customerData.isDirty
        delete state.classificationTableData.clonedObject;
        delete state.classificationTableData.isDirty;

        return oRet;
    }

}