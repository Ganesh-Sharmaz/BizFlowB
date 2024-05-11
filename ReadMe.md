# BizFlow: Inventory Management System (Backend)

BizFlow is an inventory management system designed to streamline business operations by efficiently managing products, customers, vendors, and user authentication. This repository contains the backend codebase for BizFlow.

The frontend development is currently in progress and will be available soon.

## Features

- **User Authentication**: Secure authentication system using Nodemailer for email verification.
- **Product Management**: Manage inventory, add, update, delete products, and track stock levels.
- **Customer Management**: Maintain customer information, track purchases, and manage customer interactions.
- **Vendor Management**: Manage vendor details, track orders, and handle vendor relationships.
- **Media Files Upload**: Integration with Cloudinary for uploading and storing media files.

## Technologies Used

- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Nodemailer for email verification
- **File Upload**: Cloudinary
- **API Documentation**: Swagger (optional)

## Folder Structure

The repository is structured as follows:

'''bash
BizFlow
│
├── config
│   ├── cloudinary.js          # Cloudinary configuration
│   ├── db.js                  # MongoDB Atlas connection configuration
│   └── nodemailer.js          # Nodemailer configuration
│
├── controllers
│   ├── authController.js      # User authentication controller
│   ├── productController.js   # Product management controller
│   ├── customerController.js  # Customer management controller
│   ├── vendorController.js    # Vendor management controller
│   └── ...
│
├── models
│   ├── User.js                # User model
│   ├── Product.js             # Product model
│   ├── Customer.js            # Customer model
│   ├── Vendor.js              # Vendor model
│   └── ...
│
├── routes
│   ├── authRoutes.js          # Routes for user authentication
│   ├── productRoutes.js       # Routes for product management
│   ├── customerRoutes.js      # Routes for customer management
│   ├── vendorRoutes.js        # Routes for vendor management
│   └── ...
│
├── uploads                    # Uploaded media files directory
│   └── ...
│
└── server.js                  # Main application file

'''

## Setup Instructions

To set up the BizFlow backend on your local machine, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Configure your MongoDB Atlas connection details in `config/db.js`.
4. Configure Cloudinary settings in `config/cloudinary.js`.
5. Configure Nodemailer settings in `config/nodemailer.js`.
6. Run the application using `npm start`.
7. Access the backend API endpoints and explore the functionality.

## API Documentation

If you choose to document your API endpoints, you can use tools like Swagger to generate documentation. Add Swagger configuration to your project and document your endpoints accordingly.

## Contributing

Contributions to enhance existing features or add new functionalities are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).



to add nodemon as a dev dependency use - npm i -D nodemon
