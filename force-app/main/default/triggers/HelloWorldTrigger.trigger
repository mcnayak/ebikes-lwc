trigger HelloWorldTrigger on ACCOUNT(before insert) {
    System.debug('Before Insert');
    if (Trigger.isInsert) {
        for (ACCOUNT a : Trigger.new) {
            a.Description = 'Trigger Set';
            System.debug(a.Description);
        }
    } else if (Trigger.isDelete) {
        System.debug('Removed Account');
    }

}
