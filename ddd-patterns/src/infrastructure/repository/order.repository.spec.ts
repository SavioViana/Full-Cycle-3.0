import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order-item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";


describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderItemModel,
            ProductModel,
            OrderModel,
        ]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: "123",
                product_id: "123",
                },
            ],
        });
    });

    it("should updade a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository( );
        await orderRepository.create(order);

        const product2 = new Product("1234", "Product 2", 5);
        await productRepository.create(product2);

        const newOrderItem = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            2
        );

        order.addItems([ newOrderItem ])

        const orderRepository2 = new OrderRepository()

        await orderRepository2.update(order);
        

        const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
                {
                    id: newOrderItem.id,
                    name: newOrderItem.name,
                    price: newOrderItem.price,
                    quantity: newOrderItem.quantity,
                    order_id: "123",
                    product_id: "1234",
                },

            ],
        });
    });

    it("should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository( );
        await orderRepository.create(order);          

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        const foundedOrder =  await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: foundedOrder.id,
            customer_id: foundedOrder.customerId,
            total: order.total(),
            items: [
                {
                    id: foundedOrder.items[0].id,
                    name: foundedOrder.items[0].name,
                    price: foundedOrder.items[0].price,
                    quantity: foundedOrder.items[0].quantity,
                    order_id: foundedOrder.id,
                    product_id: foundedOrder.items[0].productId,
                },
            ],
        });
    });


    it("should all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository( );
        await orderRepository.create(order);

        const product2 = new Product("1234", "Product 2", 5);
        await productRepository.create(product2);

        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            2
        );

        const order2 = new Order('222', "123", [orderItem2])

        await orderRepository.create(order2);
     
        const orders = [order, order2]

        const expectedOrders = await orderRepository.findAll()

        expect(expectedOrders).toEqual(orders)
    });
});