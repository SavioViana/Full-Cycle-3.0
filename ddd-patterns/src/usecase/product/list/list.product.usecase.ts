import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {

        const products = await this.productRepository.findAll()

        return OutputMapper.toOutput(products);
    }
}


class OutputMapper {
    static toOutput(products: Product[]): OutputListProductDto {
        return {
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        }
    }
}