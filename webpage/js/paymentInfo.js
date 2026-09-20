// Name : Pay Yu mi
// Class: DIT/1B/07
// Admin No: 2537159

import { fetchPaymentMethods, fetchByPaymentMethod } from './fetchInfo.js';

const template = document.createElement('template');

template.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .filter-section {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 30px;
            border: 1px solid #e0e0e0;
        }
        
        .filter-label {
            display: block;
            font-size: 16px;
            font-weight: 600;
            color: #333;
            margin-bottom: 12px;
        }
        
        .payment-select {
            width: 100%;
            max-width: 400px;
            padding: 12px 16px;
            font-size: 15px;
            border: 2px solid #d1d5db;
            border-radius: 6px;
            background-color: white;
            color: #333;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
        }
        
        .payment-select:hover {
            border-color: #007bff;
        }
        
        .payment-select:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }
        
        .selected-method {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 25px;
            border-radius: 8px;
            margin-bottom: 25px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: none;
        }
        
        .selected-method h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
        }
        
        .method-name {
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .loading {
            text-align: center;
            padding: 40px;
            color: #666;
            font-size: 16px;
            display: none;
        }
        
        .no-selection {
            text-align: center;
            padding: 60px 20px;
            color: #9ca3af;
            font-size: 16px;
        }
        
        .transaction-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 20px;
        }
        
        @media (max-width: 992px) {
            .transaction-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .transaction-grid {
                grid-template-columns: 1fr;
            }
            .payment-select {
                max-width: 100%;
            }
        }
    </style>
    
    <div class="filter-section">
        <label for="paymentMethodSelect" class="filter-label">Select Payment Method:</label>
        <select id="paymentMethodSelect" class="payment-select">
            <option value="" disabled selected>Choose a payment method...</option>
        </select>
    </div>
    
    <div class="selected-method" id="selectedMethod">
        <h3>Showing results for: <span class="method-name" id="methodName"></span></h3>
    </div>
    
    <div class="loading" id="loading">
        <p>Loading data...</p>
    </div>
    
    <div class="no-selection" id="noSelection">
        <p>Please select a payment method to view transactions</p>
    </div>
    
    <div class="transaction-grid" id="transactionGrid"></div>
`;

class PaymentMethod extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
        
        this.selectElement = this.root.querySelector('#paymentMethodSelect');
        this.selectedMethodDiv = this.root.querySelector('#selectedMethod');
        this.methodNameSpan = this.root.querySelector('#methodName');
        this.loadingDiv = this.root.querySelector('#loading');
        this.noSelectionDiv = this.root.querySelector('#noSelection');
        this.transactionGrid = this.root.querySelector('#transactionGrid');
    }

    connectedCallback() {
        this.loadPaymentMethods();
        this.selectElement.addEventListener('change', (e) => this.handleChange(e));
    }

    async loadPaymentMethods() {
        try {
            const methods = await fetchPaymentMethods();
            
            methods.forEach(methodName => {
                const displayName = methodName[0];
                const url = methodName[1];
                
                const option = document.createElement('option');
                option.value = url;
                option.textContent = displayName;
                this.selectElement.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading retail transaction data by payment methods:', error);
        }
    }

    async handleChange(event) {
        const selectedValue = event.target.value;
        const selectedOption = this.selectElement.options[this.selectElement.selectedIndex];
        const displayName = selectedOption.textContent;
        
        this.transactionGrid.innerHTML = '';
        this.loadingDiv.style.display = 'block';
        this.noSelectionDiv.style.display = 'none';
        this.selectedMethodDiv.style.display = 'none';
        
        try {
            const transactions = await fetchByPaymentMethod(selectedValue);
            
            this.loadingDiv.style.display = 'none';
            this.selectedMethodDiv.style.display = 'block';
            this.methodNameSpan.textContent = displayName;
            
            transactions.forEach(transaction => {
                const card = document.createElement('retail-data');
                card.setAttribute('customerid', transaction.customerID);
                card.setAttribute('price', transaction.price.toFixed(2));
                card.setAttribute('paymentmethod', transaction.paymentMethod);
                card.setAttribute('totalamount', transaction.totalAmount.toFixed(2));
                this.transactionGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Error loading retail transactions by payment method:', error);
            this.loadingDiv.style.display = 'none';
        }
    }
}

window.customElements.define('payment-method', PaymentMethod);