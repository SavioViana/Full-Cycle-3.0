"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("./order"));
const order_item_1 = __importDefault(require("./order-item"));
describe("Order unit tests", () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            let order = new order_1.default("", "123", []);
        }).toThrow("Id is required");
    });
    it('should throw error when customerId is empty', () => {
        expect(() => {
            let order = new order_1.default("123", "", []);
        }).toThrow("CustomerId is required");
    });
    it('should throw error when Items is empty', () => {
        expect(() => {
            let order = new order_1.default("123", "123", []);
        }).toThrow("Items are required");
    });
    it('should calculate total', () => {
        const item1 = new order_item_1.default("i1", "Item 1", 100, "p1", 2);
        const item2 = new order_item_1.default("i2", "Item 2", 200, "p2", 2);
        const order = new order_1.default("o1", "123", [item1, item2]);
        const total = order.total();
        expect(total).toBe(600);
    });
    it('should throw if the quantity is less then or equal zero', () => {
        expect(() => {
            const item1 = new order_item_1.default("i1", "Item 1", 100, "p1", 0);
            const order = new order_1.default("o1", "123", [item1]);
        }).toThrow("Quantity must be greater than 0");
    });
});
