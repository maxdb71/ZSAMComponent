import GetStartDateTime from '../../../../../SAPAssetManager/Rules/Confirmations/CreateUpdate/OnCommit/GetStartDateTime';
import ODataDate from '../../../../../SAPAssetManager/Rules/Common/Date/ODataDate';

// Enel Customization
// date/time W/O conversion to DB date/time

export default function GetDateWoConversion(context) {
    let date = new Date(GetStartDateTime(context));
    let odataDate = new ODataDate(date);
    //return odataDate.toDBDateString(context);
    return odataDate.toLocalDateString(context);
}