export default function COActivityPickerQueryOptions(context) {
    let activityType = context.binding.ActivityType.substring(0, 6);
    return activityType;
}
