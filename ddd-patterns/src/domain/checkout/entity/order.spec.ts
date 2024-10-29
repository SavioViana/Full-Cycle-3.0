import Order from "./order"
import OrderItem from "./order-item"

describe("Order unit tests", () => {

    it('should throw error when id is empty', () => {

        expect(() => {
            let order = new Order("", "123", [])
        }).toThrow("Id is required")
    })

    it('should throw error when customerId is empty', () => {

        expect(() => {
            let order = new Order("123", "", [])
        }).toThrow("CustomerId is required")
    })

    it('should throw error when Items is empty', () => {

        expect(() => {
            let order = new Order("123", "123", [])
        }).toThrow("Items are required")
    })

    it('should calculate total', () => {

        const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2)
        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2)

        const order = new Order("o1", "123", [item1, item2])

        const total = order.total()

        expect(total).toBe(600)
    })

    
    it('should throw if the quantity is less then or equal zero', () => {

        expect( () => {
            const item1 = new OrderItem("i1", "Item 1", 100, "p1", 0)

            const order = new Order("o1", "123", [item1])
        }).toThrow("Quantity must be greater than 0")
    })

    it('should add item', () => {

        const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2)

        const order = new Order("o1", "123", [item1])

        expect(order.items.length).toBe(1)

        const newItem = new OrderItem("i2", "Item 2", 100, "p2", 1)

        order.addItems([newItem])

        expect(order.items.length).toBe(2)

        const total = order.total()

        expect(total).toBe(300)
    })


})