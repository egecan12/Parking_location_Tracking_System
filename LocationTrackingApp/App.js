import { SERVER_URL, SECRET_KEY } from "@env";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Alert } from "react-native";
import * as Location from "expo-location";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapView, { Marker } from "react-native-maps";

const SendCoordsScreen = () => {
  const [coords, setCoords] = useState(null);

  const getCoords = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);
  };

  useFocusEffect(
    React.useCallback(() => {
      getCoords();
    }, [])
  );

  const sendCoords = async () => {
    if (coords) {
      try {
        let url = SERVER_URL;
        let secretKey = SECRET_KEY;

        console.log(coords);

        let coordsForSchema = {
          Latitude: coords.latitude,
          Longitude: coords.longitude,
        };
        let response = await fetch(`${url}/addCoords`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "secret-key": secretKey,
          },
          body: JSON.stringify(coordsForSchema),
        });

        let text = await response.text();
        try {
          let json = JSON.parse(text);
          Alert.alert("Coordinates successfully sent!");
        } catch (error) {
          Alert.alert("JSON parsing error:", error.toString());
        }
      } catch (error) {
        Alert.alert("Error:", error.toString());
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={sendCoords}>
        <Text style={styles.buttonText}>Send Coords</Text>
      </TouchableOpacity>
    </View>
  );
};

const CarLocationScreen = () => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  const getCoordsDataFromDB = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/getCoords`, {
        headers: {
          "secret-key": "abcd123",
        },
      });
      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      console.log(sortedData[0]);
      return sortedData[0]; // Return the latest data
    } catch (err) {
      setError(err.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCoordsDataFromDB().then((data) => {
        setCoords({
          latitude: data.Latitude,
          longitude: data.Longitude,
        });
      });
    }, [])
  );

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {coords ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={coords} pinColor="red" />
        </MapView>
      ) : null}
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Send Coordinates" component={SendCoordsScreen} />
        <Tab.Screen name="Car Location" component={CarLocationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 50,
    width: 200,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  map: {
    flex: 1,
  },
});

export default App;
