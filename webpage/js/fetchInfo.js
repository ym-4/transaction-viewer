// Name : Pay Yu mi
// Class: DIT/1B/07
// Admin No: 2537159

// fetch retail transaction
export async function fetchFirst5() {
    const respone = await fetch(`http://localhost:8081/retailData5`)
    const data = await respone.json();

    return data.sort((a, b) => a.customerID - b.customerID);
}

// Fetch payment methods
export async function fetchPaymentMethods() {
    const response = await fetch(`http://localhost:8081/paymentMethod`);
    const data = await response.json();

    return data;
}

// Fetch top 5 transactions by payment method
export async function fetchByPaymentMethod(paymentMethodValue) {
    const response = await fetch(`http://localhost:8081/byPaymentMethod/${paymentMethodValue}`);
    const data = await response.json();
    
    return data.sort((b, a) => a.totalAmount - b.totalAmount).slice(0, 5);
}