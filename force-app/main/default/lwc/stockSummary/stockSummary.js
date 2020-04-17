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
// const fields = [TICKER_FIELD];
// const querystring = require('querystring');
// const url = require('url');
export default class StockSummary extends LightningElement {
    @track 
    Margins;
    @track 
    Employees;
    
    

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
        //return this.account.data ? getFieldValue(this.account.data, TICKER_FIELD) : ' ';
        return getFieldValue(this.account.data, TICKER_FIELD);
        
   
    }
/*
    var query = querystring.stringify({symbol: 'AAPL'});
    const requesturl = url.parse(url.format({
        protocol: 'https',
        hostname: 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        pathname: '/stock/v2/get-summary',
        query: {
            symbol: AAPL
        }
    }));
*/
/*
var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary");

req.query({
	"region": "US",
	"symbol": "AMRN"
});

req.headers({
	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"x-rapidapi-key": "fed0dc9471msh19edb801e26a30ep1cba77jsn002db7d60898"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
*/
    connectedCallback() {
        const encodedTicker = 'AAPL'; 
        
        fetch (`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${encodedTicker}`,
 //       fetch ('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=AAPL',
        // End point URL
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
             this.Margins = JSON.stringify(myJson.financialData.profitMargins.fmt);
             this.Employees = JSON.stringify(myJson.summaryProfile.fullTimeEmployees);
             //this.profitMargins = new Stock(JSON.stringify(myJson.financialData.profitMargins.fmt),JSON.stringify(myJson.financialData.profitMargins.fmt));
             //this.stockDetails = new Stock('29','3000');
             
             //console.log('%% Profit Margins%% '+JSON.stringify(myJson.financialData.profitMargins.fmt));
             //console.log('%% Employees %% '+JSON.stringify(myJson.summaryProfile.fullTimeEmployees));

        }

        )
        
        
        
    }
    
    
}
