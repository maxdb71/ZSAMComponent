import Logger from '../../../../../SAPAssetManager/Rules/Log/Logger';
import libCommon from '../../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function WorkOrderOperationWorkCenterDefault(controlProxy) {
    try {
        //let onCreate = libCommon.IsOnCreate(controlProxy);
        if (controlProxy.getBindingObject().OrderId === undefined) {
            return '';
        }
        let functLocx = controlProxy.getBindingObject().HeaderFunctionLocation
        return controlProxy.read('/SAPAssetManager/Services/AssetManager.service', `MyFunctionalLocations('${functLocx}')`, ['MaintWorkCenter'], '')
        .then(function(result) {
            if (result && result.getItem(0)) {
                return controlProxy.read('/SAPAssetManager/Services/AssetManager.service', `WorkCenters(ObjectType='A',WorkCenterId='${result.getItem(0).MaintWorkCenter}')`, ['ExternalWorkCenterId'], '')
                .then(function(result2) {
                    if (result2 && result2.length > 0) {
                        return result2.getItem(0).ExternalWorkCenterId;
                    } else {
                        return '';                        
                    }
                }).catch(function(error) {
                    return '';
                });
            } else {
                return '';
            }
            }).catch(function(error) {
                return '';
            });
    } catch (err) {
        /**Implementing our Logger class*/
        Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryParts.global').getValue(),`WorkOrderOperationWorkCenterDefault error: ${err}`);
    }
}