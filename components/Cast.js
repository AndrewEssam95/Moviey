import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { image185, fallbackPersonImage } from "../configs/MovieDbApi";

const Cast = ({ cast, navigation }) => {
  return (
    <View>
      <Text className="text-lg text-white m-4">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                className="mr-4 items-center"
                key={index}
                onPress={() => navigation.navigate("Person", person)}>
                <View className="w-20 h-20 rounded-full overflow-hidden border items-center border-neutral-500 justify-center">
                  <Image
                    source={{
                      uri: image185(person.profile_path) || fallbackPersonImage,
                    }}
                    className="h-24 w-20 rounded-2xl"
                  />
                </View>
                <Text className="text-xs mt-1 text-white">
                  {person.character.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person.character}
                </Text>
                <Text className="text-xs mt-1 text-neutral-400">
                  {person.name.length > 10
                    ? person.name.slice(0, 10) + "..."
                    : person.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
