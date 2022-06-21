import ODataDate from '../../../../../SAPAssetManager/Rules/Common/Date/ODataDate';

import GetEndDateTime from '../../../../../SAPAssetManager/Rules/Confirmations/CreateUpdate/OnCommit/GetEndDateTime';

// Enel Customization
// date/time W/O conversion to DB date/time

export default function GetEndTimeWoConversion(context) {
    let endDateTime = GetEndDateTime(context);
    let odataDate = new ODataDate(endDateTime);
    //return odataDate.toDBTimeString(context);
    return odataDate.toLocalTimeString(context);
}
