import * as React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function Home({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [cardData, setCardData] = React.useState(undefined);


  React.useEffect(() => {
    async function fetchCards() {
      // get content for card
      try {
        const data = await axios.get('http://localhost:3000/cards');
        setCardData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  // const buildCard = (data) => {
  //   return (

  //   )
  // }

  return (
    <View>
      <Text>Home</Text>
      <MaterialCommunityIcons name="comment-processing-outline" size={45}/>
      <MaterialCommunityIcons name="comment-processing-outline" size={45} color={"#3d85cc"}/>
      <MaterialCommunityIcons name="heart-outline" size={45} color={"#3d85cc"}/>
      <MaterialCommunityIcons name="heart" size={45} color={"#3d85cc"}/>
      <MaterialCommunityIcons name="timer-outline" size={45} />
      <Ionicons name="flame-outline" size={45} />
      <EvilIcons name="user" size={45} />
      <EvilIcons name="user" size={45} color={"#3d85cc"}/>
      <EvilIcons name="user" size={45} />
      <FontAwesome5 name="dumbbell" size={35} />
      <FontAwesome5 name="dumbbell" size={35} color={"#3d85cc"}/>
      <Ionicons name="search" size={45} />
      <Ionicons name="search" size={45} color={"#3d85cc"}/>
      <Ionicons name="home" size={45} />
      <Ionicons name="home" size={45} color={"#3d85cc"}/>
    </View>
  );
}