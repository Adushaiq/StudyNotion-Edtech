# StudyNotion Edtech Platform

Welcome to StudyNotion, an innovative ed-tech platform that revolutionizes the way students learn and instructors teach. Our platform is designed to offer a seamless and interactive learning experience, making education more accessible and engaging. StudyNotion is built using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS) for robust performance and user-friendly interfaces.

## Key Features

### 1. Interactive Learning Experience
StudyNotion prioritizes user engagement, providing students with an interactive learning experience. Through our intuitive interface, learners can access high-quality educational content, participate in discussions, and rate the effectiveness of the material.

### 2. OpenAI Chatbot Integration
Empower students with a powerful tool to clear doubts and enhance their learning experience. StudyNotion integrates OpenAI's API to offer a responsive and intelligent chatbot that assists students in real-time, answering questions and providing additional information.

### 3. Razorpay Payment Gateway
To facilitate a seamless payment process, StudyNotion incorporates the Razorpay Payment Gateway. Students and instructors can securely transact for premium courses, ensuring a hassle-free experience.

### 4. Assignments for Students
Promote active learning through the assignment feature. Instructors can create and assign tasks, projects, and assessments to students, fostering a practical understanding of the subjects. Students can submit their work directly through the platform.

### 5. Instructor Dashboard
Instructors have a dedicated dashboard to manage their courses, monitor student progress, and engage with learners. The dashboard provides analytics, allowing instructors to assess the effectiveness of their content and make data-driven improvements.

### 6. Student Dashboard
Students enjoy a personalized dashboard where they can access enrolled courses, view upcoming assignments, and track their progress. The dashboard serves as a central hub for their learning journey, enhancing organization and efficiency.

## Getting Started

To run StudyNotion locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/Adushaiq/StudyNotion-Edtech.git
   ```

2. Install dependencies for the frontend and backend:
   ```
   cd ./
   npm install
   cd ./server
   npm install
   ```

3. Set up MongoDB:
   - Create a MongoDB database and obtain the connection URI.
   - Update the `.env` file in the `server` directory with your MongoDB URI.

4. Configure OpenAI API:
   - Obtain an API key from OpenAI.
   - Update the `.env` file in the `server` directory with your OpenAI API key.

5. Configure Razorpay:
   - Sign up for a Razorpay account and obtain the API key and secret.
   - Update the `.env` file in the `server` directory with your Razorpay key and secret.

6. Configure Cloudinary:
   - Sign up for a Cloudinary account and obtain the API Key, Cloud name, Folder name and API Secret.
   - Update the `.env` file in the `server` directory.

7. Configure Gmail SMTP:
   - Sign up for a Google account and obtain the MAIL_HOST, MAIL_PASS, MAIL_USER.
   - Update the `.env` file in the `server` directory.
  
6. Run the application:
   ```
   npm run dev
   ```

Visit `http://localhost:3000` in your browser to access StudyNotion locally.

Following is an example of my env file:
```

# Cloudinary
API_KEY = 
API_SECRET = 
CLOUD_NAME = 
FOLDER_NAME = 


JWT_SECRET = 

# gmail
MAIL_HOST = 
MAIL_PASS = 
MAIL_USER = 

# DB Cluster
MONGODB_URL = 

# OpenAi 
OPENAI_API_KEY = 

PORT = 4000

# Rayzorpay
RAZORPAY_KEY = 
RAZORPAY_SECRET = 
```

Feel free to explore and contribute to the project. We believe in the power of education, and StudyNotion is here to make learning and teaching more enjoyable and effective for everyone.
