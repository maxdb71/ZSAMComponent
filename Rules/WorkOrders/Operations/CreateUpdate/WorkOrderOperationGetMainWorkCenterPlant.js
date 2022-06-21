import Logger from '../../../../../SAPAssetManager/Rules/Log/Logger';
import libCommon from '../../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default async function WorkOrderOperationGetMainWorkCenterPlant(context) {
    try {
        let isLocal = libCommon.getTargetPathValue(context, '#Property:@sap.isLocal');
        if (isLocal) {
            return [];
        }
        return context.read('/SAPAssetManager/Services/AssetManager.service', `MyWorkOrderHeaders`, ['MainWorkCenterPlant'], `$filter=` + 'OrderId' + ` eq '` + context.binding.OrderId + `'`)
        .then(function(result) {
            if (result && result.length > 0) {
                let item = result.getItem(0);
                if (item.MainWorkCenterPlant) {
                    return item.MainWorkCenterPlant;
                } else {
                    return [];
                }
            } else {
                return [];
            }
            }).catch(function() {
                return [];
            });
    } catch (err) {
        /**Implementing our Logger class*/
        Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryParts.global').getValue(),`PartLibrary.partCreateUpdateOnChange(PlantLstPkr) error: ${err}`);
    }
}