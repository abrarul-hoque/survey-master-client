# Project Name : SurveyMaster

SurveyMaster is a comprehensive web application designed to create, manage, and participate in surveys. The platform provides an intuitive user interface for survey creation, robust backend support for managing survey data, and engaging features for users to interact with surveys. Whether you're looking to gather opinions, conduct research, or simply engage with your audience, SurveyMaster offers a seamless and efficient solution.

## Live Link
(https://survey-master.netlify.app/)

## Admin Credentials

- **Email:** abrar@jubair.com
- **Password:** Abrar@2024


## Features

### 1. User-Friendly Interface
- **Responsive Design:** Ensures a smooth experience across devices, including desktops, tablets, and smartphones.
- **Dynamic Animations:** Utilizes AOS (Animate On Scroll) to enhance user experience with engaging animations.
- **Hover Effects:** Leveraging `hover_min.css` for subtle and interactive hover effects.

### 2. Survey Management
- **Create Surveys:** Surveyors can easily create and update surveys with various question types and options.
- **Featured Surveys:** Highlight the most voted surveys to encourage participation.
- **Recent Surveys:** Display the latest surveys to keep the content fresh and engaging.

### 3. Participation and Voting
- **Interactive Surveys:** Users can participate in surveys by casting their votes on different options.
- **Vote Counting:** The system automatically counts votes and displays results in real-time.
- **Reporting:** Normal users can report inappropriate surveys for review.

### 4. User Types and Permissions
- **Normal Users:** 
  - Participate in surveys.
  - Report inappropriate surveys.
  - View participated and reported surveys on their dashboard.
- **Pro Users:**
  - All normal user functionalities.
  - Comment on surveys.
  - View participated, reported, and commented surveys on their dashboard.
- **Surveyors:**
  - Create and update surveys.
  - View table and chart views of their surveys.
  - View survey responses.
- **Admins:**
  - Change user roles (e.g., from user to surveyor).
  - Approve payments for pro user upgrades.
  - Manage users.
  - Filter users.
  - Manage surveys (publish, unpublish, and provide feedback when unpublishing).

### 5. Administrative Tools
- **Survey Sorting:** Surveys can be sorted based on the number of votes to identify popular topics.
- **Error Handling:** Robust error handling ensures smooth operation and user satisfaction.
- **Payment Approval:** Admins can view payment information and approve upgrades to pro user status.
- **Table and Chart Toggle:** Dashboards for users, surveyors, and admins include a toggle system for viewing data in table or chart format.
- **Filter Users:** Admins can filter users based on various criteria for better management and oversight.

### 6. Contact and Support
- **Contact Form:** Users can reach out to the support team via a built-in contact form.
- **Validation:** The form includes validation to ensure all necessary information is provided.

## Technologies Used

### Frontend
- **React:** For building a dynamic and responsive user interface.
- **AOS (Animate On Scroll):** To add animations and improve user engagement.
- **React-Hook-Form:** For managing form state and validation.
- **React Router:** For managing navigation and routing within the application.
- **Tanstack Query:** For efficient data fetching, caching, and synchronization.
- **ShadcnUI:** For consistent and customizable UI components.
- **hover_min.css:** For adding interactive hover effects to elements.

### Backend
- **Axios:** For making HTTP requests to the server and handling API calls.
- **Node.js and Express:** For backend support and handling requests.
- **MongoDB:** For database management and storage of survey data.
- **JSON Web Token (JWT):** For secure authentication and authorization.
- **Stripe:** For handling payment processing and upgrading users to pro status.

### Other Tools
- **Moment.js:** For parsing, validating, and manipulating dates and times.
- **Firebase:** For hosting, authentication, and real-time database services.
- **Helmet:** For managing document head and improving SEO.
- **Tailwind CSS:** For styling and responsive design.
- **Git:** For version control and collaboration.

## Local Installation Guide for SurveyMaster
If you wish to clone the SurveyMaster repository and run it locally on your machine, follow these steps:

**Prerequisites**
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (v4.x or higher)
- Git

**Step 1: Clone the Repository**
First, clone the repository from GitHub to your local machine using the following command:

git clone https://github.com/abrarul-hoque/survey-master.git

## Navigate into the project directory:
cd survey-master

**Step 2: Install Dependencies**
Install the necessary dependencies for both the frontend and backend:

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

**Step 3: Set Up Environment Variables**
Create a .env file in the server directory and add the following environment variables:

env
Copy code
# Server Environment Variables
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

# Firebase Configuration (if used for hosting and authentication)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id

# Client Environment Variables
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
Replace your_mongodb_connection_string, your_jwt_secret, your_stripe_secret_key, and Firebase configuration values with your actual credentials.

**Step 4: Start the Backend Server**
In the server directory, start the backend server:

bash
Copy code
npm start
This will start the server on http://localhost:5000.

**Step 5: Start the Frontend Server**
Open a new terminal window, navigate to the client directory, and start the frontend server:

bash
Copy code
cd client
npm start
This will start the frontend on http://localhost:3000.

**Step 6: Access the Application**
Open your web browser and navigate to http://localhost:3000 to access the SurveyMaster application.

## Troubleshooting
Ensure MongoDB is running on your local machine or the connection string is correctly pointing to your MongoDB instance.
Verify that all required environment variables are correctly set up.
Check the console logs for any errors and follow the error messages for troubleshooting.

## Contact

For any questions or feedback, feel free to reach out to us via the contact form on the website or open an issue on GitHub.
