import libVal from '../../../SAPAssetManager/Rules/Common/Library/ValidationLibrary';
//import OffsetODataDate from '../../../SAPAssetManager/Rules/Common/Library/ValidationLibrary';
import OffsetODataDate from '../../../SAPAssetManager/Rules/Common/Date/OffsetODataDate';

export default function RequestedStartDate(context) {
    var binding = context.binding;
    var value = '';
    if (libVal.evalIsEmpty(binding.RequestStartDate)) {
        return context.localizeText('no_due_date');
    }

    let odataDate = new OffsetODataDate(context,binding.RequestStartDate);
    value = context.formatDate(odataDate.date());
    return value;
}
