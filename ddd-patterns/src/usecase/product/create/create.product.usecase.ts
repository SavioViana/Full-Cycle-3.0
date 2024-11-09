import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {

    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {

        const product = await ProductFactory.create('a', input.name, input.price);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}