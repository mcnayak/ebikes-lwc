import { LightningElement, wire,  api, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import Stock from  './stock';
import { NavigationMixin } from 'lightning/navigation';
// var unirest = require("unirest");

/** Wire adapter to load records, utils to extract values. */
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';

/** Account Schema. */
//import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import TICKER_FIELD from '@salesforce/schema/Account.TickerSymbol';


/** Record fields to load */


export default class StockSummary extends LightningElement {
    @track 
    profit_Margins;
    @track 
    fullTime_Employees;
  
    

    recordId = '0015w000026xyh3AAA';
    //@api objectApiName;
    //@api recordId;    
     
    //accountObject = ACCOUNT_OBJECT;
    //fields = ['TickerSymbol'];
    
    @wire(CurrentPageReference) pageRef;
    @wire(getRecord, { recordId: '$recordId', fields: [TICKER_FIELD] }) 
    account;
    
    
    @api
    get tickerSymbol() {
        
        return getFieldValue(this.account.data, TICKER_FIELD);
    }



    connectedCallback() {
        const encodedTicker = 'AAPL'; // I want this to be based on the Account Page I am on
        // However if I call this.ticketSymbol property I get undefined.
        
        fetch (`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${encodedTicker}`,
        {
            // Request type
            method:"GET",
            

            headers:{// content type
                     "Content-Type": "application/json",
                     "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                     "x-rapidapi-key": "fed0dc9471msh19edb801e26a30ep1cba77jsn002db7d60898"
            },
            "hostname": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            
        }
        ).then(function(response){
            return response.json();
        }).then((myJson) => {
             //console.log('%%%%'+JSON.stringify(json));
             this.profit_Margins = JSON.stringify(myJson.financialData.profitMargins.fmt);
             this.fullTime_Employees = JSON.stringify(myJson.summaryProfile.fullTimeEmployees);
           
             //console.log('%% Profit Margins%% '+JSON.stringify(myJson.financialData.profitMargins.fmt));
             //console.log('%% Employees %% '+JSON.stringify(myJson.summaryProfile.fullTimeEmployees));

        }

        )
        
        
        
    }
    
    
}
