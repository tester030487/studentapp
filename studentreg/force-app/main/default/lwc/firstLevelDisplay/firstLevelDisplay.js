import { LightningElement, track, api } from 'lwc';  

export default class FirstLevelDisplay extends LightningElement {

    @track showsecondLevelDisplay = false;
    
    firstLevelclick(event) {
        console.log("Second LWC component function invoked");

      
            this.showsecondLevelDisplay = true;
            //alert(showfirstLevelDisplay);
          
        }


}