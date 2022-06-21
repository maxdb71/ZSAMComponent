import ODataDate from '../../../../SAPAssetManager/Rules/Common/Date/ODataDate';
import libCom from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function GetRequiredEndDate(context) {
    let breakdown = libCom.getControlProxy(context, 'BreakdownSwitch').getValue();
    let end = null;
    if (breakdown) {
        let RequiredEndDate = libCom.getControlProxy(context, 'RequiredDatePicker').getValue();
        end = libCom.getControlProxy(context, 'RequiredTimePicker').getValue();

        end.setFullYear(RequiredEndDate.getFullYear());
        end.setMonth(RequiredEndDate.getMonth());
        end.setDate(RequiredEndDate.getDate());
        let date = new Date(end);
        let odataDate = new ODataDate(date);
        end = odataDate.toLocalDateString(context); //odataDate.toDBDateString(context);
    }
    return end;
}
