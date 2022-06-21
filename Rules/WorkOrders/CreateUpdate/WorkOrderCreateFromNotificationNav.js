import libCommon from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import assnType from '../../../../SAPAssetManager/Rules/Common/Library/AssignmentType';

export default function WorkOrderCreateFromNotificationNav(context) {
    //Set the global TransactionType variable to CREATE
    libCommon.setOnCreateUpdateFlag(context, 'CREATE');

    //set the CHANGSET flag to true
    libCommon.setOnChangesetFlag(context, true);
    libCommon.setOnWOChangesetFlag(context, true);
    libCommon.resetChangeSetActionCounter(context);

    libCommon.removeStateVariable(context, 'WODefaultPlanningPlant');
    libCommon.removeStateVariable(context, 'WODefaultWorkCenterPlant');
    libCommon.removeStateVariable(context, 'WODefaultMainWorkCenter');

    let binding = context.binding;
    let orderType;
    if (binding.NotificationType=='Z1')
    {
    	orderType='M5';
    }
    if (binding.NotificationType=='Z2')
    {
    	orderType='M4';
    }
    
    let actionBinding = {
        OrderDescription: binding.NotificationDescription,
        PlanningPlant: binding.PlanningPlant,
        OrderType: orderType,
        Priority: binding.Priority,
        HeaderFunctionLocation: binding.HeaderFunctionLocation,
        HeaderEquipment: binding.HeaderEquipment,
        BusinessArea: '',
        MainWorkCenterPlant: assnType.getWorkOrderFieldDefault('WorkOrderHeader', 'WorkCenterPlant'),
        MainWorkCenter: assnType.getWorkOrderFieldDefault('WorkOrderHeader', 'MainWorkCenter'),
        FromNotification: true,
        NotificationNumber: context.binding.NotificationNumber,
    };

    context.setActionBinding(actionBinding);
    return context.executeAction('/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderCreateChangeset.action');
}
