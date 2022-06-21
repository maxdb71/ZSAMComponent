import libNotif from '../NotificationLibrary';

export default function NotificationCreateUpdateCodingGroupLstPkrValue(context) {
    try {
        return libNotif.NotificationCreateUpdateCodingGroupLstPkrValue(context);
    } catch (errore) {
        console.log('uikkan', errore)
    }
}
