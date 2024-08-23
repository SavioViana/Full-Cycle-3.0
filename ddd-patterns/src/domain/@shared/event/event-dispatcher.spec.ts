import CustomerChangedAddressEvent from "../../customer/event/customer-changed-address.event";
import CustomerCreatedEvent from "../../customer/event/customer.created.event";
import CustomerChangedAddressHandler from "../../customer/event/handler/customer-changed-address.handler";
import { EnviaConsolerLog1Handler, EnviaConsolerLog2Handler } from "../../customer/event/handler/customer-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email.when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("shoud register an event handler", () => {
        
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
    })

    it("shoud unregister an event handler", () => {
        
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0)
    })

    it("shoud unregister all event handler", () => {
        
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined()
    })

    it("Notify an event handler", () => {
        
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        const spyEventHandler= jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        })

        // Quando o notity for executado o SendEmailWhenProductIsCreatedHandler deve ser chamado
        eventDispatcher.notify( productCreatedEvent )

        expect(spyEventHandler).toHaveBeenCalled()

    })

    
    it("Should Notify EnviaConsolerLogHandlers ", () => {
        
        const eventDispatcher = new EventDispatcher()
        const eventHandler1 = new EnviaConsolerLog1Handler()
        const eventHandler2 = new EnviaConsolerLog2Handler()

        const spyEventHandler1= jest.spyOn(eventHandler1, "handle")
        const spyEventHandler2= jest.spyOn(eventHandler2, "handle")

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2)


        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2)

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer Name",
        })

        eventDispatcher.notify( customerCreatedEvent )

        expect(spyEventHandler1).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
    })

    it("Should Notify ChangedAddressHandler ", () => {
        
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new CustomerChangedAddressHandler

        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler)


        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined()

        const customerCreatedEvent = new CustomerChangedAddressEvent({
            id: '"123',
            name: "Customer Name",
            address: 'Rua B, 5 - São paulo, 33325-000, SP'
        })

        eventDispatcher.notify( customerCreatedEvent )

        expect(spyEventHandler).toHaveBeenCalled()
    })
    
  
})