"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            let customer = new customer_1.default("", "Jonh");
        }).toThrow("Id is required");
    });
    it('should throw error when name is empty', () => {
        expect(() => {
            let customer = new customer_1.default("123", "");
        }).toThrow("Name is required");
    });
    it('should change name', () => {
        const customer = new customer_1.default("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });
    it('should activate customer', () => {
        const customer = new customer_1.default("1", "Customer 1");
        const address = new address_1.default("Rua 01", 2, "46430-000", "Guanambi");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });
    it('should desactivate customer', () => {
        const customer = new customer_1.default("1", "Customer 1");
        customer.desactivate();
        expect(customer.isActive()).toBe(false);
    });
    it('should thown error when address is undefinded', () => {
        expect(() => {
            const customer = new customer_1.default("1", "Customer 1");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });
});
