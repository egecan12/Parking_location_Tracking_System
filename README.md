# Parking Location Tracking System

This project consists of two main parts: `Location_Tracker_API` and `LocationTrackingApp`.

## Location_Tracker_API

This is the backend of the project, built with Node.js, Express, and MongoDB. It provides endpoints to get and add coordinates.

### .env Variables

- `MONGO_URI`: Your MongoDB connection string.
- `PORT`: The port on which the server will run. If not provided, it defaults to 3000.

## LocationTrackingApp

This is the frontend of the project, built with React Native and Expo. It has two main screens: "Send Coordinates" and "Car Location".

### .env Variables

- `SERVER_URL`: The URL of your backend server.

## How to Run

### Location_Tracker_API

1. Navigate to the `Location_Tracker_API` directory.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file and define your `MONGO_URI` and `PORT` variables.
4. Run `npm start` to start the server.

### LocationTrackingApp

1. Navigate to the `LocationTrackingApp` directory.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file and define your `SERVER_URL` variable.
4. Run `npm start` to start the app.

## Note

Make sure to start the backend server before starting the app.
