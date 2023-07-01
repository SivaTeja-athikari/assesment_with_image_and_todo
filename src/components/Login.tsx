// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {Component} from 'react';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// const {width, height} = Dimensions.get('window');

// interface IProps {
//   navigation?: any;
// }

// class Login extends Component<IProps, {}> {
//   state = {
//     hidePassword: true,
//     hidePassword2: true,
//     usersList: [],
//     singleUser: [],
//     UserPhone: '',
//     UserPassword: '',
//     errorMessage: '',
//   };
//   async componentDidMount() {
//     this.loadTodos();
//   }
//   getCurrentUser = async () => {
//     let result = await this.state.usersList.find(
//       (user: any) => user?.phone === this.state.UserPhone,
//     );
//     // this.setState({singleUser: result});

//     if (
//       result?.phone === this.state.UserPhone &&
//       result?.password === this.state.UserPassword
//     ) {
//       await this.setState({
//         errorMessage: '',
//         UserPhone: '',
//         UserPassword: '',
//       });
//       await this.props.navigation.navigate('Home', result);
//     } else {
//       this.setState({errorMessage: 'Credentials are not matched'});
//     }
//   };
//   managePasswordVisibility = () => {
//     this.setState({hidePassword: !this.state.hidePassword});
//   };
//   managePasswordVisibility1 = () => {
//     this.setState({hidePassword2: !this.state.hidePassword2});
//   };
//   loadTodos = async () => {
//     try {
//       const todos = await AsyncStorage.getItem('todos');
//       if (todos !== null) {
//         await this.setState({usersList: JSON.parse(todos)});
//       }
//       console.log(todos, 'todos loaded');
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   render() {
//     console.log(this.state.errorMessage);
//     return (
//       <View
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: height,
//           backgroundColor: '#FEFCFF',
//         }}>
//         <View>
//           <Text
//             style={{
//               color: 'black',
//               fontSize: 28,
//               fontWeight: '800',
//               marginBottom: 40,
//             }}>
//             Login
//           </Text>
//           <View
//             style={{
//               flexDirection: 'row',
//               height: 40,
//               width: '90%',
//               marginBottom: 30,
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderWidth: 1,
//               borderColor: 'black',
//               borderRadius: 10,
//               padding: 9,
//             }}>
//             <TextInput
//               style={{
//                 width: '90%',

//                 height: 40,
//                 padding: 10,

//                 color: 'black',
//               }}
//               secureTextEntry={this.state.hidePassword}
//               placeholder="Enter Mobile Number"
//               placeholderTextColor={'black'}
//               value={this.state.UserPhone}
//               inputMode="numeric"
//               maxLength={10}
//               autoCapitalize="none"
//               autoCorrect={false}
//               returnKeyType="send"
//               onChangeText={UserPhone => this.setState({UserPhone})}
//             />

//             <TouchableOpacity
//               activeOpacity={0.8}
//               style={{}}
//               onPress={this.managePasswordVisibility}>
//               <Image
//                 source={
//                   this.state.hidePassword
//                     ? require('./images/view.png')
//                     : require('./images/hide.png')
//                 }
//                 style={{height: 20, width: 20}}
//               />
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               height: 40,
//               width: '90%',
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderWidth: 1,
//               borderColor: 'black',
//               borderRadius: 10,
//               padding: 9,
//             }}>
//             <TextInput
//               style={{
//                 width: '90%',

//                 height: 40,
//                 padding: 10,

//                 color: 'black',
//               }}
//               secureTextEntry={this.state.hidePassword2}
//               placeholder="Enter Password"
//               placeholderTextColor={'black'}
//               autoCapitalize="none"
//               value={this.state.UserPassword}
//               autoCorrect={false}
//               returnKeyType="send"
//               onChangeText={UserPassword => this.setState({UserPassword})}
//             />

//             <TouchableOpacity
//               activeOpacity={0.8}
//               style={{}}
//               onPress={this.managePasswordVisibility1}>
//               <Image
//                 source={
//                   this.state.hidePassword2
//                     ? require('./images/view.png')
//                     : require('./images/hide.png')
//                 }
//                 style={{height: 20, width: 20}}
//               />
//             </TouchableOpacity>
//           </View>

//           {this.state.errorMessage !== '' ? (
//             <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
//           ) : (
//             <Text></Text>
//           )}

//           <TouchableOpacity
//             onPress={() => this.getCurrentUser()}
//             style={{
//               width: 140,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 10,
//               backgroundColor: '#728FCE',
//               marginTop: 40,
//               alignSelf: 'center',
//             }}>
//             <Text style={{color: '#ffffff', fontSize: 18, padding: 10}}>
//               Login
//             </Text>
//           </TouchableOpacity>

//           <View style={{justifyContent: 'center', alignItems: 'center'}}>
//             <Text style={{color: 'black', fontSize: 18, paddingTop: 20}}>
//               Need to Sign Up?{' '}
//               <Text
//                 style={{fontWeight: '700', color: '#7A5DC7'}}
//                 onPress={() => this.props.navigation.navigate('Registration')}>
//                 {' '}
//                 Sign Up
//               </Text>
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({});

// export default Login;
