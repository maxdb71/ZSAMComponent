import libCommon from '../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import Logger from '../../../SAPAssetManager/Rules/Log/Logger';

export default function BatchOnValueChange(context) {
	
    let serialNumListPicker = context.getPageProxy().evaluateTargetPathForAPI('#Control:SerialNumLstPkr');
    let serialNumLstPkrSpecifier = serialNumListPicker.getTargetSpecifier();
    let entitySet = context.binding['@odata.readLink']+ '/Material/SerialNumbers';
    serialNumLstPkrSpecifier.setEntitySet(entitySet);
    serialNumLstPkrSpecifier.setService('/SAPAssetManager/Services/AssetManager.service');
    serialNumLstPkrSpecifier.setReturnValue('{SerialNumber}');
    serialNumLstPkrSpecifier.setObjectCell({
        'Title': '{SerialNumber}',
    });
    let storageLocationSelected="";
    let batchSelected="";
    let storageLocationSelectedObj = libCommon.getTargetPathValue(context.getPageProxy(), '#Page:PartIssueCreateUpdatePage/#Control:StorageLocationLstPkr/#Value');
    if(storageLocationSelectedObj){
    	storageLocationSelected=storageLocationSelectedObj[0].ReturnValue;
    Logger.error("Poonam sloc", storageLocationSelected);
    }
    
    let batchSelectedObj = libCommon.getTargetPathValue(context.getPageProxy(), '#Page:PartIssueCreateUpdatePage/#Control:BatchNumLstPkr/#Value');
    if (batchSelectedObj.length>0){
    	batchSelected=batchSelectedObj[0].ReturnValue;
    Logger.error("Poonam batch", batchSelected);
    }
    let queryOptions = "$expand=Material&$orderby=SerialNumber&$filter=Issued eq ''";
    if (storageLocationSelected){
     queryOptions = queryOptions + " and StorageLocation eq '" + storageLocationSelected +"'";
    }
	//context.getValue()[0].ReturnValue
    if (batchSelected) {
        queryOptions = queryOptions + " and BatchNumber eq '" + batchSelected + "'";
    }
	serialNumLstPkrSpecifier.setQueryOptions(queryOptions);
    Logger.error("Poonam q2", queryOptions);
     
    return serialNumListPicker.setTargetSpecifier(serialNumLstPkrSpecifier);
 }
