import common from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import notifLib from '../../Notifications/NotificationLibrary';

export default function NotificationCreateUpdatePickerItems(context) {
    let controlName = context.getName();
    // Based on the control we are on, return the right list items accordingly
    switch (controlName) {
        case 'FunctionalLocationLstPkr':
            {
                let formCellContainer = context.getPageProxy().getControl('FormCellContainer');

                let funcLocControlValue = context.getValue();
                let equipmentControl = formCellContainer.getControl('EquipmentLstPkr');

                let codingGroupControl = formCellContainer.getControl('CodingGroupLstPkr');
                let codingGroupCtrlSpecifier = codingGroupControl.getTargetSpecifier();

                let equipmentCtrlSpecifier = equipmentControl.getTargetSpecifier();

                equipmentControl.setValue('');
                if (funcLocControlValue && common.getListPickerValue(funcLocControlValue) !== '') {
                    common.setEditable(equipmentControl, true);
                    equipmentCtrlSpecifier.setQueryOptions("$filter=FuncLocIdIntern eq '" + common.getListPickerValue(funcLocControlValue) + "'&$orderby=EquipId");

                    //Set Coding Group
                    context.getPageProxy().binding.HeaderFunctionLocation = common.getListPickerValue(funcLocControlValue);
                    let prom = notifLib.getCodingGroupQuery(context);
                    prom.then(function (codingGroupQuery) {
                        codingGroupCtrlSpecifier.setQueryOptions(codingGroupQuery);
                        codingGroupControl.setTargetSpecifier(codingGroupCtrlSpecifier);
                    })

                    //Set Damage
                    let damageGrpControl = formCellContainer.getControl('DamageGroupLstPkr');
                    if (damageGrpControl) {
                        let damageGrpCtrlSpecifier = damageGrpControl.getTargetSpecifier();
                        prom = notifLib.NotificationDamNCausQuery(context, 'CatTypeDefects');
                        prom.then(function (damageGrpQuery) {
                            damageGrpCtrlSpecifier.setQueryOptions(damageGrpQuery);
                            damageGrpControl.setTargetSpecifier(damageGrpCtrlSpecifier);
                        })
                    }

                    //Set Cause
                    let causeGrpControl = formCellContainer.getControl('CauseGroupLstPkr');
                    if (causeGrpControl) {
                        let causeGrpCtrlSpecifier = causeGrpControl.getTargetSpecifier();
                        prom = notifLib.NotificationDamNCausQuery(context, 'CatTypeCauses');
                        prom.then(function (causeGrpQuery) {
                            causeGrpCtrlSpecifier.setQueryOptions(causeGrpQuery);
                            causeGrpControl.setTargetSpecifier(causeGrpCtrlSpecifier);
                        })
                    }
                } else {
                    equipmentCtrlSpecifier.setQueryOptions('');
                }
                equipmentControl.setTargetSpecifier(equipmentCtrlSpecifier);
                break;
            }
        case 'EquipmentLstPkr':
            {
                let formCellContainer = context.getPageProxy().getControl('FormCellContainer');
                let funcLocControl = formCellContainer.getControl('FunctionalLocationLstPkr');
                let funcLocCtrlSpecifier = funcLocControl.getTargetSpecifier();
                let equipmentControlValue = context.getValue();

                if (equipmentControlValue && common.getListPickerValue(equipmentControlValue) !== '') {
                    context.getPageProxy().binding.HeaderEquipment = common.getListPickerValue(equipmentControlValue);
                    let prom = notifLib.getCodingGroupQuery(context);
                    prom.then(function (codingGroupQuery) {
                        codingGroupCtrlSpecifier.setQueryOptions(codingGroupQuery);
                        codingGroupControl.setTargetSpecifier(codingGroupCtrlSpecifier, true);
                    })

                }

                if (equipmentControlValue && common.getListPickerValue(equipmentControlValue) !== '') {
                    return context.read('/SAPAssetManager/Services/AssetManager.service', 'MyEquipments', ['FuncLocId', 'FuncLocIdIntern'], `$filter=EquipId eq '${common.getListPickerValue(equipmentControlValue)}'&$expand=FunctionalLocation&$orderby=EquipId`)
                        .then(results => {
                            if (results.length > 0 && results.getItem(0).FuncLocIdIntern) {
                                funcLocControl.setValue(results.getItem(0).FuncLocIdIntern, true);
                            }
                            funcLocControl.setTargetSpecifier(funcLocCtrlSpecifier);
                        });
                }
                break;
            }
        default:
            break;
    }
}