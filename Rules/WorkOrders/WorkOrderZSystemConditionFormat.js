
export default function WorkOrderZSystemConditionFormat(context) {
	let binding = context.getBindingObject();

	if (binding) {       
        return context.read('/SAPAssetManager/Services/AssetManager.service',
                    'ZSystemConditions',
                    [],
                    "$filter=ANZLU eq '" + binding.ZSystemCondition + "'" )
                    .then(syscondn => {
                        if (syscondn.getItem(0) && syscondn.getItem(0).ANZLUX) {
                            return syscondn.getItem(0).ANZLU + "-" + syscondn.getItem(0).ANZLUX;
                        } else {
                            return syscondn.getItem(0).ANZLU;
                        }
                    });
			
        }
    return ' ';

}