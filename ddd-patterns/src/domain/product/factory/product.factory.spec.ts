import ProductFactory from "./product.factory"

describe("Product factory unit test", () => {
    
    it("should create a product type A", () => {

        const product = ProductFactory.create("a", 'Product A', 1)

        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product A")
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe("Product")

    })

    it("should create a product type B", () => {

        const product = ProductFactory.create("b", 'Product B', 1)

        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product B")
        expect(product.price).toBe(2)
        expect(product.constructor.name).toBe("ProductB")

    })

    it("should throw an erro when product type is not suported", () => {

        expect( () => ProductFactory.create("c", 'Product B', 1)).toThrow("Product type not suported")

    })
})