const products = {
    bread: 10,
    milk: 15,
    apples: 20,
    chicken: 50,
    cheese: 40,
};

const order = {
    bread: 2,
    milk: 2,
    apples: 1,
    cheese: 1
};

function Cashier(name, productsDatabase) {
    this.name = name;
    this.productsDatabase = productsDatabase;
    this.customerMoney = 0;

    this.onSuccess = function(change) {
        console.log(`Спасибо за покупку, ваша сдача ${change}`);
    };

    this.onError = function() {
        console.log('Очень жаль, вам не хватает денег на покупки');
    };

    this.countTotalPrice = function(order) {
        let price = 0;

        for (const key in productsDatabase) {
            if (order[key] !== undefined) price += productsDatabase[key] * order[key];
        }
        return price;
    };

    this.getCustomerMoney = function(value) {
        this.customerMoney  = value;
    };

    this.countChange = function() {
        return (this.customerMoney >= totalPrice) ? (this.customerMoney - totalPrice) : null;
    };

    this.reset = function() {
        this.customerMoney = 0;
    };
};

const mango = new Cashier('Mango', products);

console.log(mango.name);
console.log(mango.productsDatabase);
console.log(mango.customerMoney);

const totalPrice = mango.countTotalPrice(order);
console.log(totalPrice);
mango.getCustomerMoney(300);
console.log(mango.customerMoney);

const change = mango.countChange();
console.log(change);

if(change !== null) {
  mango.onSuccess(change);
} else {
  mango.onError();
}

mango.reset();
console.log(mango.customerMoney);
