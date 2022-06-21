
var clientAPI;

/**
 * Return the filter for UOM
 */
export default function WorkOrderOperationCreateUpdateUOMQueryOptions(clientAPI) {
	let query = `$filter=(UoM  eq 'WK' or UoM eq 'YR' or UoM eq 'MON' or UoM eq 'MIN' or UoM eq 'H' or UoM eq 'DAY')`;
	return query;
}
