export default function BatchEnabled(context) {
   //return context.binding.Batch === '' ? false : true;
   let binding = context.getBindingObject();
   return context.read('/SAPAssetManager/Services/AssetManager.service',
                        'MaterialBatches',
                        [],
                        "$select=Batch&$filter=Plant eq '" + binding.Plant + "' and MaterialNum eq '" + binding.MaterialNum + "'").then(result => {
                                    if (result && result.length > 0) {
                                        return true;
                                        }
                                    return false;
                                });
}
