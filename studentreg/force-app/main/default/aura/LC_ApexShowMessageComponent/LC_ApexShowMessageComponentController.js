({
	callApexMethod : function(component, event, helper) 
    {
        var showresult = component.get("c.showMessage");
        showresult.setCallback(this,function(response)
        {
            var state = response.getState();
            if(state ==='SUCCESS')
            {
                var result = response.getReturnValue();
                component.set("v.resultMessage",result);
                console.log('Operation Completed Sucessfully.');
                
            }
            else
                console.log('Operation Failed');
                               
                               });
        $A.enqueueAction(showresult);
        
		
	}
})