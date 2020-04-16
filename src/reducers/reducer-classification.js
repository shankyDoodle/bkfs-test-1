import _ from 'lodash'

import {
    documentTypes
} from "../mockdata/mockData";

import * as appConstants from '../constants/appConstants';
import {Utils} from '../utils/utils';

export default {
    setClassificationScreenOnLoadData: function(state, customerList, documentTypes){
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
                row.push(oRowData[header.id]);
            }
            aData.push(row);
        })

        return aData;
    },

    fetchSampleFiles: function(){
      //TODO: ideally fetch files from server
      // return documentTypes;
    },

    handleClassificationCreateButtonCLicked: function (state, customerData) {
        let selectedDocuments = state.selectedDocuments;
        let selectedCustomers = state.selectedCustomers;

        let oCustomerList = state.customerList;
        let oDocumentTypes = state.documentTypes;

        let aHeaderData = [];
        aHeaderData.push({id:"document_types", label: "Document Types"});
        for (let customer of selectedCustomers) {
            let label = oCustomerList[customer].label;
            aHeaderData.push({
                id: customer,
                label:label
            });
        }

        let aBodyData = [];
        for (let doc of selectedDocuments) {
            let sDocLabel = oDocumentTypes[doc].label;
            let values = {}
            values["document_types"] = sDocLabel;

            for (let customer of selectedCustomers) {
                values[customer] = customerData[customer][sDocLabel]
            }
            let temp = {};
            temp["documentId"] = doc;
            temp["documentName"] = sDocLabel;
            temp["rowData"] = values
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
            csvData: aCSVData,
            originalCSVData: aCSVData
        }
    },


    handleTableCellDataChanged: function (state, customerId, docId, newVal) {
        let oDocumentTypes = state.documentTypes;
        let docLabel = oDocumentTypes[docId].label;

        //update local database
        let customerDataCloned = Utils.getDirtyData(state.customerData);
        customerDataCloned[customerId][docLabel] = newVal;

        //update table data
        let tableDataCloned = Utils.getDirtyData(state.classificationTableData);
        let bodyData = tableDataCloned.bodyData
        let editedRowIndex = _.findIndex(bodyData, function (o) {
            return o.documentId === docId;
        });
        let editedRowData = bodyData[editedRowIndex].rowData;
        editedRowData[customerId] = newVal;

        let aCSVData = this.createCSVData(tableDataCloned);

        return {
            ...state,
            isScreenDirty:true,
            csvData: aCSVData
        }
    },

    handleTableSaveDiscardClicked: function (state, buttonType) {
        let oRet = {...state}

        Object.assign(oRet, {csvData:state.originalCSVData})
        Object.assign(oRet, {isScreenDirty:false})
        if(buttonType === "save"){
            let customerData = state.customerData.clonedObject;
            let classificationTableData = state.classificationTableData.clonedObject;

            delete state.customerData.clonedObject
            delete state.customerData.isDirty
            delete state.classificationTableData.clonedObject;
            delete state.classificationTableData.isDirty;
            Object.assign(oRet, {customerData, classificationTableData});
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