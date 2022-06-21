export default function WorkOrderUserStatusFilter(context) {
    return { name: 'ZUserStatus', values: [{ ReturnValue: 'IEXE', DisplayValue: context.localizeText('iexe') }] };
}