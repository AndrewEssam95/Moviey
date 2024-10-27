import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { theme } from "../configs/theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MoviesList from "../components/MoviesList";
import Loading from "../components/Loading";
import {
  fetchMovieCredits,
  fetchMoviesDetails,
  fetchSimilarMovies,
  image500,
} from "../configs/MovieDbApi";

const { width, height } = Dimensions.get("window");

const MovieScreen = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params;

  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [SimilarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const {
    title,
    status,
    release_date,
    poster_path,
    runtime,
    genres,
    overview,
  } = movie;
  const year = new Date(release_date).getFullYear();

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMoviesDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    setLoading(false);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  };

  return (
    <ScrollView className="bg-neutral-900 flex-1">
      <View className="w-full">
        <SafeAreaView className="flex-row justify-between items-center absolute z-20 w-full px-4 mt-3">
          <TouchableOpacity
            style={{ backgroundColor: theme.background }}
            onPress={() => navigation.goBack()}
            className="rounded-lg p-1 justify-center items-center">
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-lg"
            onPress={() => toggleFavorite(!isFavorite)}>
            <HeartIcon
              size={35}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View className="w-full">
            <View>
              <Image
                source={{ uri: image500(poster_path) }}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1.0)",
                ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ width, height: height * 0.4 }}
                className="absolute bottom-0"
              />
            </View>
          </View>
        )}

        <View
          className="space-y-3 items-center"
          style={{ marginTop: -(height * 0.09) }}>
          <Text className="font-bold text-white text-4xl text-center tracking-wider mx-4">
            {title}
          </Text>
          <Text className="text-neutral-400 font-semibold text-base">
            {status} • {year} • {runtime} min
          </Text>
          <View className="flex-row justify-center items-center mx-4 space-x-2">
            {genres?.map((genre, index) => {
              let showDot = index + 1 != genres.length;
              return (
                <Text
                  className="text-neutral-400 font-semibold text-base text-center"
                  key={index}>
                  {genre.name}
                  {showDot ? " •" : ""}
                </Text>
              );
            })}
          </View>

          <Text className="mx-2 text-neutral-400 tracking-wide">
            {overview}
          </Text>
        </View>
        <Cast cast={cast} navigation={navigation} />
        <MoviesList
          title="Similar Movies"
          data={SimilarMovies}
          hideSeeAll={true}
        />
      </View>
    </ScrollView>
  );
};

export default MovieScreen;
