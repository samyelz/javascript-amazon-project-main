import { renderOrderSummary } from '../../../../scripts/checkout/orderSummary.js';
import { loadCart, cart } from '../../../../data/cart.js';

describe('Test suite : rederOrderSummary integration', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    document.querySelector('.js-test-container').innerHTML = `
            <div class="order-summary" ></div>
            <div class="payment-summary"></div>`;
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 1,
                    deliveryOptionId: '3',
                },
                {
                    productId: productId2,
                    quantity: 2,
                    deliveryOptionId: '1',
                },
            ]);
        });
        loadCart();
        renderOrderSummary();
    });
    it('displays the cart', () => {
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`)
                .innerText
        ).toContain('Quantity: 1');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`)
                .innerText
        ).toContain('Quantity: 2');
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    });

    it('removes the product', () => {
        document.querySelector(`.js-delete-link${productId1}`).click();
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        document.querySelector('.js-test-container').innerHTML = '';
    });
});
// afterAll(() => {
//     document.querySelector('.js-test-container').innerHTML = '';
// });
