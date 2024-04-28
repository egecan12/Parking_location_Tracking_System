# Parking Location Tracking System
This is a project which aims to help you to find your parking spot. Once you park your car, open the mobile app, click the send coords button. Then by swiping the right tab, you will view your parking location on the Map.

![Parking_System](https://github.com/egecan12/Parking_location_Tracking_System/assets/45043515/6236daf5-c6f2-4967-a2b6-51f8bc460067)

![Untitled](https://github.com/egecan12/Parking_location_Tracking_System/assets/45043515/51efcae3-b18f-4edc-9cc9-b5426cbdbc11)


This project consists of two main parts: `Location_Tracker_API` and `LocationTrackingApp`.

Requirements:
Node.JS
Expo
MongoDB

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

Developed by Egecan Kahyaoglu
