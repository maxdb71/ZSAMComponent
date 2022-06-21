
export default function NotificationDetailsNavQueryOptions() {
    return '$select=NotificationDescription,NotificationNumber,MalfunctionEndDate,MalfunctionEndTime,'
    +'RequiredStartDate,ZRequiredStartTime,QMCodeGroup,QMCode,MalfunctionStartDate,MalfunctionStartTime,'
    +'NotificationType,PlanningPlant,OrderId,RequiredEndDate,ZRequiredEndTime,PriorityType,Priority,BreakdownIndicator,'
    +'HeaderFunctionLocation,HeaderEquipment,NotifPriority/PriorityDescription,NotifPriority/Priority,FunctionalLocation/FuncLocDesc,'
    +'ObjectKey,NotifDocuments/DocumentID,MobileStatus/MobileStatus&$expand=WorkOrder,NotifPriority,MobileStatus,NotifDocuments,'
    +'HeaderLongText,FunctionalLocation,Equipment&$orderby=NotificationNumber';
}
