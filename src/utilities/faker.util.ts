import faker from 'k6/x/faker';

export const _faker = {
    orderRestrictions: () => {
        return {
            maxCaloriesPerSlice: faker.numbers.uintRange(0, 500),
            mustBeVegetarian: faker.numbers.boolean(),
            excludedIngredients: ["pepperoni"],
            excludedTools: ["knife"],
            maxNumberOfToppings: faker.numbers.uintRange(1, 5),
            minNumberOfToppings: faker.numbers.uintRange(0, 1)
        }
    }
}