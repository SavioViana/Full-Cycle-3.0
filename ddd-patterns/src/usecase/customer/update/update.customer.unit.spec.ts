import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 1, "Zipcode 1", "City 1"))

const input = {
    id: customer.id,
    name: "John Doe",
    address: {
        street: "Street Updated",
        number: 23,
        zip: "Zipcode updated",
        city: "City updated"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe("Test Unit update customer use case", () => {

    it("Should update a customer", async () => {
        
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input)
    })
})