class Hamburger {
    /**
     * @constructor
     * @param {String} size - Размер
     * @param {String} stuffing - Начинка
     */
    constructor(size, stuffing) {
      this._size = size;
      this._stuffing = stuffing;
      this._toppings = [];
    }
    /**
     * @param {String} topping - Тип добавки
     */
    addTopping(topping) {
        if (!this._toppings.includes(topping)) {
            this._toppings.push(topping);
        }
    }
  
    /**
     * @param {String} topping - Тип добавки
     */
    removeTopping(topping) {
      this._toppings = this._toppings.filter(item => item !== topping);
    }
  
    /**
     * Получить список toppings
     * @returns {Array} - Массив добавленных topping, содержит значения констант Hamburger.TOPPING_*
     */
    get toppings() {
        return this._toppings;
    }
  
    /**
     * Узнать размер гамбургера
     * @returns {String} - размер гамбургера
     */
    get size() {
        return this._size;
    }
  
    /**
     * Узнать начинку гамбургера
     * @returns {String} - начинка гамбургера
     */
    get stuffing () {
        return this._stuffing;
    }
  
    /**
     * Узнать цену гамбургера
     * @returns {Number} - Цена в деньгах
     */
    get price() {
        const hamburgerToppingsPrice = this._toppings.reduce((sum, item) => sum + Hamburger.TOPPINGS[item].price, 0);

        return Hamburger.SIZES[this._size].price + Hamburger.STUFFINGS[this._stuffing].price + hamburgerToppingsPrice;
    }
  
    /**
     * Узнать калорийность
     * @returns {Number} - Калорийность в калориях
     */
    get calories() {
        const hamburgerToppingsCalories = this._toppings.reduce((sum, item) => sum + Hamburger.TOPPINGS[item].calories, 0);

        return Hamburger.SIZES[this._size].calories + Hamburger.STUFFINGS[this._stuffing].calories + hamburgerToppingsCalories;
    }
}

Hamburger.SIZE_SMALL = 'SIZE_SMALL';
Hamburger.SIZE_LARGE = 'SIZE_LARGE'

Hamburger.SIZES = {
  [Hamburger.SIZE_SMALL]: {
    price: 30,
    calories: 50,
  },
  [Hamburger.SIZE_LARGE]: {
    price: 50,
    calories: 100,
  }
};

Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE';
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD';
Hamburger.STUFFING_MEAT = 'STUFFING_MEAT';

Hamburger.STUFFINGS = {
  [Hamburger.STUFFING_CHEESE]: {
    price: 15,
    calories: 20,
  },
  [Hamburger.STUFFING_SALAD]: {
    price: 20,
    calories: 5,
  },
  [Hamburger.STUFFING_MEAT]: {
    price: 35,
    calories: 15,
  }
};

Hamburger.TOPPING_SPICE = 'TOPPING_SPICE';
Hamburger.TOPPING_SAUCE = 'TOPPING_SAUCE';

Hamburger.TOPPINGS = {
  [Hamburger.TOPPING_SPICE]: {
    price: 10,
    calories: 0,
  },
  [Hamburger.TOPPING_SAUCE]: {
    price: 15,
    calories: 5,
  }
};

const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

hamburger.addTopping(Hamburger.TOPPING_SPICE);
console.log("Calories: ", hamburger.calories);
console.log("Price: ", hamburger.price);

hamburger.addTopping(Hamburger.TOPPING_SAUCE);
console.log("Price with sauce: ", hamburger.price);
console.log("Is hamburger large: ", hamburger.size === Hamburger.SIZE_LARGE);

hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Hamburger has %d toppings", hamburger.toppings.length);
