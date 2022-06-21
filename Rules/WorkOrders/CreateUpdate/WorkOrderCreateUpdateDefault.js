import libCommon from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import assnType from '../../../../SAPAssetManager/Rules/Common/Library/AssignmentType';
import {WorkOrderLibrary} from '../WorkOrderLibrary';

let onCreate, onFollowUp;

function getDefaultValue(controlName) {
    let controlDefs = assnType.getWorkOrderAssignmentDefaults();
    return controlDefs[controlName].default;
}

export default function WorkOrderCreateUpdateDefault(control) {
    let controlName = control.getName();
    let context = control.getPageProxy();
	onCreate = libCommon.IsOnCreate(context);
    onFollowUp = WorkOrderLibrary.getFollowUpFlag(context);
    let target;
	
    if (onCreate && !onFollowUp) {
        switch (controlName) {
            case 'MainWorkCenterLstPkr':
                target = libCommon.getStateVariable(context, 'WODefaultMainWorkCenter');
                if (target) {
                    return target;
                } else {
                    return getDefaultValue('MainWorkCenter');
                }
            case 'WorkCenterPlantLstPkr':
                target = libCommon.getStateVariable(context, 'WODefaultWorkCenterPlant');
                if (target) {
                    return target;
                } else {
                    return getDefaultValue('WorkCenterPlant');
                }
            case 'PlanningPlantLstPkr':
                target = libCommon.getStateVariable(context, 'WODefaultPlanningPlant');
                if (target) {
                    return target;
                } else {
                    return getDefaultValue('PlanningPlant');
                }
             case 'ZAddActivityCodeTypeLstPkr':
             	//Added as Enel customisation and defaulting to ORD from config panel parameters
             	return libCommon.getAppParam(context, 'WORKORDER', 'ZAdditionalActivityCode')
            default:
                return true;
        }
    } else {
        switch (controlName) {
            case 'MainWorkCenterLstPkr':
                return control.getPageProxy().binding.MainWorkCenter;
            case 'WorkCenterPlantLstPkr':
                return control.getPageProxy().binding.MainWorkCenterPlant;
            case 'PlanningPlantLstPkr':
                return control.getPageProxy().binding.PlanningPlant;
            case 'ZAddActivityCodeTypeLstPkr':
             	return control.getPageProxy().binding.ZAdditionalActivityCode;
            default:
                return '';
        }
    }
}
