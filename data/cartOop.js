function GenerateCart(LocalStorageKey) {
    const Cart = {
        cartItems,
        loadCart() {
            this.cartItems =
                JSON.parse(localStorage.getItem(LocalStorageKey)) ||
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
        },
        updateCart() {
            localStorage.setItem(
                LocalStorageKey,
                JSON.stringify(this.cartItems)
            );
        },
        addToCart(productId) {
            let matchingItem;
            this.cartItems.forEach((cartObject) => {
                if (cartObject.productId === productId) {
                    matchingItem = cartObject;
                }
            });
            if (matchingItem) {
                matchingItem.quantity += 1;
            } else {
                this.cartItems.push({
                    productId,
                    quantity: 1,
                    deliveryOptionId: '3',
                });
            }
            this.updateCart();
        },
        removeItem(productId) {
            let newcart = [];
            this.cartItems.forEach((cartObject) => {
                if (cartObject.productId !== productId) {
                    newcart.push(cartObject);
                }
            });
            this.cartItems = newcart;
            this.updateCart();
        },
        updateDeliveryOptionId(productId, deliveryOptionId) {
            this.cartItems.forEach((cartObject) => {
                if (cartObject.productId === productId) {
                    cartObject.deliveryOptionId = deliveryOptionId;
                    this.updateCart();
                }
            });
        },
    };
    return Cart;
}

export const Cart = GenerateCart('Cart');
export const BusinessCart = GenerateCart('business-cart');

Cart.loadCart();
BusinessCart.loadCart();

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
