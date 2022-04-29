/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    requireIngredients = []

    constructor(cookingTime) {
        // note that this check has been added
        if (this.constructor == Dish) {
            throw new Error("Abstract base class")
        }
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }

    getCookingTime() {
        return this.cookingTime;
    }

    // returns array of Ingredients that a dish requires
    requires() {
        return this.requireIngredients
    }
}
/* DONT CHANGE THIS CODE - END */


class Bolognese extends Dish {
    static #BologneseCookingTime = 10;

    // TODO: it looks slightly ugly to make instantiation here
    // but it is JS...
    requireIngredients = [new Ingridient('spaghetti', 1),
                          new Ingridient('tomato', 1)]

    constructor() {
        super(Bolognese.#BologneseCookingTime);
    }
}

class MashedPotatoes extends Dish {
    static #MashedPotatoesCookingTime = 8;
    requireIngredients = [new Ingridient('potato', 1)]

    constructor() {
        super(MashedPotatoes.#MashedPotatoesCookingTime);
    }
}

class Steak extends Dish {
    static #SteakCookingTime = 7;
    requireIngredients = [new Ingridient('meat', 1)]

    constructor() {
        super(Steak.#SteakCookingTime);
    }
}

class SteakAndFries extends Dish {
    constructor() {
        let stake = new Steak();
        let potato = new MashedPotatoes();
        super(stake.getCookingTime() + potato.getCookingTime())
        this.consist_of = [stake, potato]
    }

    requires() {
        let req = []
        this.consist_of.forEach(
            dish => req.push(dish.requires())
        )

        return req
    }

    async cook() {
        this.consist_of.forEach(dish => dish.wait())

        return this;
    }
}

class Ingridient {

    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }

    take() {
        if (this.amount === 0) {
            throw "there is no products left"
        }

        this.amount -= 1
    }
}

class Kitchen {
    // Note: here we would update the fastest one when we conduct an order
    orders = []

    constructor() {
        this.fridge = []
    }

    addToFridge(ingridients) {
        ingridients.forEach(
            ingridient => this.fridge.push(ingridient)
        )
    }   

    order(dish) {
        let fridgeCopy = [...this.fridge]

        // try to make transaction
        for (const dishIngredient of dish.requires()) {

 
            let tmp = fridgeCopy.find(
                ingr => ingr.name === dishIngredient.name
            )

            if (tmp === undefined) {
                throw "Error: there is no such ingredieent"
            }

            try {
                tmp.take()
            } catch (e) {
                throw "Error: Not enough ingridients in fridge"
            }
        }

        // commit transsaction
        this.fridge = fridgeCopy

        this.orders.push(dish)
    }

    cookFastestOrder() {
        this.orders = this.orders.sort(order => -order.getCookingTime())
        if (this.orders.length === 0) {
            throw "Error: There is nothing to cook"
        }
        let fastestDish = this.orders[0]
        fastestDish.cook();
        let idx = this.orders.indexOf(fastestDish)
        this.orders.splice(idx, idx)
    }

    cookAllOrders() {
        this.orders.forEach(order => order.cook());
        this.orders = []
    }  
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    try {
        kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
    } catch (e) {
        console.log(e)
        console.log("Hoooray...")
    }
}

test();
