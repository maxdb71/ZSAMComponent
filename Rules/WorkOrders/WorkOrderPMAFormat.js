
export default function WorkOrderPMAFormat(context) {
	let binding = context.getBindingObject();
	let pma = binding.MaintenanceActivityType;
	let orderType=binding.OrderType;
	if (binding && pma) {
            
        return context.read('/SAPAssetManager/Services/AssetManager.service',
                    'ActivityTypes',
                    [],
                    "$filter=ActivityType eq '" + binding.MaintenanceActivityType + "' and OrderType eq '" + binding.OrderType + "'" )
                    .then(actType => {
                        if (actType.getItem(0) && actType.getItem(0).ActivityTypeDescription) {
                            return binding.MaintenanceActivityType + "-" + actType.getItem(0).ActivityTypeDescription;
                        } else {
                            return binding.MaintenanceActivityType;
                        }
                    });
			
        }
    return ' ';

}