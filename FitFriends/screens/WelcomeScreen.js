import * as React from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  Keyboard, 
  TextInput, 
  Pressable, 
  TouchableWithoutFeedback, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity, 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import {AuthContext, AuthProvider} from './AuthProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  titleContainer: {
    paddingTop: 200,
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 36,
    fontFamily: 'AbrilFatface_400Regular',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'PTSerif_400Regular_Italic',
    fontStyle: 'italic',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 100,
    flex: 1,
    justifyContent: 'center',
    width: '75%',
    textAlign: 'center'
  },
  signUpButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1.5,
  },
  signUpButtonText: {
    fontSize: 18,
    fontFamily: 'PTSerif_700Bold',
    textAlign: 'center',
    lineHeight: 21,
    color: 'white'
  },
  logInButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1.5,
  },
  logInButtonText: {
    fontSize: 18,
    fontFamily: 'PTSerif_700Bold',
    textAlign: 'center',
    color: 'black'
  },
  skipButton: {
    marginTop: 15,
  },
  skipButtonText: {
    fontSize: 18,
    fontFamily: 'PTSerif_400Regular',
    textDecorationLine: 'underline',
    textAlign: 'center',
    lineHeight: 21
  },
  signUpContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  topTextContainer: {
    marginTop: 10,
    flex: 1,
  },
  topTextInnerContainer: {
    width: '90%',
  },
  topText: {
    fontSize: 16,
    fontFamily: 'PTSerif_400Regular',
    textAlign: 'center'
  },
  password: {
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  showPasswordText: {
    fontFamily: 'PTSerif_400Regular',
    marginRight: 10
  },
  textInputPassword: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'PTSerif_400Regular',
    padding: 6,
    paddingLeft: 10,
    marginRight: 10,
  },
  signUpFormContainer: {
    flex: 2.5,
    width: '90%',
  },
  formInputs: {
    marginTop: 8
  },
  formInputsHalf: {
    marginTop: 8,
    flexGrow: 1,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'PTSerif_400Regular',
    padding: 6,
    paddingLeft: 10,
    borderWidth: 1.5,
  },
  errorTextInput: {
    fontSize: 16,
    fontFamily: 'PTSerif_400Regular',
    padding: 6,
    paddingLeft: 10,
    borderWidth: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'PTSerif_400Regular',
  },
  checkBoxContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 16
  },
  checkBox: {
    width: 24,
    height: 24
  },
  checkBoxText: {
    fontSize: 12,
    marginLeft: 12,
    fontFamily: 'PTSerif_400Regular',
  },
  signUpButtonContainer: {
    marginTop: 10
  },
  logInContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logInText: {
    fontFamily: 'PTSerif_400Regular',
    lineHeight: 20
  },
  logInTextButton: {
  },
  logInTextText: {
    fontFamily: 'PTSerif_400Regular',
    textDecorationLine: 'underline',
    lineHeight: 25
  },
  logInPageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInFormContainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  orText: {
    fontFamily: 'PTSerif_400Regular'
  },
  SignUpTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  forgotPasswordSubmitButton: {
    marginTop: 10
  }

})

validate = (text) => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    console.log("Email is Not Correct");
    return false;
  }
  else {
    console.log("Email is Correct");
    return true;
  }
}

function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fit Friends</Text>
        <Text style={styles.subtitle}>Find your motivation and share your journey with your friends</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={({ pressed }) => [
          { backgroundColor: pressed ? '#3d85cc' : '#326DA8' },
          styles.signUpButton
          ]}
          onPress={() => {
            navigation.navigate('SignUp');
        }}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [
          { backgroundColor: pressed ? '#E6E6E6' : 'white' },
          styles.logInButton
          ]}
          onPress={() => {
            navigation.navigate('LogIn');
        }}>
          <Text style={styles.logInButtonText}>Log In</Text>
        </Pressable>
      </View> 
    </View>
  );
}

function SignUp({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [weight, setWeight] = React.useState(undefined);
  const [height, setHeight] = React.useState(undefined);
  const [birthDate, setBirthDate] = React.useState(new Date());
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { setAuthToken } = React.useContext(AuthContext);

  const [hidden, setHidden] = React.useState(true);

  async function handleSignUp() {
    //TODO: validate all fields
    setLoading(true);

    userToSignUp = {
      inputUsername: username,
      inputEmail: email,
      inputPassword: password,
      inputFirstName: firstName,
      inputLastName: lastName,
      inputWeight: weight,
      inputHeight: height,
      inputBirthDate: birthDate
    }

    const {data} = await axios.post('http://localhost:3000/signup', userToSignUp);
    console.log('data:', data.token);
    setAuthToken(data.token);
  }

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <ScrollView contentContainerStyle={styles.signUpContainer}>
        <KeyboardAvoidingView 
          style={styles.signUpFormContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
          >
          <View style={styles.formInputs}>
            <Text style={styles.text}
            >Username</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="Username"
              placeholderTextColor="#808080"
              autoComplete="username"
              autoCorrect={false}
              autoFocus={true}
              onChangeText={(val) => {setUsername(val)}}
            />
          </View>
          <View style={styles.formInputs}>
            <Text style={styles.text}
            >Email Address</Text>
            <TextInput 
              style={error ? styles.errorTextInput : styles.textInput}
              placeholder="example@email.com"
              keyboardType='email-address'
              placeholderTextColor="#808080"
              textContentType='username'
              autoComplete="email"
              autoCorrect={false}
              onChangeText={(val) => {setEmail(val)}}
            />
          </View>
          <View style={styles.formInputs}>
            <Text style={styles.text}
            >Password</Text>
            <View style={styles.password}>
              <TextInput
                style={styles.textInputPassword}
                placeholder="Password"
                placeholderTextColor="#808080"
                textContentType='newPassword'
                autoCorrect={false}
                keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                secureTextEntry={hidden}
                onChangeText={(val) => {
                  setPassword(val)
                }}
              />
              <TouchableOpacity onPress={() => {setHidden(!hidden)}}>
                <Text style={styles.showPasswordText}>{hidden ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.formInputsHalf}>
              <Text style={styles.text}
              >First Name</Text>
              <TextInput 
                style={{...styles.textInput, marginRight: 10}}
                placeholder="First Name"
                placeholderTextColor="#808080"
                autoCorrect={false}
                onChangeText={(val) => {
                  setFirstName(val)
                }}
              />
            </View>
              <View style={{...styles.formInputsHalf, marginLeft: 10}}>
                <Text style={styles.text}
                >Last Name</Text>
                <TextInput 
                  style={styles.textInput}
                  placeholder="Last Name"
                  placeholderTextColor="#808080"
                  autoCorrect={false}
                  onChangeText={(val) => {
                    setLastName(val)
                  }}
                />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.formInputsHalf}>
              <Text style={styles.text}
              >Weight (lbs)</Text>
              <TextInput 
                style={{...styles.textInput, marginRight: 10}}
                placeholder="Weight"
                placeholderTextColor="#808080"
                autoCorrect={false}
                keyboardType='numeric'
                inputMode='numeric'
                onChangeText={(val) => {
                  setWeight(val)
                }}
              />
            </View>
              <View style={{...styles.formInputsHalf, marginLeft: 10}}>
                <Text style={styles.text}
                >Height (in)</Text>
                <TextInput 
                  style={styles.textInput}
                  placeholder="Height"
                  keyboardType='numeric'
                  inputMode='numeric'
                  placeholderTextColor="#808080"
                  autoCorrect={false}
                  onChangeText={(val) => {
                    setHeight(val)
                  }}
                />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{...styles.formInputs, flexGrow: 1, borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.text}>Birth Date</Text>
            </View>
            <View style={{borderWidth: 0, marginTop: 10, alignItems: 'center', justifyContent: 'center', border: 'solid', flexGrow: 1}}>
              <DateTimePicker
              mode="date" 
              value={birthDate}
              maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 13))}
              accentColor="#326DA8"
              onChange={(_, val) => {
                setBirthDate(val);
              }}
            />

            </View>
            </View>
          <View style={styles.signUpButtonContainer}>
            <Pressable style={({ pressed }) => [
          { backgroundColor: pressed ? '#3d85cc' : '#326DA8' },
              styles.signUpButton
              ]}
              onPress={() => {
                handleSignUp();
              }}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </Pressable>
          </View>
          <View style={styles.logInContainer}>
            <Text style={styles.logInText}>Already a user? <Pressable 
              style={styles.logInTextButton}
              onPress={() => {
                navigation.reset({
                  index: 1,
                  routes: [{ name: 'Welcome' }, { name: 'LogIn' }]
                });
              }}>
              {({ pressed }) => (
                <Text style={[{
                  color: pressed ? '#919191' : 'black' },
                  styles.logInTextText
                ]}>Log in</Text>
              )}
            </Pressable></Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

function LogIn({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(undefined);
  const [hidden, setHidden] = React.useState(true);
  const { setAuthToken } = React.useContext(AuthContext);

  async function handleLogIn() {
    userToLogIn = {
      inputEmail: email,
      inputPassword: password
    }
    try {
      const {data} = await axios.post('http://localhost:3000/login', userToLogIn);
      console.log('data:', data);
      setAuthToken(data.token);
    } catch (e) {
      // console.log(e.response)
      setError(true);
    }

  }

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <View style={styles.logInPageContainer}>
        <KeyboardAvoidingView
          style={styles.logInFormContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {error &&
            <View style={{display: 'flex', alignItems: 'center'}}>
              <Text style={{color: 'red'}}>
                The Email / Password combination does not work!
              </Text>
            </View>
          }

          <View style={styles.formInputs}>
            <Text style={styles.text}
            >Email Address</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="example@email.com"
              placeholderTextColor="#808080"
              textContentType='username'
              keyboardType='email-address'
              autoCorrect={false}
              autoComplete="email"
              autoFocus={true}
              onChangeText={(val) => {setEmail(val)}}
            />
          </View>
          <View style={styles.formInputs}>
            <Text style={styles.text}
            >Password</Text>
            <View style={styles.password}>
              <TextInput 
                style={styles.textInputPassword}
                placeholder="Password"
                placeholderTextColor="#808080"
                textContentType='username'
                keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                autoCorrect={false}
                secureTextEntry={hidden}
                onChangeText={(val) => {setPassword(val)}}
              />
              <TouchableOpacity onPress={() => {setHidden(!hidden)}}>
                <Text style={styles.showPasswordText}>{hidden ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View stlye={styles.logInButtonContainer}>
            <Pressable style={({ pressed }) => [
              { backgroundColor: pressed ? '#3d85cc' : '#326DA8' },
              styles.logInButton
              ]}
              onPress={() => {
                handleLogIn();
            }}>
              <Text style={styles.signUpButtonText}>Log In</Text>
            </Pressable>
          </View>
          <View style={styles.forgotPasswordContainer}>
            <Pressable 
              style={styles.forgotPasswordButton}
              onPress={() => {
                navigation.navigate('ForgotPassword');
            }}>
              {({ pressed }) => (
                <Text style={[{
                  color: pressed ? '#919191' : 'black' },
                  styles.logInTextText
                ]}>Forgot Password</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.SignUpTextContainer}>
            <Text style={styles.orText}>or</Text>
            <Text style={styles.logInText}>Don't have an account? <Pressable 
                style={styles.logInTextButton}
                onPress={() => {
                  navigation.reset({
                    index: 1,
                    routes: [{ name: 'Welcome' }, { name: 'SignUp' }]
                  });
              }}>
                {({ pressed }) => (
                  <Text style={[{
                    color: pressed ? '#919191' : 'black' },
                    styles.logInTextText
                  ]}>Sign up</Text>
                )}
              </Pressable></Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

function ForgotPassword({ navigation }) {
  const [email, setEmail] = React.useState('');

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}> 
      <View style={styles.forgotPasswordScreenContainer}>
        <View style={styles.topTextContainer}>
          <Text style={styles.topText}>Please enter your email address</Text>
        </View>
        <KeyboardAvoidingView 
          style={styles.signUpFormContainer}
          >
          <View style={styles.formInputs}>
            <Text style={styles.text}
              >Email Address</Text>
              <TextInput 
                style={styles.textInput}
                placeholder="example@email.com"
                keyboardType='email-address'
                placeholderTextColor="#808080"
                textContentType='username'
                autoComplete="email"
                autoCorrect={false}
                onChangeText={(val) => {setEmail(val)}}
              />
          </View>
          <View style={styles.forgotPasswordSubmitButton}>
            <Pressable style={({ pressed }) => [
              { backgroundColor: pressed ? '#bf283f' : '#A32538' },
              styles.signUpButton
              ]}
              onPress={() => {
                validate(email)
                console.log('password reset', email);
            }}>
              <Text style={styles.signUpButtonText}>Reset Password</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const Stack = createNativeStackNavigator();

export function WelcomeScreen( {navigation} ) {

  return (
    <AuthProvider>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Create an Account' }}/>
        <Stack.Screen name="LogIn" component={LogIn} options={{ title: 'Log In' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} />
    </AuthProvider>
  )
}
