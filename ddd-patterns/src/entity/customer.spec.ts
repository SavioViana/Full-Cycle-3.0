import Address from "./address"
import Customer from "./customer"

describe("Customer unit tests", () => {

    it('should throw error when id is empty', () => {

        expect(() => {
            let customer = new Customer("", "Jonh")
        }).toThrow("Id is required")
    })

    it('should throw error when name is empty', () => {

        expect(() => {
            let customer = new Customer("123", "")
        }).toThrow("Name is required")
    })

    it('should change name', () => {

        const customer = new Customer("123", "John")

        customer.changeName("Jane")

        expect(customer.name).toBe("Jane")

    })

    it('should activate customer', () => {

        const customer = new Customer("1", "Customer 1")
        const address = new Address("Rua 01", 2, "46430-000", "Guanambi")
        customer.Address = address

        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it('should desactivate customer', () => {

        const customer = new Customer("1", "Customer 1")
        customer.desactivate()
        expect(customer.isActive()).toBe(false)
    })

    it('should thown error when address is undefinded', () => {
        
        expect(() => {
            const customer = new Customer("1", "Customer 1")
            customer.activate()
        }).toThrow("Address is mandatory to activate a customer")
    })

})