export default function SerialNumberQueryOptions(context) {
     let plant = context.getPageProxy().binding.Plant;
     return "$expand=Material&$orderby=SerialNumber&$filter=Issued eq '' and Plant eq '" + plant + "'";
}