import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create('a', 'Product 1', 10);

const MockProductRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("Test Unit Find product use case", () => {

    it("Should find a product", async () => {
        
        const productRepository = MockProductRepository();
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