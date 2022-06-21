import IsPhaseModelEnabled from '../../../../SAPAssetManager/Rules/Common/IsPhaseModelEnabled';
import common from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import libNotif from '../NotificationLibrary';

export default function NotificationLinks(context) {
    const notificationType = libNotif.NotificationCreateUpdateTypeLstPkrValue(context);
    
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'NotificationTypes', [], `$filter=NotifType eq '${notificationType}'`).then(function(data) {
        const priorityType = data.getItem(0).PriorityType;

        return createNotificationLinks(context, priorityType);
    });
}

function createNotificationLinks(context, priorityType) {
    var links = [{
        'Property': 'NotifPriority',
        'Target':
        {
            'EntitySet': 'Priorities',
            'ReadLink': `Priorities(PriorityType='${priorityType}',Priority='${context.evaluateTargetPath('#Control:PrioritySeg/#Value/#First/#Property:ReturnValue')}')`,
        },
    }];
    var flocValue = context.evaluateTargetPath('#Page:NotificationAddPage/#Control:FunctionalLocationLstPkr').getValue();
    var equipmentValue = context.evaluateTargetPath('#Page:NotificationAddPage/#Control:EquipmentLstPkr').getValue();
    if (flocValue.length > 0) {
        let myFL = flocValue[0].ReturnValue;
        flocValue = myFL.replace("?", "%3F");
    } else {
        flocValue = null;
    }

    if (equipmentValue.length > 0) {
        let myEQ = equipmentValue[0].ReturnValue;
        equipmentValue = myEQ.replace("?", "%3F");
    } else {
        equipmentValue = null;
    }

    if (flocValue) {
        links.push({
            'Property': 'FunctionalLocation',
            'Target':
            {
                'EntitySet': 'MyFunctionalLocations',
                'ReadLink': `MyFunctionalLocations('${flocValue}')`,
            },
        });
    }

    if (equipmentValue) {
        links.push({
            'Property': 'Equipment',
            'Target':
            {
                'EntitySet': 'MyEquipments',
                'ReadLink': `MyEquipments('${equipmentValue}')`,
            },
        });
    }

    //Create the InspectionLot nav link
    if (context.binding && context.binding['@odata.type'] === '#sap_mobile.InspectionCharacteristic') {
        links.push({
            'Property': 'InspectionLot_Nav',
            'Target': {
                'EntitySet': 'InspectionLots',
                'ReadLink': `InspectionLots('${context.binding.InspectionLot}')`,
            },
        });
    }

    if (IsPhaseModelEnabled(context)) {
        let effectValue = common.getListPickerValue(common.getTargetPathValue(context, '#Control:EffectListPicker/#Value'));
        if (effectValue) {
            links.push({
                'Property': 'Effect_Nav',
                'Target':
                {
                    'EntitySet': 'Effects',
                    'ReadLink': `Effects('${effectValue}')`,
                },
            });
        }

        let detectionGroup = common.getListPickerValue(common.getTargetPathValue(context, '#Control:DetectionGroupListPicker/#Value'));
        if (detectionGroup) {
            links.push({
                'Property': 'DetectionGroup_Nav',
                'Target':
                {
                    'EntitySet': 'DetectionGroups',
                    'ReadLink': `${detectionGroup}`,
                },
            });
        }

        let detectionMethod = common.getListPickerValue(common.getTargetPathValue(context, '#Control:DetectionMethodListPicker/#Value'));
        if (detectionMethod) {
            links.push({
                'Property': 'DetectionCode_Nav',
                'Target':
                {
                    'EntitySet': 'DetectionCodes',
                    'ReadLink': `${detectionMethod}`,
                },
            });
        }
    }

    let woKey;
    if (context.binding['@odata.type'] === '#sap_mobile.MyWorkOrderHeader' || libNotif.getAddFromJobFlag(context)) {
        woKey = context.binding.OrderId;
        return context.read('/SAPAssetManager/Services/AssetManager.service', "MyWorkOrderHeaders('" + woKey + "')", ['OrderId','Notification/NotificationNumber'], '$expand=Notification').then(function(order) {
            if (order && order.length > 0) {
                let wo = order.getItem(0);
                if (!wo.Notification) { //If order does not already have a notification link, tie this notif to it
                    links.push({
                        'Property': 'WOHeader_Nav',
                        'Target':
                        {
                            'EntitySet': 'MyWorkOrderHeaders',
                            'ReadLink': `MyWorkOrderHeaders('${woKey}')`,
                        },
                    });
                }
            }
            return links;
        });
    }

    return links;
}
