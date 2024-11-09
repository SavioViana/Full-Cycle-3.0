import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const productOne = new Product("1", "Product 1", 10);
const productTwo = new Product("2", "Product 2", 20);

describe("Test Integration list product use case", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        
        await sequelize.addModels([ProductModel]);
        
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should list products", async () => {
        
        const productRepository = new ProductRepository();
        await productRepository.create(productOne);
        await productRepository.create(productTwo);
        
        const productListUseCase = new ListProductUseCase(productRepository);

        const output = await productListUseCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(productOne.id);
        expect(output.products[0].name).toBe(productOne.name);
        expect(output.products[1].id).toBe(productTwo.id);
        expect(output.products[1].name).toBe(productTwo.name);
    })
})