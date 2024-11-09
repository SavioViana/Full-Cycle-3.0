import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const productOne = new Product("1", "Product 1", 10);
const productTwo = new Product("2", "Product 2", 20);

const MockProductRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo]))
    }
}

describe("Test Unit list product use case", () => {
    it("Should list products", async () => {
        
        const productRepository = MockProductRepository();
        const productListUseCase = new ListProductUseCase(productRepository);

        const output = await productListUseCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(productOne.id);
        expect(output.products[0].name).toBe(productOne.name);
        expect(output.products[1].id).toBe(productTwo.id);
        expect(output.products[1].name).toBe(productTwo.name);
    })
})