import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
    name: "Customer 1",
    address: {
        street: "Street 1",
        number: 1,
        city: "City 1",
        zip: "Zipcode 1"
    }
}


const MockCustomerRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Create test customer use case", () => {

    it("Should create a customer", async () => {

        const customerRepository = MockCustomerRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                city: input.address.city,
                zip: input.address.zip
            }
        })
    })

    it("should thown an error when name is missing", async () => {

        const customerRepository = MockCustomerRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
        
        await expect(
            customerCreateUseCase.execute(input)
        ).rejects.toThrow("Name is required");
    })

    it("should thown an error when street is missing", async () => {

        const customerRepository = MockCustomerRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);        

        input.name = "Customer 1";
        input.address.street = "";
        
        await expect(
            customerCreateUseCase.execute(input)
        ).rejects.toThrow("Street is required");
    })

})

