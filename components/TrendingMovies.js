import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image342, image500 } from "../configs/MovieDbApi";

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mt-5">
      <Text className="text-xl text-white pl-2 mb-5 mx-3">Trending </Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} onPress={() => handleClick(item)} />
        )}
        firstItem={3}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
      />
    </View>
  );
};

const MovieCard = ({ item, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={{
          uri: `${image342(item.poster_path)}`,
        }}
        className="rounded-3xl"
        style={{ width: width * 0.6, height: height * 0.4 }}
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;
