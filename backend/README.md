# Food Delivery Platform Backend

This backend system is designed for a food delivery platform. It supports user management, restaurant and menu management, order placement, and real-time order tracking.

## Technologies

-> **Node.js** with **Express**
-> **MongoDB** as the NoSQL database
-> **JWT** for authentication
-> **Socket.io** for real-time order tracking

## Installation

1.  -> Clone the repository
       git clone repositort url

    -> cd backend

2. Install mongoDB locally or use mongoDB Atlas for NoSQL Database Management

3. In the terminal install all necessary packages or dependcies with the syntax below:

        >npm install --save
            or
        >npm install npm install bcryptjs body-parser cors dotenv express jsonwebtoken mongoose socket.io validator --save

4. In the code within the directory run command >node index.js to perform crud operations 




## API

### User Management

1. **POST** `/api/auth/register` - Register a new user
2. **POST** `/api/auth/login` - Authenticate a user
3. **GET** `/api/auth/profile` - Get user profile (requires authentication)
4. **PUT** `/api/auth/profile` - Update user profile (requires authentication)

### Restaurant & Menu Management

1. **POST** `/api/restaurants` - Create a new restaurant
2. **POST** `/api/restaurants/:restaurantId/menu` - Add items to a restaurant’s menu

### Order Management

1. **POST** `/api/orders` - Place a new order
2. **GET** `/orders/{orderId}`: Get the details of an order, including its status and items.
3. **PUT** `/orders/{orderId}/status`: Update the order status (requires proper authorization).
4. **GET** `/orders`: List all orders for the logged in user.

### Realtime Order Tracking

1. **GET** `/api/orders/:orderId/track` - Track the order status in real-time
