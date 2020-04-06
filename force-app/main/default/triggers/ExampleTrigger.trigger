trigger ExampleTrigger on CONTACT(after insert, after delete) {
    if (Trigger.isInsert) {
        Integer recordCount = Trigger.New.size();
        EmailManager.sendMail(
            'Your email address',
            'Trailhead Trigger Tutorial',
            recordCount + 'contact(s) were inserted.'
        );
    } else if (Trigger.isDelete) {
        // Process after Delete
    }

}
