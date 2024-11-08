import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Customer 1");
const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
customer.changeAddress(address);
const MockCustomerRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test Unit find customer use case", () => { 

    it("Should find a customer", async () => { 

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                city: "City 1",
                zip: "Zipcode 1"
            }
        }

        const result = await new FindCustomerUseCase( MockCustomerRepository()).execute(input);

        expect(result).toEqual(output);

    });

    it("Should not find a customer", async () => {

        const customerRepository = MockCustomerRepository();
        customerRepository.find = jest.fn().mockImplementation(() => {
            throw new Error("Customer not found");
        })
        
        const input = {
            id: "123"
        }

        expect(async () => {
            return await new FindCustomerUseCase( customerRepository ).execute(input)
        }).rejects.toThrow("Customer not found");
    })
});
