import ODataDate from '../../../../SAPAssetManager/Rules/Common/Date/ODataDate';
import libCom from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function GetMalFunctionStartDate(context) {
    let breakdown = libCom.getControlProxy(context, 'BreakdownSwitch').getValue();
    let start = null;
    if (breakdown) {
        let startDate = libCom.getControlProxy(context, 'StartDatePicker').getValue();
        start = libCom.getControlProxy(context, 'StartTimePicker').getValue();

        start.setFullYear(startDate.getFullYear());
        start.setMonth(startDate.getMonth());
        start.setDate(startDate.getDate());
        //start.setHours(start.getHours() - (start.getTimezoneOffset() / 60));

        let date = new Date(start);
        let odataDate = new ODataDate(date);
        start = odataDate.toLocalDateString(context); //odataDate.toDBDateString(context);
    }
    return start;
}
