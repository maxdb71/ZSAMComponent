import notification from '../../../../ZSAMComponent/Rules/Notifications/NotificationLibrary';


export default function NotificationCreateUpdateTypeOnValueChange(context) {
    return notification.NotificationCreateUpdatePrioritySelector(context);
    //.then(() => updateGroupPickers(context.getPageProxy())).finally(() => {
    //    return notification.setFailureAndDetectionGroupQuery(context);
    //});
}
