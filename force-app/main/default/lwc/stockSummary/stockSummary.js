import { LightningElement, wire,  api, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
//import Stock from  './stock';
//import { NavigationMixin } from 'lightning/navigation';
// var unirest = require("unirest");

/** Wire adapter to load records, utils to extract values. */
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';

/** Account Schema. */
//import ACCOUNT_OBJECT from '@salesforce/schema/Account';
//import TICKER_SYMBOL from '@salesforce/schema/Account.TickerSymbol';

const TICKER_FIELD = ['Account.TickerSymbol'];

/** Record fields to load */
export default class StockSummary extends LightningElement {
    @track     profit_Margins;
    @track     fullTime_Employees;
    @track     yearly_Revenue;
    @track     yearly_Earnings;

    account;
    tick_symbol;
    

    recordId = '0015w000026xlPcAAI';
    //@api objectApiName;
    //@api recordId;    
     
    //accountObject = ACCOUNT_OBJECT;
    //fields = ['TickerSymbol'];
    
    @wire(CurrentPageReference) pageRef;

    @wire(getRecord, { recordId: '$recordId', fields: TICKER_FIELD }) 
    wiredRecord({error,data}) {
        if(data){
            this.account = data;
            this.tick_symbol = this.account.fields.TickerSymbol.value;
            this.error = undefined; 
           
            //console.log(this.data); // I want this to be based on the Account Page I am on
        // However if I call this.ticketSymbol property I get undefined.
        //
        //fetch (`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=CRM`,
        
        fetch (`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${this.tick_symbol}`,
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
             console.log((myJson));
             this.profit_Margins = JSON.stringify(myJson.financialData.profitMargins.fmt);
             this.fullTime_Employees = JSON.stringify(myJson.summaryProfile.fullTimeEmployees);
        //     this.yearly_Earnings = JSON.stringify(myJson.financialsChart.yearly[3].earnings.fmt);
        //     this.yearly_Revenue = JSON.stringify(myJson.financialsChart.yearly[3].revenue.fmt);
            
             console.log('%% Profit Margins%% '+JSON.stringify(myJson.financialData.profitMargins.fmt));
             console.log('%% Employees %% '+JSON.stringify(myJson.summaryProfile.fullTimeEmployees));
             //console.log('%% Annual Revenue %% '+JSON.stringify(myJson.earnings.earningsChart.quarterly[1].date));


        }

        )
        } else if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
         }
    }
    //account;
    
    /*
    @api
    get tickerSymbol() {
         return getFieldValue(this.account.data, TICKER_FIELD);
    }*/

    /*
    connectedCallback() {

        const encodedTicker = TICKER_FIELD; // I want this to be based on the Account Page I am on
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
    } */
    
    
}
