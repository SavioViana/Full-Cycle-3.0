import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";


describe("Test Intergration update product use case", () => {

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

    it("Should update a product", async () => {

        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product 2",
            price: 20
        }

        
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })
})