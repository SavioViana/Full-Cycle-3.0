import CreateProductUseCase from "./create.product.usecase"



const input = {
    name: "Product 1",
    price: 10
}

const MockProductRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe("Test Unit create product use case", () => {

    it("Should create a product", async () => {
        
        const productRepository = MockProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const product = await productCreateUseCase.execute(input);

        expect(product).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it("Should throw error when name is empty", async () => {
        const productRepository = MockProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

       input.name = ""  
        
        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    })
})