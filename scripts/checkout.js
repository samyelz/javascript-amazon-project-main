import { loadProducts, loadProductsFetch } from '../data/products.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/backend.js';

// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

Promise.all([loadProductsFetch()]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});

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
