 ALTER TABLE salesforce.opportunity ADD COLUMN  Global_ACCID VARCHAR;

 UPDATE salesforce.opportunity SET global_accid = 'BT-001' WHERE 
 name like '%Banana%'; commit;

 Select name, global_accid, accountid From salesforce.opportunity;

 SELECT * FROM pg_trigger;


 CREATE OR REPLACE FUNCTION salesforce.set_global_accids() 
 RETURNS TRIGGER 
 AS 
 $update_glolabid$
 BEGIN
       UPDATE salesforce.opportunity SET global_accid = 'BT-001' WHERE  name like '%Banana%'; 
 END; 
 $update_glolabid$ language plpgsql;



 CREATE TRIGGER salesforce.update_oppty 
 AFTER INSERT 
 ON salesforce.opportunity 
 FOR EACH ROW 
 EXECUTE PROCEDURE salesforce.set_global_accid();
