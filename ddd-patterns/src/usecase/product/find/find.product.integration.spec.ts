import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";


describe("Test Unit Find product use case", () => {

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
    });

    it("Should find a product", async () => {
        const product = new Product("1", "Product 1", 10);
        
        const productRepository = new ProductRepository();

        await productRepository.create(product);

        const productFindUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: product.id
        }
        const output = await productFindUseCase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    })
})