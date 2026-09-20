// Name : Pay Yu mi
// Class: DIT/1B/07
// Admin No: 2537159
// 
import { fetchFirst5, fetchPaymentMethods, fetchByPaymentMethod } from './fetchInfo.js';

// Load retail transaction data
function loadRetail() {
    const retailDiv = document.querySelector("#retailTransactionData");
    
    if (!retailDiv) {
        return;
    }
    
    const loadingDiv = document.querySelector("#loading");
    
    fetchFirst5().then((retailArray) => {
        if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }

        console.log('Data received:', retailArray);

        retailArray.forEach(data => {
            const newData = document.createElement('retail-data');
            newData.setAttribute('customerid', data.customerID);
            newData.setAttribute('price', data.price.toFixed(2));
            newData.setAttribute('paymentmethod', data.paymentMethod);
            newData.setAttribute('totalamount', data.totalAmount.toFixed(2));
            retailDiv.appendChild(newData);
        });
    })
    .catch(error => {
        console.error('Error loading retail data:', error);
        if (loadingDiv) {
            loadingDiv.innerHTML = '<p style="color: red;">Error loading retail transaction data</p>';
        }
    });
}

// Load payment method 
function loadPaymentFilter() {
    const paymentMethodComponent = document.querySelector('payment-method');
    
    if (!paymentMethodComponent) {
        return;
    }
    
    console.log('Payment method found');
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    loadRetail();
    loadPaymentFilter();
});