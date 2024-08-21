import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

export default class CustomerChangedAddressEvent implements EventInterface {
    dataTimeOccured: Date;
    eventData: any;
    id: string
    name: string
    addrees: string

    constructor(eventData: any) {
        this.dataTimeOccured = new Date()
        this.eventData = eventData
    }

}