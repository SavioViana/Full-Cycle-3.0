import express, {Request, Response} from "express"
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase"
import Customer from "../../../domain/customer/entity/customer"
import CustomerRepository from "../../customer/repository/sequelize/customer.repository"
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase"
import CustomerPresenter from "../presenters/customer.presenter"

export const customerRoute = express.Router()

customerRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase( new CustomerRepository())

    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city
            }}

        const output = await usecase.execute(customerDto)

        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})

customerRoute.get("/", async (req: Request, res: Response) => {
    
    const customerRepository = new CustomerRepository()

    const usecase = new ListCustomerUseCase(customerRepository)

    const output = await usecase.execute({})

    res.format({
        json: () => res.send(output),
        xml: () => res.send(CustomerPresenter.listXml(output))
    })

})