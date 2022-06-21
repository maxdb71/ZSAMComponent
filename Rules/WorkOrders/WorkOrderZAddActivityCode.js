
export default function WorkOrderZAddActivityCode(context) {
	let binding = context.getBindingObject();

	if (binding) {       
        return context.read('/SAPAssetManager/Services/AssetManager.service',
                    'ZAdditionalActivityCodes',
                    [],
                    "$filter=NATURE eq '" + binding.ZAdditionalActivityCode + "'" )
                    .then(addCode => {
                        if (addCode.getItem(0) && addCode.getItem(0).NATURE_TXT) {
                            return addCode.getItem(0).NATURE + "-" + addCode.getItem(0).NATURE_TXT;
                        } else {
                            return addCode.getItem(0).NATURE;
                        }
                    });
			
        }
    return ' ';

}