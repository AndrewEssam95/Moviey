import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React from "react";
import { theme } from "../configs/theme";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../configs/MovieDbApi";

const { width, height } = Dimensions.get("window");

const MoviesList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();

  return (
    <View className="mt-5">
      <View className="flex-row justify-between items-center mx-5">
        <Text className="text-xl text-white mb-5">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={{ color: theme.text }} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}
        className="ml-5">
        {data.map((item, index) => {
          let movieName = item.title;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", item)}>
              <View className="space-y-1 mr-4">
                <Image
                  className="rounded-3xl"
                  source={{ uri: image185(item.poster_path) }}
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-white text-s">
                  {movieName?.length >= 18
                    ? movieName.substring(0, 18) + "..."
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MoviesList;
