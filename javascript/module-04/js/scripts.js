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
    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;

    this.greet = function() {
        console.log(`Здравствуйте, вас обслуживает ${this.name}`);
    };

    this.onSuccess = function() {
        if (this.changeAmount > 0) {
            console.log(`Спасибо за покупку, ваша сдача ${this.changeAmount}`);
        } else {
            console.log(`Спасибо за покупку`);
        }
    };

    this.onError = function() {
        console.log('Очень жаль, вам не хватает денег на покупки');
    };

    this.countTotalPrice = function(order) {
        const orders = Object.entries(order);

        for (const key in productsDatabase) {

            for (let i = 0; i < orders.length; i++) {
                if (key == orders[i][0]) {
                    this.totalPrice += productsDatabase[key] * orders[i][1];
                }
            }
        }
    };

    this.getCustomerMoney = function(value) {
        this.customerMoney  = value;
    };

    this.countChange = function() {
        if (this.customerMoney >= this.totalPrice) {
            this.changeAmount = this.customerMoney - this.totalPrice;            
            return this.changeAmount;
        } else {
            return null;
        }
    };

    this.reset = function() {
        this.totalPrice = 0;
        this.customerMoney = 0;
        this.changeAmount = 0;
    };
};

const mango = new Cashier('Mango', products);

console.log(mango.name);
console.log(mango.productsDatabase);
console.log(mango.totalPrice);
console.log(mango.customerMoney);
console.log(mango.changeAmount);

mango.greet();
mango.countTotalPrice(order);
console.log(mango.totalPrice);
mango.getCustomerMoney(300);
console.log(mango.customerMoney);

const result = mango.countChange();
console.log(result);

if(result !== null) {
  mango.onSuccess();
} else {
  mango.onError();
}

mango.reset();
console.log(mango.totalPrice);
console.log(mango.customerMoney);
console.log(mango.changeAmount);
