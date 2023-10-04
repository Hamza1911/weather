import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "../Theme";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { weatherImages } from "../Constant";

import { useCallback, useState } from "react";
import { fetchWeatherforecast, fetchlocation } from "../api/weather";
const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState();
  const [locations, setlocations] = useState([]);
  const [weather, setWeather] = useState({});

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchlocation({ cityName: value }).then((data) => {
        setlocations(data);
      });
    }
  };
  const handlelocations = (loc) => {
    
    toggleSearch(false);
    setlocations([]);
    fetchWeatherforecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      console.log("got forecast :", data);
    });
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location } = weather;
  return (
    <View className="flex-1 ,relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className="w-full h-full absolute"
      />
      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4 relative z-50 mt-11">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search City "
                placeholderTextColor={"lightgray"}
                className="pl-6 h-10 pb-1 flex-1 text-base text-white"
              />
            ) : null}

            <Pressable
              onPress={() => toggleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </Pressable>
          </View>
          { locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((loc, index) => {
                let showBorder = index+1 != locations.length;
                let borderClass = showBorder
                  ? " border-b-2 border-b-gray-400"
                  : "";

                return (
                  <Pressable
                    onPress={handlelocations(loc)}
                    Key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1" +
                      borderClass
                    }
                  >
                    <MapPinIcon size="20" color={"grey"} />
                    <Text className="text-black text-lg ml-2">
                      {loc?.name},{loc?.country}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* forcast section */}
        <View className="mx-4 flex justify-around flex-1 mb-2">
          {/* loaction  */}
          <Text className="text-white text-center text-2xl font-bold">
            {location?.name},
            <Text className="text-lg font-semibold text-gray-300">
              {" " + location?.country}
            </Text>
          </Text>
          {/* weather  image */}
          <View className="flex-row justify-center">
            <Image
              source={weatherImages[current?.condition?.text]}
              className="w-52 h-52"
            />
          </View>
          {/* celcious degree   */}
          <View className="space-y-2">
            <Text className="text-6xl ml-5 text-center font-bold text-white">
              {current?.temp_c}&#176;
            </Text>
            <Text className="text-xl ml-5 text-center text-white">
              {current?.condition?.text}
            </Text>
          </View>
          {/* other Stats */}
          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/wind.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">
                {current?.wind_kph}KPH
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/drop.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">
                {current?.humidity}%
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/sun.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">
                6:05 AM
              </Text>
            </View>
          </View>
        </View>
        {/* forcast for nect days */}
        <View className=" mb-2 space-y-0">
          <View className="flex-row items-center mx-5 space-x-2">
            <CalendarDaysIcon size="22" color={"white"} />
            <Text className="text-white text-base"> Daily Forcast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            {weather?.forecast?.forecastday.map((item, index) => {
              let date =new Date(item.date);
              let options={weekday:'long'}
              let dayName=date.toLocaleDateString('en-US',options);
              dayName=dayName.split(',')[0];
              return (
                <View
                  key={index}
                  className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                  style={{ backgroundColor: theme.bgWhite(0.15) }}
                >
                  <Image
                    source={weatherImages[item?.day?.condition.text]}
                    className="h-11 w-11"
                  />
                  <Text className="text-white ">{dayName}</Text>
                  <Text className="text-white text-xl font-semibold">
                    {item.day?.avgtemp_c}&#176;
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
