import common from '../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function NotificationChkItemVisibility(context)
{
    return common.IsOnCreate(context);
}
