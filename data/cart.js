import { deliveryOptions } from '../data/deliveryOptions.js';

export let cart;
loadCart();
export function loadCart() {
    cart =
        JSON.parse(localStorage.getItem('cart')) ||
        [
            // {
            //     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            //     quantity: 2,
            // },
            // {
            //     productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            //     quantity: 1,
            // },
        ];
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(productId) {
    let matchingItem;
    cart.forEach((cartObject) => {
        if (cartObject.productId === productId) {
            matchingItem = cartObject;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '3',
        });
    }
    updateCart();
}

export function removeItem(productId) {
    let newcart = [];
    cart.forEach((cartObject) => {
        if (cartObject.productId !== productId) {
            newcart.push(cartObject);
        }
    });
    cart = newcart;
    updateCart();
}

// export function updateDeliveryOptionId(productId, deliveryOptionId) {
//     let matchingItem;
//     cart.forEach((cartObject) => {
//         if (cartObject.productId === productId) {
//             matchingItem = cartObject;
//             matchingItem.deliveryOptionId = deliveryOptionId;
//             updateCart();
//         }
//     });
// }

export function updateDeliveryOptionId(productId, deliveryOptionId) {
    cart.forEach((cartObject) => {
        if (cartObject.productId === productId) {
            cartObject.deliveryOptionId = deliveryOptionId;
            updateCart();
        }
    });
}
