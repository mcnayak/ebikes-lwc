import { LightningElement, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

//importing test server for request objects
import { myExpressApp } from '../testRequestObjects/app';

/** Wire adapter to load records, utils to extract values. */
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

/** Account Schema. */
//import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import TICKER_FIELD from '@salesforce/schema/Account.TickerSymbol';

/** Record fields to load */
//const fields = [TICKER_FIELD];
const querystring = require('querystring');
const url = require('url');
export default class StockSummary extends LightningElement {
    //@track revenue;
    //@track employees;
    //@track stockprice;

    recordId = '0015w000026xyh3AAA';
    //@api objectApiName;
    //@api recordId;    

    //accountObject = ACCOUNT_OBJECT;
    //fields = ['TickerSymbol'];

    @wire(CurrentPageReference) pageRef;
    @wire(getRecord, { recordId: '$recordId', fields: [TICKER_FIELD] })
    account;


    get ticker_symbol() {
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

    queryData = ticker_symbol();
    myInit = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "fed0dc9471msh19edb801e26a30ep1cba77jsn002db7d60898"
        }
    };


    //request object
    requestObj = new Request(this.queryData, this.myInit);



    connectedCallback() {

        fetch('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=AAPL',
            // End point URL
            {
                // Request type
                method: "GET",

                headers: {// content type
                    "Content-Type": "application/json",
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                    "x-rapidapi-key": "fed0dc9471msh19edb801e26a30ep1cba77jsn002db7d60898"
                },
                "hostname": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            }
        ).then(function (response) {
            return response.json();
        }).then(() => {
            // console.log('%%%%'+JSON.stringify(myJson));
        }

        )

    }

}
