// Name : Pay Yu mi
// Class: DIT/1B/07
// Admin No: 2537159
// 
const template = document.createElement('template');

template.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: white;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.06);
            transition: all 0.2s ease;
        }
        
        :host(:hover) {
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }
        
        .card {
            padding: 20px;
        }
        
        .customer-id {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 2px solid #f3f4f6;
            word-wrap: break-word;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            gap: 12px;
        }
        
        .label {
            color: #6b7280;
            font-size: 0.875rem;
            font-weight: 500;
            white-space: nowrap;
        }
        
        .value {
            font-weight: 600;
            font-size: 1rem;
            text-align: right;
            word-wrap: break-word;
            overflow-wrap: break-word;
            font-weight: 700;
        }
        
        .price { color: #059669; }
        .payment { color: #7c3aed; }
        .total { color: #dc2626; }
    </style>
    <div class="card">
        <span class="label">Customer ID</span>
        <div class="customer-id" id='customerid'></div>
        
        <div class="detail-row">
            <span class="label">Price</span>
            <span class="value price">$<span id='price'></span></span>
        </div>
        
        <div class="detail-row">
            <span class="label">Payment Method</span>
            <span class="value payment" id='paymentmethod'></span>
        </div>
        
        <div class="detail-row">
            <span class="label">Total</span>
            <span class="value total">$<span id='totalamount'></span></span>
        </div>
    </div>
`;
class RetailData extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }

    static get observedAttributes() {
        return ['customerid', 'price', 'paymentmethod', 'totalamount'];
    }

    get customerid() {
        return this.getAttribute('customerid');
    }
    set customerid(value) {
        this.setAttribute('customerid', value);
    }

    get price() {
        return this.getAttribute('price');
    }
    set price(value) {
        this.setAttribute('price', value);
    }

    get paymentmethod() {
        return this.getAttribute('paymentmethod');
    }
    set paymentmethod(value) {
        this.setAttribute('paymentmethod', value);
    }

    get totalamount() {
        return this.getAttribute('totalamount');
    }
    set totalamount(value) {
        this.setAttribute('totalamount', value);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        attrName = attrName.toLowerCase();
        let element = this.root.querySelector(`#${attrName}`);
        
        if (element) {
            element.textContent = newValue;
        }
    }
}

window.customElements.define('retail-data', RetailData);