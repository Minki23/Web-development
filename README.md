# Web Application Development Project

## Project Overview
This repository contains the implementation of a web application developed as part of a laboratory task for the **Web Application Programming** course. The project was collaboratively built by [Minki23](https://github.com/Minki23) and [Hardwak](https://github.com/hardwak). The application is a modern e-commerce platform built with:

- **Backend**: Java Spring Boot
- **Frontend**: React with TypeScript, utilizing **Next.js** for server-side rendering and routing
- **UI Components**: shadcn (a UI component library)

## Features
### Core Functionality
1. **Authentication**: Two types of users are supported:
   - **Registered Users**: Can browse products, add items to their cart, and view a summary of their orders.
   - **Administrators**: Have full CRUD access to manage products and categories.

2. **Shopping Cart**:
   - Users can add products to their cart.
   - Cart data is stored in cookies for a seamless user experience.

3. **Admin Panel**:
   - Administrators can add, delete, view, and edit products and categories.

4. **Order Summary**:
   - Users can view the cart summary with details of all items added.
   - Additional functionality includes:
     - Incrementing or decrementing product quantities
     - Removing items from the cart
     - Calculating the total cost of the order

### Technologies Used
- **Java Spring Boot**: Backend API development and user authentication
- **Next.js**: Frontend framework for server-side rendering and routing
- **React with TypeScript**: Strongly-typed, component-based UI development
- **shadcn UI**: Pre-designed and customizable UI components
- **Cookies**: Persistent storage for cart data

## Project Structure
### Backend (Java Spring Boot)
- `/src/main/java/com/example/ecommerce`:
  - `controller/`: REST endpoints for handling user authentication, products, categories, and cart operations.
  - `service/`: Business logic implementation.
  - `repository/`: Data persistence and database interactions.
  - `model/`: Entity classes for the database schema.

### Frontend (React + Next.js)
- `/pages`:
  - `index.tsx`: Landing page for the application.
  - `admin/`: Admin dashboard with CRUD views for products and categories.
  - `cart/`: Cart summary and order management page.
- `/components/`: Reusable UI components built with shadcn.
- `/hooks/`: Custom React hooks for state management and API calls.
