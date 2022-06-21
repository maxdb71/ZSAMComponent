import ODataDate from '../../../../SAPAssetManager/Rules/Common/Date/ODataDate';
import libCom from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function GetMalFunctionEndDate(context) {
    let breakdown = libCom.getControlProxy(context, 'BreakdownSwitch').getValue();
    let end = null;
    if (breakdown) {
        let endDate = libCom.getControlProxy(context, 'EndDatePicker').getValue();
        end = libCom.getControlProxy(context, 'EndTimePicker').getValue();

        end.setFullYear(endDate.getFullYear());
        end.setMonth(endDate.getMonth());
        end.setDate(endDate.getDate());
        let date = new Date(end);
        let odataDate = new ODataDate(date);
        end = odataDate.toLocalDateString(context); //odataDate.toDBDateString(context);
    }
    return end;
}
