import ODataDate from '../../../../SAPAssetManager/Rules/Common/Date/ODataDate';
import libCom from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function GetRequiredStartDate(context) {
    let breakdown = libCom.getControlProxy(context, 'BreakdownSwitch').getValue();
    let start = null;
    if (breakdown) {
        let RequiredStartDate = libCom.getControlProxy(context, 'RequiredStartDatePicker').getValue();
        start = libCom.getControlProxy(context, 'RequiredStartTimePicker').getValue();

        start.setFullYear(RequiredStartDate.getFullYear());
        start.setMonth(RequiredStartDate.getMonth());
        start.setDate(RequiredStartDate.getDate());
        let date = new Date(start);
        let odataDate = new ODataDate(date);
        start = odataDate.toLocalDateString(context); //odataDate.toDBDateString(context);
    }
    return start;
}
