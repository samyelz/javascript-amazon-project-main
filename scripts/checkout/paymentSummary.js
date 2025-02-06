import { products, getProduct } from '../../data/products.js';
import { cart } from '../../data/cart.js';
import { formatMoney } from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
export function renderPaymentSummary() {
    let itemsPriceCents = 0;
    let itemsQuantity = 0;
    let itemsShippingCents = 0;
    cart.forEach((cartObject) => {
        let product = getProduct(cartObject.productId);
        itemsPriceCents += product.priceCents * cartObject.quantity;
        itemsQuantity += cartObject.quantity;
        const deliveryOption = getDeliveryOption(cartObject.deliveryOptionId);
        itemsShippingCents += deliveryOption.priceCents;
    });
    const totalBeforeTaxCents = itemsShippingCents + itemsPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;
    const paymentSummaryHtml = `<div class="payment-summary-title">Order Summary</div>

                    <div class="payment-summary-row">
                        <div>Items (${itemsQuantity}):</div>
                        <div class="payment-summary-money">$${formatMoney(
                            itemsPriceCents
                        )}</div>
                    </div>

                    <div class="payment-summary-row">
                        <div>Shipping &amp; handling:</div>
                        <div class="payment-summary-money">$${formatMoney(
                            itemsShippingCents
                        )}</div>
                    </div>

                    <div class="payment-summary-row subtotal-row">
                        <div>Total before tax:</div>
                        <div class="payment-summary-money">$${formatMoney(
                            totalBeforeTaxCents
                        )}</div>
                    </div>

                    <div class="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div class="payment-summary-money">$${formatMoney(
                            taxCents
                        )}</div>
                    </div>

                    <div class="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div class="payment-summary-money">$${formatMoney(
                            totalCents
                        )}</div>
                    </div>

                    <button class="place-order-button button-primary">
                        Place your order
                    </button>`;
    document.querySelector('.payment-summary').innerHTML = paymentSummaryHtml;
}
