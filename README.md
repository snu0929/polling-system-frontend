Got it! Here’s the updated README documentation for the frontend, incorporating the use of styled-components and Socket.IO for real-time functionality:

markdown
Copy code
# Polling System Frontend

This is the frontend for the **Polling System**, built using **React.js**. It provides a user-friendly interface for creating, voting, and commenting on polls in real-time.

---

## 1. Setup

### Navigate to the project directory:
- Go to the project directory where the frontend code is located.

### Install dependencies:
- Use **Yarn** or **npm** to install the required packages.

### Start the development server:
- Start the server to run the application in development mode.

---

## 2. Environment Variables

Create a `.env` file in the root of the frontend directory to configure environment variables for your application. The following variables are required:

- **API_BASE_URL**: The base URL of your backend API. For example: `https://polling-system-backend-3jgu.onrender.com`

Example of how you use it in your code:
- The frontend makes API calls to the backend using Axios, as shown below:

```javascript
const response = await axios.post(
  "https://polling-system-backend-3jgu.onrender.com/polls/create",
  pollData
);
```
Make sure your .env file is not pushed to version control by adding it to .gitignore.

## 3. Available Routes
The frontend consists of several routes that provide navigation throughout the polling system:

/ - Home Page: Displays general information and allows users to navigate to various sections.
/create-poll - Poll Creation Page: Allows authenticated users to create a new poll.
/polls - Poll List Page: Lists all available polls for users to browse.
/polls/vote/
- Vote Poll Page: Allows users to vote on a specific poll.
/polls/results/
- Poll Results Page: Displays the results of a poll after voting.
/profile - User Profile Page: Displays user profile information.
## 4. Real-Time Functionality
The frontend integrates with Socket.IO for real-time voting, results updates, and commenting:

Socket.IO is used to establish a WebSocket connection with the backend, allowing the application to receive updates in real-time. This ensures that users see changes without needing to refresh the page, providing a seamless experience when voting and commenting.
5. Styling
The application uses styled-components for component-level styling. This allows for dynamic styling based on component props and ensures that styles are scoped to their respective components, promoting better maintainability.

## 6. State Management
The application uses React hooks (useState, useEffect) to manage state across the application. Polls, votes, and comments are fetched from the backend API and updated in real-time using WebSocket events.

## 7. Build for Production
To build the app for production, run the vercel --prod build command to bundle the React application into static files for deployment.

## deployed Link 
https://polling-system-g9a58cgkj-snu0929s-projects.vercel.app/

## Screenshots

![image](https://github.com/user-attachments/assets/4475bb42-5344-496d-9401-cc61b2df3c87) ![image](https://github.com/user-attachments/assets/ff45a7c1-3c5b-4557-b4d3-f8ec9ca4c01c)
![image](https://github.com/user-attachments/assets/d5ea7037-cec9-4013-867d-8b6c0d22ba34) ![image](https://github.com/user-attachments/assets/40433b64-1731-4d54-8e4d-e673acc34f5e)
![image](https://github.com/user-attachments/assets/a3510067-e5d7-4199-91ce-2bcf016c2dbc) ![image](https://github.com/user-attachments/assets/55d12b6e-2d83-479b-b20e-4537c708b9d2)







## License
This project is licensed under the MIT License. See the LICENSE file for details.

