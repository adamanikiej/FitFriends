import * as React from 'react';
import {
  StyleSheet,
  View, 
  Text,
  Pressable,
  LayoutAnimation,
  Keyboard,
  Modal,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from './AuthProvider';

const styles =StyleSheet.create({
  workoutContainer: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  topInputContainer: {
    width: '85%' 
  },
  inputContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginTop: 8
  },
  inputText: {
    fontFamily: 'PTSerif_400Regular', 
    fontSize: 16, 
    width: '50%'
  },
  text: {
    fontSize: 16, 
    fontFamily: 'PTSerif_400Regular'
  },
  input: {
    borderRadius: 6, 
    paddingLeft: 6, 
    padding: 4, 
    fontFamily: 'PTSerif_400Regular', 
    fontSize: 16, 
    width: '50%', 
    backgroundColor: '#D9D9D9'
  },
  lineBreak: {
    marginTop: 12,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  exerciseText: {
    fontFamily: 'PTSerif_700Bold', 
    fontSize: 24, 
    width: '50%'
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {

    width: '80%',
    height: '45%',
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topModalContent: {
    width: '90%',
    height: '88%'
  },
  bottomModalContent: {
    display: 'flex', 
    flexDirection: 'row', 
    marginTop: 7
  },
  bottomModalButtonLeft: {
    paddingVertical: 3,
    width: '45%', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 6, 
    borderWidth: 2,
    backgroundColor: '#D9D9D9',
    borderColor: '#326DA8'
  },
  bottomModalButtonRight: {
    paddingVertical: 3,
    width: '45%', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 6, 
    borderWidth: 2,
    borderColor: '#326DA8',
    backgroundColor: '#326DA8'
  },
  bottomModalButtonTextLeft: {
    color: '#326DA8',
    fontSize: 16, 
    fontFamily: 'PTSerif_400Regular'
  },
  bottomModalButtonTextRight: {
    color: 'white',
    fontSize: 16, 
    fontFamily: 'PTSerif_400Regular'
  },
  modalExerciseItem: {
    width: '100%', 
    backgroundColor: 'white', 
    marginTop: 10, 
    padding: 5, 
    paddingLeft: 8, 
    borderRadius: 6
  },
  modalSearchContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 4, 
    backgroundColor: 'white', 
    borderRadius: 6
  },
  modalSearchInput: {
    width: '90%',
    height: 35, 
    paddingLeft: 6, 
    fontSize: 16, 
    fontFamily: 'PTSerif_400Regular'
  },
  modalExerciseSelected: {
    borderWidth: 3,
    borderColor: '#326DA8'
  }
})

const screenWidth = Dimensions.get('window').width;

function ViewWorkouts({ route, navigation }, props) {
  const [workoutList, setWorkoutList] = React.useState([]);
  const [workoutLogList, setWorkoutLogList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { authToken } = React.useContext(AuthContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [workoutData, logData] = await Promise.all([
          axios.get('http://localhost:3000/workout/list', {headers: {'Authorization': authToken}}),
          axios.get('http://localhost:3000/workoutlog/list', {headers: {'Authorization': authToken}})
        ]);

        setWorkoutList(workoutData.data);
        setWorkoutLogList(logData.data);
        setLoading(false);
        
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, [])

  React.useEffect(() => {
    if (route.params) {
      const newWorkout = route.params.newWorkout;
      const newWorkoutLog = route.params.newWorkoutLog
      console.log('new param:', route.params)
      if (Object.keys(newWorkout).length !== 0) {
        setWorkoutList([...workoutList, newWorkout]);
      }
      if (Object.keys(newWorkoutLog).length !== 0) {
        setWorkoutLogList([...workoutLogList, newWorkoutLog]);
      }
    }
  }, [route.params])

  function renderLength(minutes) {
    const mins = minutes % 60;
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return (
        <Text style={{color: 'grey', fontFamily: 'PTSerif_400Regular', fontSize: 16}}>{hours} hour {mins} minutes</Text>
      )
    } else {
      return (
        <Text style={{color: 'grey', fontFamily: 'PTSerif_400Regular', fontSize: 16}}>{mins} minutes</Text>
      )
    }
  }

  function renderWorkouts(workouts) {
    return (
      <View>
        {workouts.map((workout, i) => {
          return (
            <View key={i} style={{alignItems: 'center', marginBottom: 12}}>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '87%'}}>
                <View>
                  <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 22}}>{workout.workoutName}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  {Array.from({length: workout.workoutIntensity}, (_, i) => (
                    <Ionicons name="flame-outline" size={25} key={i}/>
                  ))}
                </View>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '87%', marginBottom: 6}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons name="timer-outline" size={20} style={{marginRight: 2, marginLeft: -2}}/>
                  {renderLength(workout.workoutLength)}
                </View>
                <View>
                  <Pressable
                    style={({ pressed }) => [
                      {backgroundColor: pressed ? '#3d85cc' : '#326DA8'},
                      {paddingVertical: 4, paddingHorizontal: 12, borderRadius: 6}
                    ]}
                  >
                    <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 14, color: 'white', textAlign: 'center'}}>View</Text>
                  </Pressable>
                </View>
              </View>
              {i !== workouts.length - 1 &&
                <View style={[styles.lineBreak, {width: '94%'}]} />
              }
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <ScrollView>
      <View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 6}}>
          <View style={{marginLeft: 12, }}>
            <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 24}}>Workouts</Text>
          </View>
          <View style={{marginRight: 16}}>
            <Pressable 
              style={({ pressed }) => [
                {backgroundColor: pressed ? '#3d85cc' : '#326DA8'},
                {paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6}
              ]}
              onPress={() => {
                navigation.navigate('CreateWorkout');
            }}>
              <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 16, color: 'white', textAlign: 'center'}}>Create</Text>
            </Pressable>
          </View>
        </View>
        <View style={{alignItems: 'center', marginBottom: 14}}>
          <View style={[styles.lineBreak, {width: '94%'}]} />
        </View>
        <View>
          {/* List of all workouts */}
          {renderWorkouts(workoutList)}
        </View>
      </View>
      <View>
        <View style={{backgroundColor: '#dedede', height: 15}}/>
      </View>
      <View>
        <View >
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 6}}>
            <View style={{marginLeft: 12, }}>
              <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 24}}>Logged Workouts</Text>
            </View>
            <View style={{marginRight: 16}}>
              <Pressable 
                style={({ pressed }) => [
                  {backgroundColor: pressed ? '#3d85cc' : '#326DA8'},
                  {paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6}
                ]}
                onPress={() => {
                  navigation.navigate('CreateLog');
              }}>
                <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 16, color: 'white', textAlign: 'center'}}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center', marginBottom: 14}}>
          <View style={[styles.lineBreak, {width: '94%'}]} />
        </View>
        <View>
          {/* List of all logs */}
          {renderWorkouts(workoutLogList)}
        </View>

      </View>
    </ScrollView>
  )
}

function CreateWorkout({ navigation }) {
  const [currentExercise, setCurrentExercise] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [addedExercises, setAddedExercises] = React.useState([]);
  const [workoutName, setWorkoutName] = React.useState('');
  const [workoutLength, setWorkoutLength] = React.useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [workoutIntensity, setWorkoutIntensity] = React.useState('');
  const [modalInputFocused, setModalInputFocused] = React.useState(false);

  const { authToken } = React.useContext(AuthContext);

  //to get length:
  // const minutes = length.getMinutes() + length.getHours() * 60;

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [modalInputFocused])

  const exerciseList = ['Ab Crunch Machine', 'Ab Roller', 'Bear Crawls', 'Flutter Kicks', ' Bicycles', 'Plank', 
    'Side Plank', 'Crunches', 'Dead Bug', 'Hanging Knee Raises', 'Barbell Bicep Curls', 'Barbell Drag Bicep Curl', 
    'Preacher Curls', 'Standing Dumbbell Bicep Curls', 'Incline Dumbell Bicep Curls', 'Dumbbell Concentration Curls', 
    'Dumbbell Hammer Curls', 'Reverse Dumbbell Bicep Curls', 'Calf Raises', 'Barbell Bench Press', 'Barbell Incline Bench Press', 
    'Dumbbell Bench Press', 'Incline Dumbell Bench Press', 'Push-ups', 'Bench Cable Flyes', 'Machine Cable flyes', 
    'Machine Peck Dec', 'Barbell Decline Bench Press', 'Dumbbell Decline Bench Press', 'Dumbbell Floor Press', 'Chest Dips', 
    'Farmer\'s Carry', 'Abductor Machine', 'Adductor Machine', 'Barbell Squat', 'Goblet Squat', 'Squat', 'Barbell Hip Thrusts', 
    'Bulgarian Split Squat', 'Barbell Snatch', 'Dumbbell Lunges', 'Dumbbell Romanian Deadlift', 'Machine Hamstring Curl', 
    'Barbell Bent Over Rows', 'Dumbbell Bent Over Rows', 'T-Bar Rows', 'Cable Face Pulls', 'Dumbell Incline Bench Rows', 
    'Reverse Chest Flyes', 'Cable X-Pulls', 'Cable Lateral Raises', 'Dumbbell Lateral Raises', 'Machine Shoulder Press', 
    'Dumbbell Shoulder Press', 'Dumbbell Arnold Press', 'Barbell Shoulder Press', 'Barbell Front Raise', 'Dumbbell Front Raise', 
    'Cable Tricep Pull Down', 'Machine Tricep Dips', 'Cable Overhead Tricep Extensions', 'Barbell Close-Grip Press', 'Diamond Push-ups', 'Lat Pull-Down']

  function exerciseItem(exercise) {
    const isSelected = exercise === currentExercise;
    return (
      <View style={[styles.modalExerciseItem, isSelected && styles.modalExerciseSelected]} key={exercise}>
        <Pressable
          onPress={(e) => {
            isSelected ? setCurrentExercise(null) : setCurrentExercise(exercise);
          }}
        >
          <Text style={styles.text}>{exercise}</Text>
        </Pressable>
      </View>
    )
  }

  function handleAddExercise() {
    if (currentExercise !== null) {
      let newExercise = {
        name: currentExercise,
        sets: [
          {
            repCount: '',
            weight: ''
          }
        ]
      }
      setAddedExercises([...addedExercises, newExercise]);
    }
    setCurrentExercise(null);
    setModalInputFocused(false);
    setSearchTerm('');
    setModalVisible(false);
  }

  const handleSave = React.useCallback(async (exercises) => {
    let exerciseToSave = {
      workoutName: workoutName,
      workoutLength: workoutLength.getMinutes() + workoutLength.getHours() * 60,
      workoutIntensity: workoutIntensity,
      exercises: exercises
    }

    try {
      const {data} = await axios.post('http://localhost:3000/workout/create', exerciseToSave, {headers: {'Authorization': authToken}})
      // send data back
      navigation.navigate('ViewWorkouts', {newWorkout: data});
    } catch (e) {
      console.log(e)
    }
    
  }, [addedExercises])

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {handleSave(addedExercises)}}
        >
          <Text style={{color: '#007AFF', fontSize: 18}}>Save</Text>
        </Pressable>
      )

    })
  }, [navigation, addedExercises])

  return (
    <View onPress={() => {Keyboard.dismiss()}}>
      <View>
      {/* {console.log('addedExercises:', addedExercises)} */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {marginTop: modalInputFocused ?  -250 : 0}]}>
              <View style={styles.modalContent}>
                <View style={styles.topModalContent}>
                  <View style={styles.modalSearchContainer}>
                    <Ionicons name="search" size={22} style={{paddingLeft: 4}}/>
                    <TextInput 
                      value={searchTerm} 
                      onChangeText={(text) => setSearchTerm(text)} 
                      style={styles.modalSearchInput} 
                      placeholder='Search for Exercise'
                      onFocus={() => {setModalInputFocused(true)}}
                      onBlur={() => {setModalInputFocused(false)}}
                    />
                    </View>
                  <ScrollView>
                    {exerciseList.filter((exercise) => {
                      if (!(searchTerm.trim() === '')) {
                        return exercise.toLowerCase().trim().includes(searchTerm.toLowerCase().trim());
                      } else {
                        return true
                      }
                    }).map((exercise) => {
                      return exerciseItem(exercise);
                    })}
                  </ScrollView>
                </View>

                <View style={styles.bottomModalContent}>
                  <View style={{width: '50%', alignItems: 'center'}}>
                    <Pressable 
                      style={styles.bottomModalButtonLeft}
                      onPress={() => {
                        setCurrentExercise(null);
                        setModalInputFocused(false);
                        setSearchTerm('');
                        setModalVisible(false)
                      }}
                    >
                      <Text style={styles.bottomModalButtonTextLeft}>Cancel</Text>
                    </Pressable>
                  </View>
                  <View style={{width: '50%', alignItems: 'center'}}>
                    <Pressable onPress={() => {handleAddExercise()}} style={styles.bottomModalButtonRight}>
                      <Text style={styles.bottomModalButtonTextRight}>Add</Text>
                    </Pressable>
                  </View>
                  
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <View style={[styles.workoutContainer, {height: '100%'}]}>
          <View style={styles.topInputContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Name:</Text>
              <TextInput 
                style={styles.input}
                value={workoutName}
                onChangeText={(value) => {
                  setWorkoutName(value)
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.inputText, {paddingTop: 5}]}>Length (hh:mm):</Text>
              <View style={{width: '50%', alignItems: 'left'}}>
                <DateTimePicker
                  mode="time" 
                  value={workoutLength}
                  style={{marginLeft: -10}}
                  accentColor="#326DA8"
                  locale="en_GB"
                  onChange={(_, val) => {
                    setWorkoutLength(val);
                  }}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Intensity (1-5):</Text>
              <TextInput 
                style={styles.input}
                value={workoutIntensity.toString()}
                keyboardType='numeric'
                onChangeText={(value) => {
                  if (value === '' || /^[1-5]$/.test(value)) {
                    setWorkoutIntensity(value)
                  }
                }}
              />
            </View>
            <View style={styles.lineBreak}/>
            <View style={styles.inputContainer}>
              <Text style={styles.exerciseText}>Exercises:</Text>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <Pressable 
                  style={{width: '45%', justifyContent: 'center', borderRadius: 6, backgroundColor: '#326DA8'}}
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Text style={{textAlign: 'center', fontSize: 16, fontFamily: 'PTSerif_400Regular', color: 'white', paddingHorizontal: 20, paddingVertical: 5}}>Add</Text>
                </Pressable>
              </View>
            </View>
          </View>                                                     
          <ScrollView alwaysBounceVertical={false}>
            <View style={{width: screenWidth}}>
              {addedExercises.map((exercise, i) => {
                // console.log(exercise)
                return (
                  <View key={i} style={{marginTop: 15}}>
                    <View style={{display: 'flex', flexDirection: 'row', marginLeft: 10}}>
                      <Pressable 
                        style={{marginRight: 5, justifyContent: 'center'}}
                        onPress={() => {
                          editedExercise = [...addedExercises]
                          editedExercise.splice(i, 1)
                          setAddedExercises(editedExercise)
                        }}
                      >
                        <MaterialCommunityIcons name="minus-circle-outline" size={18} color={'red'}/>
                      </Pressable>
                      <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 18}}>{exercise.name}</Text>
                    </View>
                    <View>
                      {exercise.sets.map((set, j) => {
                        return (
                          <View style={{marginTop: j !== 0 ? 10 : 4}} key={j}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 40, marginLeft: 10}}>
                                {exercise.sets.length !== 1 ? (
                                  <Pressable 
                                    style={{marginRight: 5}}
                                    onPress={() => {
                                      if (exercise.sets.length !== 1) {
                                        const editedExercise = [...addedExercises]
                                        editedExercise[i].sets.splice(j, 1)
                                        setAddedExercises(editedExercise);
                                      }
                                    }}
                                  >
                                    <MaterialCommunityIcons name="minus-circle-outline" size={18} color={'red'}/>
                                  </Pressable>
                                  ) : (
                                    <View style={{marginRight: 23}} />
                                  ) 
                                }

                                <Text style={{fontFamily: 'PTSerif_400Regular', fontSize: 18, height: 28}}>set {j+1}:</Text>
                              </View>
                              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'PTSerif_400Regular', fontSize: 18, height: 30}}>reps:</Text>
                                <TextInput 
                                  style={{height: 30, width: 50, marginLeft: 5, borderRadius: 6, padding: 4, fontFamily: 'PTSerif_400Regular', fontSize: 18, backgroundColor: '#D9D9D9', textAlign: 'right'}}
                                  value={set.repCount.toString()}
                                  keyboardType="numeric"
                                  minValue={1}
                                  onChangeText={(text) => {
                                    if (text === '' || /^\d*$/.test(text)) {
                                      const editedExercise = [...addedExercises]
                                      editedExercise[i].sets[j].repCount = text
                                      setAddedExercises(editedExercise)
                                    }
                                  }}
                                  />
                              </View>
                              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'PTSerif_400Regular', fontSize: 18, height: 30}}>weight:</Text>
                                <TextInput 
                                  style={{height: 30, width: 50, marginLeft: 5, marginRight: 15, borderRadius: 6, padding: 4, fontFamily: 'PTSerif_400Regular', fontSize: 18, backgroundColor: '#D9D9D9', textAlign: 'right'}}
                                  value={set.weight.toString()}
                                  keyboardType="numeric"
                                  onChangeText={(text) => {
                                    const editedExercise = [...addedExercises]
                                    editedExercise[i].sets[j].weight = text
                                    setAddedExercises(editedExercise)
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        )
                      })}
                      <View style={{alignItems: 'center', marginTop: 15}}>
                        <Pressable 
                          style={{paddingVertical: 3, paddingHorizontal: 4, borderRadius: 6, borderWidth: 2, borderColor: '#326DA8', alignItems: 'center'}}
                          onPress={() => {
                            let newSet = {
                              repCount: '',
                              weight: ''
                            }
                            const editedExercise = [...addedExercises]
                            editedExercise[i].sets.push(newSet)
                            setAddedExercises(editedExercise)
                          }}  
                        >
                          <Text style={{color: '#326DA8', fontFamily: 'PTSerif_400Regular', fontSize: 16}}>Add Set</Text>
                        </Pressable>
                      </View>
                      {i !== addedExercises.length - 1 && 
                        <View style={styles.lineBreak} />
                      }
                      {i == addedExercises.length - 1 &&
                        <View style={{marginBottom: 20}} />
                      }
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

function CreateLog({ navigation }) {
  const [currentExercise, setCurrentExercise] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [addedExercises, setAddedExercises] = React.useState([]);
  const [workoutName, setWorkoutName] = React.useState('');
  const [workoutLength, setWorkoutLength] = React.useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [workoutIntensity, setWorkoutIntensity] = React.useState('');
  const [workoutDate, setWorkoutDate] = React.useState(new Date());
  const [modalInputFocused, setModalInputFocused] = React.useState(false);

  const { authToken } = React.useContext(AuthContext);

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [modalInputFocused])

  const exerciseList = ['Ab Crunch Machine', 'Ab Roller', 'Bear Crawls', 'Flutter Kicks', ' Bicycles', 'Plank', 
    'Side Plank', 'Crunches', 'Dead Bug', 'Hanging Knee Raises', 'Barbell Bicep Curls', 'Barbell Drag Bicep Curl', 
    'Preacher Curls', 'Standing Dumbbell Bicep Curls', 'Incline Dumbell Bicep Curls', 'Dumbbell Concentration Curls', 
    'Dumbbell Hammer Curls', 'Reverse Dumbbell Bicep Curls', 'Calf Raises', 'Barbell Bench Press', 'Barbell Incline Bench Press', 
    'Dumbbell Bench Press', 'Incline Dumbell Bench Press', 'Push-ups', 'Bench Cable Flyes', 'Machine Cable flyes', 
    'Machine Peck Dec', 'Barbell Decline Bench Press', 'Dumbbell Decline Bench Press', 'Dumbbell Floor Press', 'Chest Dips', 
    'Farmer\'s Carry', 'Abductor Machine', 'Adductor Machine', 'Barbell Squat', 'Goblet Squat', 'Squat', 'Barbell Hip Thrusts', 
    'Bulgarian Split Squat', 'Barbell Snatch', 'Dumbbell Lunges', 'Dumbbell Romanian Deadlift', 'Machine Hamstring Curl', 
    'Barbell Bent Over Rows', 'Dumbbell Bent Over Rows', 'T-Bar Rows', 'Cable Face Pulls', 'Dumbell Incline Bench Rows', 
    'Reverse Chest Flyes', 'Cable X-Pulls', 'Cable Lateral Raises', 'Dumbbell Lateral Raises', 'Machine Shoulder Press', 
    'Dumbbell Shoulder Press', 'Dumbbell Arnold Press', 'Barbell Shoulder Press', 'Barbell Front Raise', 'Dumbbell Front Raise', 
    'Cable Tricep Pull Down', 'Machine Tricep Dips', 'Cable Overhead Tricep Extensions', 'Barbell Close-Grip Press', 'Diamond Push-ups', 'Lat Pull-Down']

  function exerciseItem(exercise) {
    const isSelected = exercise === currentExercise;
    return (
      <View style={[styles.modalExerciseItem, isSelected && styles.modalExerciseSelected]} key={exercise}>
        <Pressable
          onPress={(e) => {
            isSelected ? setCurrentExercise(null) : setCurrentExercise(exercise);
          }}
        >
          <Text style={styles.text}>{exercise}</Text>
        </Pressable>
      </View>
    )
  }

  function handleAddExercise() {
    if (currentExercise !== null) {
      let newExercise = {
        name: currentExercise,
        sets: [
          {
            repCount: '',
            weight: ''
          }
        ]
      }
      setAddedExercises([...addedExercises, newExercise]);
    }
    setCurrentExercise(null);
    setModalInputFocused(false);
    setSearchTerm('');
    setModalVisible(false);
  }

  const handleSave = React.useCallback(async (exercises) => {
    let exerciseToSave = {
      workoutName: workoutName,
      workoutLength: workoutLength.getMinutes() + workoutLength.getHours() * 60,
      workoutIntensity: workoutIntensity,
      workoutDate: workoutDate,
      exercises: exercises
    }

    try {
      const {data} = await axios.post('http://localhost:3000/workoutlog/create', exerciseToSave, {headers: {'Authorization': authToken}})
      // send data back
      console.log('log:', data)
      navigation.navigate('ViewWorkouts', {newWorkoutLog: data});
    } catch (e) {
      console.log(e)
    }
    
  }, [addedExercises])

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {handleSave(addedExercises)}}
        >
          <Text style={{color: '#007AFF', fontSize: 18}}>Save</Text>
        </Pressable>
      )

    })
  }, [navigation, addedExercises])

  return (
    <View onPress={() => {Keyboard.dismiss()}}>
      <View>
      {/* {console.log('addedExercises:', addedExercises)} */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {marginTop: modalInputFocused ?  -250 : 0}]}>
              <View style={styles.modalContent}>
                <View style={styles.topModalContent}>
                  <View style={styles.modalSearchContainer}>
                    <Ionicons name="search" size={22} style={{paddingLeft: 4}}/>
                    <TextInput 
                      value={searchTerm} 
                      onChangeText={(text) => setSearchTerm(text)} 
                      style={styles.modalSearchInput} 
                      placeholder='Search for Exercise'
                      onFocus={() => {setModalInputFocused(true)}}
                      onBlur={() => {setModalInputFocused(false)}}
                    />
                    </View>
                  <ScrollView>
                    {exerciseList.filter((exercise) => {
                      if (!(searchTerm.trim() === '')) {
                        return exercise.toLowerCase().trim().includes(searchTerm.toLowerCase().trim());
                      } else {
                        return true
                      }
                    }).map((exercise) => {
                      return exerciseItem(exercise);
                    })}
                  </ScrollView>
                </View>

                <View style={styles.bottomModalContent}>
                  <View style={{width: '50%', alignItems: 'center'}}>
                    <Pressable 
                      style={styles.bottomModalButtonLeft}
                      onPress={() => {
                        setCurrentExercise(null);
                        setModalInputFocused(false);
                        setSearchTerm('');
                        setModalVisible(false)
                      }}
                    >
                      <Text style={styles.bottomModalButtonTextLeft}>Cancel</Text>
                    </Pressable>
                  </View>
                  <View style={{width: '50%', alignItems: 'center'}}>
                    <Pressable onPress={() => {handleAddExercise()}} style={styles.bottomModalButtonRight}>
                      <Text style={styles.bottomModalButtonTextRight}>Add</Text>
                    </Pressable>
                  </View>
                  
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <View style={[styles.workoutContainer, {height: '100%'}]}>
          <View style={styles.topInputContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Name:</Text>
              <TextInput 
                style={styles.input}
                value={workoutName}
                onChangeText={(value) => {
                  setWorkoutName(value)
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.inputText, {paddingTop: 5, width: '40%'}]}>Date:</Text>
              <View style={{width: '60%', alignItems: 'left'}}>
                <DateTimePicker
                  mode="datetime" 
                  value={workoutDate}
                  style={{marginLeft: -10}}
                  accentColor="#326DA8"
                  onChange={(_, val) => {
                    setWorkoutDate(val);
                  }}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.inputText, {paddingTop: 5}]}>Length (hh:mm):</Text>
              <View style={{width: '50%', alignItems: 'left'}}>
                <DateTimePicker
                  mode="time" 
                  value={workoutLength}
                  style={{marginLeft: -10}}
                  accentColor="#326DA8"
                  locale="en_GB"
                  onChange={(_, val) => {
                    setWorkoutLength(val);
                  }}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Intensity (1-5):</Text>
              <TextInput 
                style={styles.input}
                value={workoutIntensity.toString()}
                keyboardType='numeric'
                onChangeText={(value) => {
                  if (value === '' || /^[1-5]$/.test(value)) {
                    setWorkoutIntensity(value)
                  }
                }}
              />
            </View>
            <View style={styles.lineBreak}/>
            <View style={styles.inputContainer}>
              <Text style={styles.exerciseText}>Exercises:</Text>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <Pressable 
                  style={{width: '45%', justifyContent: 'center', borderRadius: 6, backgroundColor: '#326DA8'}}
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Text style={{textAlign: 'center', fontSize: 16, fontFamily: 'PTSerif_400Regular', color: 'white', paddingHorizontal: 20, paddingVertical: 5}}>Add</Text>
                </Pressable>
              </View>
            </View>
          </View>                                                     
          <ScrollView alwaysBounceVertical={false}>
            <View style={{width: screenWidth}}>
              {addedExercises.map((exercise, i) => {
                // console.log(exercise)
                return (
                  <View key={i} style={{marginTop: 15}}>
                    <View style={{display: 'flex', flexDirection: 'row', marginLeft: 10}}>
                      <Pressable 
                        style={{marginRight: 5, justifyContent: 'center'}}
                        onPress={() => {
                          editedExercise = [...addedExercises]
                          editedExercise.splice(i, 1)
                          setAddedExercises(editedExercise)
                        }}
                      >
                        <MaterialCommunityIcons name="minus-circle-outline" size={18} color={'red'}/>
                      </Pressable>
                      <Text style={{fontFamily: 'PTSerif_700Bold', fontSize: 18}}>{exercise.name}</Text>
                    </View>
                    <View>
                      {exercise.sets.map((set, j) => {
                        return (
                          <View style={{marginTop: j !== 0 ? 10 : 4}} key={j}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 40, marginLeft: 10}}>
                                {exercise.sets.length !== 1 ? (
                                  <Pressable 
                                    style={{marginRight: 5}}
                                    onPress={() => {
                                      if (exercise.sets.length !== 1) {
                                        const editedExercise = [...addedExercises]
                                        editedExercise[i].sets.splice(j, 1)
                                        setAddedExercises(editedExercise);
                                      }
                                    }}
                                  >
                                    <MaterialCommunityIcons name="minus-circle-outline" size={18} color={'red'}/>
                                  </Pressable>
                                  ) : (
                                    <View style={{marginRight: 23}} />
                                  ) 
                                }

                                <Text style={{fontFamily: 'PTSerif_400Regular', fontSize: 18, height: 28}}>set {j+1}:</Text>
                              </View>
                              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'PTSerif_400Regular', fontSize: 18, height: 30}}>reps:</Text>
                                <TextInput 
                                  style={{height: 30, width: 50, marginLeft: 5, borderRadius: 6, padding: 4, fontFamily: 'PTSerif_400Regular', fontSize: 18, backgroundColor: '#D9D9D9', textAlign: 'right'}}
                                  value={set.repCount.toString()}
                                  keyboardType="numeric"
                                  minValue={1}
                                  onChangeText={(text) => {
                                    if (text === '' || /^\d*$/.test(text)) {
                                      const editedExercise = [...addedExercises]
                                      editedExercise[i].sets[j].repCount = text
                                      setAddedExercises(editedExercise)
                                    }
                                  }}
                                  />
                              </View>
                              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'PTSerif_400Regular', fontSize: 18, height: 30}}>weight:</Text>
                                <TextInput 
                                  style={{height: 30, width: 50, marginLeft: 5, marginRight: 15, borderRadius: 6, padding: 4, fontFamily: 'PTSerif_400Regular', fontSize: 18, backgroundColor: '#D9D9D9', textAlign: 'right'}}
                                  value={set.weight.toString()}
                                  keyboardType="numeric"
                                  onChangeText={(text) => {
                                    const editedExercise = [...addedExercises]
                                    editedExercise[i].sets[j].weight = text
                                    setAddedExercises(editedExercise)
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        )
                      })}
                      <View style={{alignItems: 'center', marginTop: 15}}>
                        <Pressable 
                          style={{paddingVertical: 3, paddingHorizontal: 4, borderRadius: 6, borderWidth: 2, borderColor: '#326DA8', alignItems: 'center'}}
                          onPress={() => {
                            let newSet = {
                              repCount: '',
                              weight: ''
                            }
                            const editedExercise = [...addedExercises]
                            editedExercise[i].sets.push(newSet)
                            setAddedExercises(editedExercise)
                          }}  
                        >
                          <Text style={{color: '#326DA8', fontFamily: 'PTSerif_400Regular', fontSize: 16}}>Add Set</Text>
                        </Pressable>
                      </View>
                      {i !== addedExercises.length - 1 && 
                        <View style={styles.lineBreak} />
                      }
                      {i == addedExercises.length - 1 &&
                        <View style={{marginBottom: 20}} />
                      }
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const Stack = createNativeStackNavigator();

export function Workout({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ViewWorkouts"
      screenOptions={{
        // headerShown: false
        headerStyle: {
          backgroundColor: '#dedede',
        },
        headerTitleStyle: {
          fontSize: 28,
          fontFamily: 'AbrilFatface_400Regular'
        },
        // headerTitle: 'Fit Friends',
        tabBarLabelStyle: {
          fontSize: 12
        },
      }}
    >
      <Stack.Screen name="ViewWorkouts" component={ViewWorkouts} options={{title: 'Fit Friends'}} initialParams={{ newWorkout: {}, newWorkoutLog: {}}}/>
      <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
      <Stack.Screen name="CreateLog" component={CreateLog} options={{title: 'Create Log'}}/>
    </Stack.Navigator>
  );
}