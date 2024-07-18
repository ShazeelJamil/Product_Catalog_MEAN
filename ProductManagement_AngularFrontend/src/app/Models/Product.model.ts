export class Product {
    _id?: string;
    name: string;
    description?: string;
    price: number;
    inStock: number;
    category: 'Electronics' | 'Clothing' | 'Machinery' | 'Others';

    constructor(
        name: string,
        price: number,
        inStock: number,
        category: 'Electronics' | 'Clothing' | 'Machinery' | 'Others',
        description?: string,
        id?: string
    ) {
        this._id = id || undefined; // Set to undefined to avoid type errors
        this.name = name;
        this.price = price;
        this.inStock = inStock;
        this.category = category;
        this.description = description;
    }
}
