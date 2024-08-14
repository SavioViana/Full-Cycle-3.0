import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order-item";

let customer = new Customer("123", "Sávio Viana");
let address = new Address("Rua 01", 2, "46430-000", "Guanambi")
customer.Address = address
customer.activate()


let item1 = new OrderItem("1", "Item 1", 10)
let item2 = new OrderItem("2", "Item 2", 10)

let order = new Order("1", "123", [item1, item2])

console.log(customer)
console.log(order)