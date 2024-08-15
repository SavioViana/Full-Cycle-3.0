"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, name, price, productId, quantity) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
    }
    get price() {
        return this._price;
    }
    get quantity() {
        return this._quantity;
    }
    orderItemTotal() {
        return this._price * this._quantity;
    }
}
exports.default = OrderItem;
