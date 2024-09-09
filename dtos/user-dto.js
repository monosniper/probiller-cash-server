export default class UserDto {
    id;
    email;
    cardsCount;
    balance;
    payed;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.cardsCount = model.cardsCount;
        this.balance = model.balance;
        this.payed = model.payed;
    }
}