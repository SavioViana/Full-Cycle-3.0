import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order-item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";

export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {

    try {
      await OrderModel.update(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          where: { id: entity.id },
        }
      )
      
      await OrderItemModel.destroy({
        where: { order_id: entity.id }
      })
  
      await OrderItemModel.bulkCreate(
        entity.items.map( (item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id
        }) )
      )
    } catch (error) {
      throw error
    }
   
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id: id },
      include: ["items"],
    })

    const items = orderModel.items.map(item => (
      new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity )
    ))

    return new Order(orderModel.id, orderModel.customer_id, items)
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    })

    return orderModels.map( orderModel => {

      const items = orderModel.items.map( item => (
        new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity )
      ))

      return new Order(orderModel.id, orderModel.customer_id, items)
    })
  }
}