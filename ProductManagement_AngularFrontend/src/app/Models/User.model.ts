export class User {
    _id?: string; // Optional, for when the user is retrieved from the server
    name: string;
    email: string;
    password: string; // Hashed password when received from the server
    products: string[]; // Array of product IDs

    constructor(name: string, email: string, password: string, products: string[] = [], _id?: string) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.products = products;
    }
}
export class UserLogin {
    email: string;
    password: string;
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}