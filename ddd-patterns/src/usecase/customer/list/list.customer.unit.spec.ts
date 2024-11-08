import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customerOne = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 1, "Zipcode 1", "City 1"))
const customerTwo = CustomerFactory.createWithAddress("Customer 2", new Address("Street 2", 2, "Zipcode 2", "City 2"))


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("List customer use case unit test", () => {
    
    it("Should list customers", async () => {

        const customerRepository = MockRepository();
        const customerListUseCase = new ListCustomerUseCase(customerRepository);

        const output = await customerListUseCase.execute({});

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].id).toBe(customerOne.id);
        expect(output.customers[0].name).toBe(customerOne.name);
        expect(output.customers[0].address.street).toBe(customerOne.Address.street);
        expect(output.customers[0].address.number).toBe(customerOne.Address.number);
        expect(output.customers[0].address.zip).toBe(customerOne.Address.zip);
        expect(output.customers[0].address.city).toBe(customerOne.Address.city);

        expect(output.customers[1].id).toBe(customerTwo.id);
        expect(output.customers[1].name).toBe(customerTwo.name);
    })
})