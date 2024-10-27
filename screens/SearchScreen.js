import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { searchMovies } from "../configs/MovieDbApi";
import { debounce } from "lodash";

const { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const navigation = useNavigation();
  const movieName = "Ant Man and The Wasp: Quantumania";
  const [resaults, setResaults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => console.log(data));
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="flex-row justify-between items-center m-4 border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pl-6 pb-1 text-base flex-1 font-semibold tracking-wide text-white"
          onChangeText={handleTextDebounce}
        />
        <TouchableOpacity
          className="bg-neutral-500 rounded-full m-1 p-3"
          onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size={25} strokeWidth={2.5} color={"white"} />
        </TouchableOpacity>
      </View>
      <Text className="font-bold text-white ml-5 mb-4">
        Resaults ({resaults.length})
      </Text>
      {/* {loading ? (
        <Loading />
      ) : resaults.length > 0 ? ( */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-3"
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        <View className="flex-row flex-wrap justify-between">
          {resaults.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate("Movie", item)}>
                <View className="space-y-2 mb-4">
                  <Image
                    source={require("../assets/images/Poster 1.jpg")}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                    className="rounded-3xl"
                  />
                  <Text className="text-neutral-300">{movieName}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
      <View className="items-center my-10">
        <Image
          source={require("../assets/images/night.jpg")}
          className="h-80 w-80"
        />
      </View>
      {/* )} */}
    </SafeAreaView>
  );
};

export default SearchScreen;
