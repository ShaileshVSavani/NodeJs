const  mongoose  = require("mongoose")
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL 
const connectDB = async () => {
   try {
     await mongoose.connect(MONGODB_URL);
     console.log('MongoDB connected...');
   } catch (error) {
       console.error(`Error connecting to MongoDB: ${error.message}`);
     process.exit(1);
   }
}

module.exports = connectDB;







// 1. **Repository Layer:**  
//    - **Purpose:** Contains direct database interactions (e.g., `createJob`, `getAllJobs`, etc.) with the Job model.
//    - **Example:** In `repository/job.js`, functions like `createJob` and `updateJob` directly interact with the database.

// 2. **Service Layer:**  
//    - **Purpose:** Implements business logic and validations. It calls the repository layer to perform the actual database operations.
//    - **Example:** In `service/job.js`, the `create` function checks if the company is verified by calling `getCompanyById` from the company repository before using `jobRepository.createJob` to create a new job.

// 3. **Controller Layer:**  
//    - **Purpose:** Handles HTTP requests and responses. It calls the service layer to perform business operations.
//    - **Example:** In `controller/job.js`, the `createJob` controller method receives the request, attaches necessary properties (like `req.body.userId`), and then calls `jobService.create` to handle job creation.

// ### Flow Summary

// - **Controller** receives an HTTP request and calls the **Service**.
// - **Service** performs necessary business logic (such as validating the company status) and then calls the **Repository**.
// - **Repository** executes the database operation and returns the result.
// - The result flows back up from the **Repository** to the **Service** and then to the **Controller**, which sends the final HTTP response.

// This separation ensures your code is modular, maintainable, and follows good design practices.