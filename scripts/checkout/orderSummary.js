import { cart, removeItem, updateDeliveryOptionId } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatMoney } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
    let cartSummaryHtml = '';
    cart.forEach((cartObject) => {
        const productId = cartObject.productId;
        let matchingItem = getProduct(productId);
        let dateString;
        deliveryOptions.forEach((deliveryOption) => {
            if (cartObject.deliveryOptionId === deliveryOption.id) {
                const today = dayjs();
                const deliveryDate = today.add(deliveryOption.days, 'day');
                dateString = deliveryDate.format('dddd, MMMM, D');
            }
        });

        let objectHtml = `<div class="cart-item-container js-cart-item-container-${
            matchingItem.id
        }">
                        <div class="delivery-date">
                            Delivery date: ${dateString}
                        </div>
                        <div class="cart-item-details-grid">
                            <img
                                class="product-image"
                                src="${matchingItem.image}" />
                            <div class="cart-item-details">
                                <div class="product-name">${matchingItem.name}
                                </div>
                                <div class="product-price">${formatMoney(
                                    matchingItem.priceCents
                                )}</div>
                                <div class="product-quantity">
                                    <span>
                                        Quantity:
                                        <span class="quantity-label">${
                                            cartObject.quantity
                                        }</span>
                                    </span>
                                    <span
                                        class="update-quantity-link link-primary">
                                        Update
                                    </span>
                                    <span
                                        class="delete-quantity-link link-primary"
                                        data-product-id ="${matchingItem.id}">
                                        Delete
                                    </span>
                                </div>
                            </div>
                            <div class="delivery-options">
                                <div class="delivery-options-title">
                                    Choose a delivery option:
                                </div>
                                ${deliveryOptionsHtml(matchingItem, cartObject)}
                            </div>
                        </div>
                    </div>`;
        cartSummaryHtml += objectHtml;
    });
    function deliveryOptionsHtml(matchingItem, cartObject) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.days, 'day');
            const dateString = deliveryDate.format('dddd, MMMM, D');
            const isChecked =
                deliveryOption.id === cartObject.deliveryOptionId
                    ? 'checked'
                    : '';
            const priceString =
                deliveryOption.priceCents === 0
                    ? 'Free'
                    : `$${formatMoney(deliveryOption.priceCents)} - `;
            html += `<div class="delivery-option"
        data-product-id ="${matchingItem.id}"
        data-delivery-option-id ="${deliveryOption.id}"
        >
                                    <input
                                        type="radio"
                                        ${isChecked}
                                        class="delivery-option-input"
                                        name="delivery-option-${matchingItem.id}" />
                                    <div>
                                        <div class="delivery-option-date">
                                            ${dateString}
                                        </div>
                                        <div class="delivery-option-price">
                                            ${priceString} Shipping
                                        </div>
                                    </div>
                                </div>`;
        });
        return html;
    }
    document.querySelector('.order-summary').innerHTML = cartSummaryHtml;

    document.querySelectorAll('.delete-quantity-link').forEach((link) =>
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeItem(productId);
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.remove();
            renderPaymentSummary();
        })
    );

    document.querySelectorAll('.delivery-option').forEach((option) => {
        option.addEventListener('click', () => {
            const { productId, deliveryOptionId } = option.dataset;
            updateDeliveryOptionId(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
renderOrderSummary();
