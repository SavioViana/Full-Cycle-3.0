import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create('a', 'Product 1', 10);

const input = {
    id: product.id,
    name: "Product 2",
    price: 20
}

const MockProductRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("Test Unit update product use case", () => {

    it("Should update a product", async () => {
        
        const productRepository = MockProductRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const product = await productUpdateUseCase.execute(input);

        expect(product).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    })
})