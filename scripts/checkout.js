import { loadProducts, loadProductsFetch } from '../data/products.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/backend.js';

// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });
async function loadPage() {
    try {
        await loadProductsFetch();
    } catch (error) {
        console.log('Unexpected error. please try again later');
    }

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

// Promise.all([loadProductsFetch()]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });
// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });
