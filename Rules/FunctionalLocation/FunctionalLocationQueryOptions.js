export default function FunctionalLocationQueryOptions(context) {
    let binding = context.getPageProxy().binding;
    if (binding) {
        let odataType = binding['@odata.type'];
        switch (odataType) {
            case '#sap_mobile.MyWorkOrderHeader':
                return "$expand=WorkCenter_Nav&$filter=(WorkOrderHeader/any( wo: wo/OrderId eq '{{#Property:OrderId}}' ) or WorkOrderOperation/WOHeader/any(wo: wo/OrderId eq '{{#Property:OrderId}}' ) or WorkOrderSubOperation/WorkOrderOperation/WOHeader/any( wo: wo/OrderId eq '{{#Property:OrderId}}'))&$expand=WorkOrderHeader";
            //case '#sap_mobile.MyNotificationHeader':
            //    let queryOpt = "$filter=FuncLocIdIntern eq '" + binding.HeaderFunctionLocation + "'";
            //    return queryOpt;
            default:
                return '';
        }
    } else {
        let qob = context.dataQueryBuilder();
        let searchString = context.searchString;
        qob.expand('WorkCenter_Nav').orderBy('FuncLocIdIntern');
        if (searchString) {
            let filters = [
                `substringof('${searchString.toLowerCase()}', tolower(FuncLocDesc))`,
                `substringof('${searchString.toLowerCase()}', tolower(WorkCenter_Nav/PlantId))`,
                `substringof('${searchString.toLowerCase()}', tolower(FuncLocIdIntern))`,
                `substringof('${searchString.toLowerCase()}', tolower(WorkCenter_Nav/WorkCenterName))`,
                `substringof('${searchString.toLowerCase()}', tolower(FuncLocId))`,
            ];
            qob.filter(filters.join(' or '));
        }
        return qob;
    }
}
