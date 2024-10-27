import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { theme } from "../configs/theme";
import { HeartIcon } from "react-native-heroicons/solid";
import MoviesList from "../components/MoviesList";
import Loading from "../components/Loading";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../configs/MovieDbApi";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params;

  const [isFavorite, toggleFavorite] = useState(false);
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { gender, known_for_department, name, popularity, profile_path } = item;
  const { birthday, place_of_birth, biography } = person;

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovies(data.cast);
    setLoading(false);
  };

  return (
    <ScrollView
      className={`flex-1 bg-neutral-900`}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView
        className={`flex-row justify-between items-center z-20 w-full px-4 ${verticalMargin}`}>
        <TouchableOpacity
          style={{ backgroundColor: theme.background }}
          onPress={() => navigation.goBack()}
          className="rounded-lg p-1 justify-center items-center">
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-lg"
          onPress={() => toggleFavorite(!isFavorite)}>
          <HeartIcon size={35} color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="flex-row justify-center">
            <View className="items-center w-72 h-72 overflow-hidden rounded-full border-2 border-neutral-500">
              <Image
                source={{ uri: image342(profile_path) }}
                style={{ width: width * 0.74, height: height * 0.43 }}
              />
            </View>
          </View>
          <View className="my-4">
            <Text className="text-white font-bold text-center text-3xl">
              {name}
            </Text>
            <Text className="text-neutral-500 text-base text-center">
              {place_of_birth}
            </Text>
          </View>
          <View className="flex-row justify-center bg-gray-700 p-4 rounded-full mx-6">
            <View className="items-center border-r-2 border-r-neutral-400 px-2 space-y-1">
              <Text className="text-white font-bold tracking-wide">Gender</Text>
              <Text className="text-neutral-300 tracking-wide">
                {gender == "1" ? "Female" : "Male"}
              </Text>
            </View>
            <View className="items-center border-r-2 border-r-neutral-400 px-2 space-y-1">
              <Text className="text-white font-bold tracking-wide">
                Birthday
              </Text>
              <Text className="text-neutral-300 tracking-wide">{birthday}</Text>
            </View>
            <View className="items-center border-r-2 border-r-neutral-400 px-2 space-y-1">
              <Text className="text-white font-bold tracking-wide">
                Known for
              </Text>
              <Text className="text-neutral-300 tracking-wide">
                {known_for_department}
              </Text>
            </View>
            <View className="items-center px-2 space-y-1">
              <Text className="text-white font-bold tracking-wide">
                Popularity
              </Text>
              <Text className="text-neutral-300 tracking-wide">
                {popularity}
              </Text>
            </View>
          </View>
          <View className="m-4">
            <Text className="text-white text-lg mb-2">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">{biography}</Text>
          </View>
          <MoviesList title="Movies" data={personMovies} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
