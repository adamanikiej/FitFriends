import * as React from 'react';
import { 
  View, 
  Text, 
  ScrollView,
  StyleSheet,
  Pressable
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from './AuthProvider';
import { useIsFocused } from '@react-navigation/native';

const styles = StyleSheet.create({
  lineBreak: {
    marginTop: 12,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});

export function Home({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [cardData, setCardData] = React.useState([]);

  const isFocused = useIsFocused();

  const { authToken } = React.useContext(AuthContext);

  React.useEffect(() => {
    async function fetchCards() {
      // get content for card
      try {
        const {data} = await axios.get('http://localhost:3000/cards', {headers: {'Authorization': authToken}});
        console.log('data:', data);
        setCardData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }

    if (isFocused) {
      fetchCards();
    }

    const unsubscribe = navigation.addListener('focus', () => {
      fetchCards();
    })

    return unsubscribe;

  }, [isFocused]);

  function formatWhen(date) {
    let cardDate = new Date(date);
    let now = new Date();
    let diff = now.getTime() - cardDate.getTime();

    const mins = 60 * 1000
    const hrs = 60 * mins
    const days = 24 * hrs

    if (diff < mins) {
      return 'Just now';
    } else if (diff < hrs) {
      const minutes = Math.floor(diff / mins);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diff < days) {
      const hours = Math.floor(diff / hrs);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const dayss = Math.floor(diff / days);
      return `${dayss} ${dayss === 1 ? 'day' : 'days'} ago`;
    }

  }

  function renderLength(minutes) {
    const mins = minutes % 60;
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return (
        <Text style={{color: 'grey', fontFamily: 'PTSerif_400Regular', fontSize: 16}}>{`${hours} hour ${mins > 0 ? mins + ' minutes' : ''}`}</Text>
      )
    } else {
      return (
        <Text style={{color: 'grey', fontFamily: 'PTSerif_400Regular', fontSize: 16}}>{mins} minutes</Text>
      )
    }
  }
  
  // make the home page refetch the data so it includes a user's new workout or log
  // maybe somehow pass this?

  return (
    <ScrollView style={{backgroundColor: '#dedede'}}>
      {cardData.map((card, i) => {
        return (
          <View key={i} style={{backgroundColor: 'white', marginBottom: i !== cardData.length -1 ? 15 : 0}}> 
            <View style={{marginTop: 15}}>
              {/* top bar */}
                <View style={{marginLeft: 10, marginBottom: 8, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  {/* top top bar */}
                  <EvilIcons name="user" size={55} />
                  <View>
                    <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 18}}>{card.user.username}</Text>
                    <Text style={{fontFamily: 'PTSerif_400Regular', fontSize: 14, color: 'grey'}}>{formatWhen(card.date)}</Text>
                  </View>
                </View>
                <View style={{marginLeft: 20}}>
                  {/* top bottom bar */}
                  {/* card text */}
                  <Text style={{fontFamily: 'PTSerif_400Regular', fontSize: 18}}>{card.text}</Text>
                </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={[styles.lineBreak, {width: '94%', marginTop: 6}]} />
            </View>

            {(card.cardType === 'workout' || card.cardType === 'workoutLog') &&
              <View style={{marginTop: 5}}>
                {/* workout body part */}
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 22, marginRight: 22}}>
                  <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 18}}>{card.cardContent.workoutName}</Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    {Array.from({length: card.cardContent.workoutIntensity}, (_, i) => (
                      <Ionicons name="flame-outline" size={22} key={i}/>
                    ))}
                  </View>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 22, marginRight: 22, marginBottom: 5}}>
                  <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="timer-outline" size={20} style={{marginRight: 2, marginLeft: -2}}/>
                    {renderLength(card.cardContent.workoutLength)}
                  </View>
                  <View>
                    <Pressable
                      style={({ pressed }) => [
                        {backgroundColor: pressed ? '#3d85cc' : '#326DA8'},
                        {paddingVertical: 4, paddingHorizontal: 12, borderRadius: 6}
                      ]}
                      onPress={() => {
                        navigation.navigate('ViewWorkoutNavigator', {screen: 'ViewWorkout', tabBarVisible: true});
                      }}
                    >
                      <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 14, color: 'white', textAlign: 'center'}}>View</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={{marginLeft: 22}}>
                  {card.cardContent.exercises.map((exercise, j) => {
                    return (
                      <View key={j}>
                        <Text style={{fontFamily: 'PTSerif_400Regular', fontSize: 18}}>{`${exercise.sets.length}x ${exercise.name}`}</Text>
                      </View>
                    )
                  })}
                </View>

                <View style={{alignItems: 'center'}}>
                  <View style={[styles.lineBreak, {width: '94%', marginTop: 6}]} />
                </View>
              </View>
            }
            
            
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 5, marginBottom: 5}}>
              {/* bottom bar */}
              <Pressable style={{marginRight: 50}}>
                <MaterialCommunityIcons name="heart-outline" size={40} color={"#3d85cc"}/>
              </Pressable>
              <Pressable>
                <MaterialCommunityIcons name="comment-processing-outline" size={40} color={"#3d85cc"}/>
              </Pressable>
            </View>

          </View>
        )
      })}
      {/* <Text>Home</Text>
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
      <Ionicons name="home" size={45} color={"#3d85cc"}/> */}
    </ScrollView>
  );
}