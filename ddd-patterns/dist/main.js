"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./entity/address"));
const customer_1 = __importDefault(require("./entity/customer"));
const order_1 = __importDefault(require("./entity/order"));
const order_item_1 = __importDefault(require("./entity/order-item"));
let customer = new customer_1.default("123", "Sávio Viana");
let address = new address_1.default("Rua 01", 2, "46430-000", "Guanambi");
customer.Address = address;
customer.activate();
let item1 = new order_item_1.default("1", "Item 1", 10);
let item2 = new order_item_1.default("2", "Item 2", 10);
let order = new order_1.default("1", "123", [item1, item2]);
console.log(customer);
console.log(order);
