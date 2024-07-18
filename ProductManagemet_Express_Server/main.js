import cors from 'cors';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
import { User } from './Models/User.model.js';
import { Product } from './Models/Product.model.js'
import { JWT_SECRET } from './Services/authService.js';
import { authMiddleware } from './Middleware/auth.js';
import { appendProductToUser, deleteProductFromUser } from './Services/updateUserProducts.js';


// const connection = await mongoose.connect("mongodb://localhost:27017/ProductManagement")
const connection = await mongoose.connect("mongodb+srv://sajeelmasih:mYfKybDLOeBBrPES@cluster0.wb0mjmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const app = express()
const port = 3000
app.use(cors()); // Use cors middleware
app.use(express.json());

// Apply the auth middleware to all routes except /signin and /signup
app.use(authMiddleware);

app.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products)
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Invalid Credentials' });
        }
        // If user and password are valid, generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: 'Sign in successful', token });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/searchProducts/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const products = await Product.find({ name: { $regex: query, $options: 'i' } }); // 'i' for case-insensitive search
        res.send(products)
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/getById/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const product = await Product.findById(_id);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/getAllProductsOfUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        // Retrieve all products of the user by their IDs
        const products = await Product.find({ _id: { $in: user.products } });

        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.post('/addProduct', async (req, res) => {
    try {
        const { name, description, price, inStock, catagory } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            inStock,
            catagory
        });
        await newProduct.save();
        // Append the new product's ID to the user's products array
        const result = await appendProductToUser(req.userId, newProduct._id);
        if (!result.success) {
            throw new Error(result.error);
        }
        res.status(201).send(newProduct); // Send the saved product with a 201 Created status
    } catch (err) {
        res.status(500).send({ error: err.message }); // Send error message in case of failure
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("user exists")
            return res.status(400).send({ error: 'User already exists with this email' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
        const newUser = new User({
            name, email, password: hashedPassword, products: []
        })
        // console.log(newUser)
        await newUser.save()
        res.status(201).send(true);
    } catch (err) {
        res.status(500).send({ error: err.message }); // Send error message in case of failure
    }

});

app.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(_id);
        if (deletedProduct) {
            // Delete the product's ID to the user's products array
            const result = await deleteProductFromUser(req.userId, _id);
            if (!result.success) {
                throw new Error(result.error);
            }
            res.status(200).send({ message: 'Product deleted successfully' });
        } else {
            res.status(200).send({ message: "Product not found" })
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/updateProduct', async (req, res) => {
    try {
        const { _id, name, description, price, inStock, catagory } = req.body;
        if (!_id) {
            return res.status(400).send({ message: 'Product ID is required' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            { name, description, price, inStock, catagory },
            { new: true, runValidators: true } // Return the updated document
        );

        if (updatedProduct) {
            res.status(200).send({ message: 'Product updated successfully', product: updatedProduct });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})