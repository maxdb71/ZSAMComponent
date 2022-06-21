import libNotif from '../NotificationLibrary';

export default function NotificationCreateUpdateCodingLstPkrValue(context) {
    try {
        return libNotif.NotificationCreateUpdateCodingLstPkrValue(context);
    } catch (errore) {
        console.log('uikkan', errore)
    }
}
