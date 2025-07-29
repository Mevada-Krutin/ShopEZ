import mongoose from 'mongoose';
import Product from './models/product.js'; 

const MONGO_URI = 'mongodb://127.0.0.1:27017/shopez'; 

const products = [
  {
    name: "Classic White T-Shirt",
    price: 299,
    description: "Soft cotton white t-shirt, perfect for casual wear.",
    image: "classic-white-tshirt.jpg",
  },
  {
    name: "Blue Denim Jeans",
    price: 999,
    description: "Stylish blue denim jeans with a slim fit design.",
    image: "blue-denim-jeans.jpg",
  },
  {
    name: "Running Sneakers",
    price: 1499,
    description: "Comfortable and lightweight sneakers for running.",
    image: "running-sneakers.jpg",
  },
  {
    name: "Leather Wallet",
    price: 599,
    description: "Premium genuine leather wallet with multiple compartments.",
    image: "leather-wallet.jpg",
  },
  {
    name: "Wireless Earbuds",
    price: 2499,
    description: "High-quality wireless earbuds with noise cancellation.",
    image: "wireless-earbuds.jpg",
  },
  {
    name: "Smart Watch",
    price: 3999,
    description: "Fitness-focused smart watch with heart rate monitor.",
    image: "smart-watch.jpg",
  },
  {
    name: "Backpack",
    price: 1299,
    description: "Durable and spacious backpack for everyday use.",
    image: "backpack.jpg",
  },
  {
    name: "Sunglasses",
    price: 799,
    description: "UV protected stylish sunglasses for all-day wear.",
    image: "sunglasses.jpg",
  },
  {
    name: "Formal Shirt",
    price: 899,
    description: "Elegant formal shirt suitable for office and events.",
    image: "formal-shirt.jpg",
  },
  {
    name: "Casual Sneakers",
    price: 1399,
    description: "Trendy casual sneakers with great grip.",
    image: "casual-sneakers.jpg",
  },
  {
    name: "Bluetooth Speaker",
    price: 1999,
    description: "Portable Bluetooth speaker with deep bass.",
    image: "bluetooth-speaker.jpg",
  },
  {
    name: "Graphic Hoodie",
    price: 1199,
    description: "Comfortable hoodie with cool graphic design.",
    image: "graphic-hoodie.jpg",
  },
  {
    name: "Fitness Band",
    price: 1499,
    description: "Track your activity and sleep with this fitness band.",
    image: "fitness-band.jpg",
  },
  {
    name: "Casual Shorts",
    price: 699,
    description: "Lightweight casual shorts for summer days.",
    image: "casual-shorts.jpg",
  },
  {
    name: "Denim Jacket",
    price: 1799,
    description: "Classic denim jacket with a modern cut.",
    image: "denim-jacket.jpg",
  },
  {
    name: "Sports Cap",
    price: 399,
    description: "Breathable sports cap for outdoor activities.",
    image: "sports-cap.jpg",
  },
  {
    name: "Leather Belt",
    price: 499,
    description: "Durable leather belt with metal buckle.",
    image: "leather-belt.jpg",
  },
  {
    name: "Casual Shirt",
    price: 799,
    description: "Light and comfortable casual shirt.",
    image: "casual-shirt.jpg",
  },
  {
    name: "Laptop Backpack",
    price: 1599,
    description: "Padded backpack designed to protect your laptop.",
    image: "laptop-backpack.jpg",
  },
  {
    name: "Wireless Mouse",
    price: 999,
    description: "Ergonomic wireless mouse with long battery life.",
    image: "wireless-mouse.jpg",
  }
];


async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Optional: Clear existing products before inserting
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log(`✅ Inserted ${inserted.length} products`);

    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  }
}

seed();
