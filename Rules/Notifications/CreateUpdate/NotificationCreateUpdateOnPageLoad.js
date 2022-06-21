import style from '../../../../SAPAssetManager/Rules/Common/Style/StyleFormCellButton';
import hideCancel from '../../../../SAPAssetManager/Rules/ErrorArchive/HideCancelForErrorArchiveFix';
import common from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import Stylizer from '../../../../SAPAssetManager/Rules/Common/Style/Stylizer';

export default function NotificationCreateUpdateOnPageLoad(context) {
    hideCancel(context);
    if (!context.getClientData().LOADED) {
        var caption;
        var onCreate = common.IsOnCreate(context);
        var container = context.getControls()[0];
        var binding = context.binding;

        if (onCreate) {
            caption = context.localizeText('add_notification');
        } else {
            if (!common.isCurrentReadLinkLocal(binding['@odata.readLink'])) {
                common.setEditable(container.getControl('TypeLstPkr'), false);
            }
            caption = context.localizeText('edit_notification');
            let formCellContainer = context.getControl('FormCellContainer');
            let stylizer = new Stylizer(['GrayText']);
            let typePkr = formCellContainer.getControl('TypeLstPkr');
            let flocPkr = formCellContainer.getControl('FunctionalLocationLstPkr');
            let equipPkr = formCellContainer.getControl('EquipmentLstPkr');
            stylizer.apply(typePkr, 'Value');
            stylizer.apply(flocPkr, 'Value');
            stylizer.apply(equipPkr, 'Value');
            
            //Malfunction Start/time
            let startDate = formCellContainer.getControl('StartDatePicker'); //Malfunct start date
            let startTime = formCellContainer.getControl('StartTimePicker'); //Malfunct start time
            let endDate = formCellContainer.getControl('EndDatePicker'); //Malfunct end date
            let endTime = formCellContainer.getControl('EndTimePicker'); //Malfunct end time

            //Start/End date&time
            let requiredStartDate = formCellContainer.getControl('RequiredStartDatePicker');  // Required Start Date
            let requiredStartTime = formCellContainer.getControl('RequiredStartTimePicker'); // Required Start time
            let requiredDate = formCellContainer.getControl('RequiredDatePicker'); // Required End Date
            let requiredTime = formCellContainer.getControl('RequiredTimePicker'); // Required End Time

            let breakdown = formCellContainer.getControl('BreakdownSwitch').getValue(); 

            if (breakdown) {
                startDate.setVisible(true);
                startTime.setVisible(true);
                requiredDate.setVisible(true);
                requiredTime.setVisible(true);
                endDate.setVisible(true);
                endTime.setVisible(true);
                requiredStartDate.setVisible(true);
                requiredStartTime.setVisible(true);
            }
        }
        context.setCaption(caption);
        
       // if (this.getAddFromJobFlag(context)) {
       //     common.setEditable(container.getControl('EquipmentLstPkr'), true);
       //     common.setEditable(container.getControl('FunctionalLocationLstPkr'), true);

        //}
    } else {

        /* Set enabled/disabled on cascading list pickers */

        /*
            Equipment (depends on Functional Location)
            Ensure Functional Location is chosen
            If not, disable Equipment List Picker
        */
        if (container.getControl('FunctionalLocationLstPkr').getValue()[0] !== undefined) {
            common.setEditable(container.getControl('EquipmentLstPkr'), true);
        } else {
            common.setEditable(container.getControl('EquipmentLstPkr'), false);
        }

        /*
            Work Center Plant and Main Work Center
            Must be left open if on Assignment Type 1
            Must be defaulted and disabled if on Assignment Type 8
        */
        switch (common.getNotificationAssignmentType(context)) {
            case '1':
                break;
            case '5':
                // Set Value
                container.getControl('WorkCenterPlantLstPkr').setValue(common.getNotificationPlanningPlant(context));
                // Disable Picker
                common.setEditable(container.getControl('WorkCenterPlantLstPkr'), false);

                // Set Value
                container.getControl('MainWorkCenterLstPkr').setValue(common.getUserDefaultWorkCenter());
                // Disable Picker
                common.setEditable(container.getControl('MainWorkCenterLstPkr'), false);
                break;
            default:
                break;
        }
        context.getClientData().LOADED = true;
    }
    style(context, 'DiscardButton');
}
