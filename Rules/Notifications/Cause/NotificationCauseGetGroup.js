import notification from '../NotificationLibrary';

export default function NotificationCauseGetGroup(context) {
    return notification.NotificationDamNCausQuery(context, 'CatTypeCauses');
    /*
    try	{
        var codeGroup = context.binding.CauseCodeGroup;
        return notification.NotificationCodeGroupStr(context, 'CatTypeCauses', codeGroup);
    } catch (exception)	{
        return context.localizeText('unknown');
    }
    */
}
