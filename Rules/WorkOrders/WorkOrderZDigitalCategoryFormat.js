
export default function WorkOrderZDigitalCategoryFormat(context) {
	let binding = context.getBindingObject();

	if (binding) {       
        return context.read('/SAPAssetManager/Services/AssetManager.service',
                    'ZDigitalImpactCategorys',
                    [],
                    "$filter=DIG_CAT eq '" + binding.ZDigitalCategory + "'" )
                    .then(digcat => {
                        if (digcat.getItem(0) && digcat.getItem(0).DES_CAT) {
                            return digcat.getItem(0).DIG_CAT + "-" + digcat.getItem(0).DES_CAT;
                        } else {
                            return digcat.getItem(0).DIG_CAT;
                        }
                    });
			
        }
    return ' ';

}