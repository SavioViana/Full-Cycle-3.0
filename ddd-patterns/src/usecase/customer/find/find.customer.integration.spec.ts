import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { Sequelize } from "sequelize-typescript";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => { 
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        
        await sequelize.addModels([CustomerModel]);
        
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });


    it("Should find a customer", async () => { 

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);  

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

        const result = await new FindCustomerUseCase(customerRepository).execute(input);

        expect(result).toEqual(output);

    });
});