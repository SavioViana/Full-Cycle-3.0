import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity{
    private _name: string;
    private _address!: Address
    private _active: boolean = false
    private _rewardPoints: number = 0

    constructor(id: string, name: string) {
        super()
        this._id = id;
        this._name = name
        this.validate()

        if (this.notification.hasErrors()) {
            throw new  NotificationError(this.notification.getErrors())
        }
    }

    
    public get name() : string {
        return this._name
    }
    
    
    public get rewardPoints() : number {
        return this._rewardPoints
    }
    
    public isActive() : boolean {
        return this._active
    }

    validate() {
        CustomerValidatorFactory.create().validate(this)
    }

    changeAddress(address: Address) {
        this._address = address
    }
    
    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined ) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true
    }

    desactivate() {
        this._active = false
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points
    }

    set Address(address: Address) {
        this._address = address
    }

    
    public get Address() : Address {
        return this._address
    }
    
    
    
}