This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

# Clone the repository:

Copy URL from Github repository ,
Open your terminal or command prompt.
Navigate to the directory where you want to clone the project.
Use the git clone command followed by the repository URL.

eg:- git clone https://github.com/your-username/your-repository-name.git

# Install Dependencies

If you are using npm : npm install
If you are using yarn : yarn install



# Set Up the firebase config on App.js folder

This I used for Authentication on Login and SignUp page.
android/app/google-services.json file is located match it to app.js for configuration

# For Backend

On backend folder Install Dependencies

If you are using npm : npm install
If you are using yarn : yarn install

Replace the IP address on server.js 

cd backend
node server.js

# For Frontend

After Login, It will redirect to Homepage where, Image and video Uploading can be done.
Folder name is Home.js
In this three Api is integrated where 
const response = await axios.get('http://192.188.56.542:3000/uploadedFiles'); 
To connect Backend with frontend replace the ip adress

# Run the project 

Run the project on Android : npx react-native run-android
Run the project on iOS (macOS required) : npx react-native run-ios