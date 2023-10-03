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
import {debounce} from "lodash"

import { useCallback, useState } from "react";
import { fetchlocation  } from "../api/weather";
const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState();
  const [location, setLocation] = useState([1, 2, 3]);
  
  const handleSearch =value=>{
 if(value.length>2){
  fetchlocation({cityName:value}).then(data=>{
      setLocation(data)
  })
 }

  }
  const handleLocation = (loc) => {
    console.log("location", loc);
  };
  const  handleTextDebounce =useCallback(debounce(handleSearch,1200),[])
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
          {location && location.length > 0 && showSearch  ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {location.map((loc, index) => {
                let showBorder = index + 1 != location.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <Pressable
                    onPress={handleLocation(loc)}
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
            London,
            <Text className="text-lg font-semibold text-gray-300">
              United Kingdom
            </Text>
          </Text>
          {/* weather  image */}
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/partlycloudy.png")}
              className="w-52 h-52"
            />
          </View>
          {/* celcious degree   */}
          <View className="space-y-2">
            <Text className="text-6xl ml-5 text-center font-bold text-white">
              {" "}
              23&#176;
            </Text>
            <Text className="text-xl ml-5 text-center text-white">
              Partly Cloudy
            </Text>
          </View>
          {/* other Stats */}
          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/wind.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">22Km</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/drop.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">23%</Text>
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
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11"/>
              <Text className="text-white ">Monday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11"/>
              <Text className="text-white ">Tuesday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11"/>
              <Text className="text-white ">Monday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11"/>
              <Text className="text-white ">Monday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11"/>
              <Text className="text-white ">Monday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
