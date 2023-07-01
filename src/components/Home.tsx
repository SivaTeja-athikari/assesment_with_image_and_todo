// import {
//   Image,
//   PermissionsAndroid,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {Component} from 'react';
// import {launchImageLibrary} from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface IProps {
//   navigation: any;
//   route: any;
// }

// interface Options {
//   title?: string;
//   message?: string;
//   cancelText?: string;
//   mediaType: any;
//   saveToPhotos: boolean;
// }

// class Home extends Component<IProps, {}> {
//   state = {
//     photo: this.props.route.params.photo,
//     usersList: [],
//   };

//   componentDidMount() {
//     this.loadTodos();
//   }
//   componentDidUpdate(
//     prevProps: Readonly<IProps>,
//     prevState: Readonly<{}>,
//     snapshot?: any,
//   ): void {
//     console.log('Updated');
//     this.loadTodos();
//   }
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
//   requestGalleryPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Cool Photo App Camera Permission',
//           message:
//             'Cool Photo App needs access to your camera ' +
//             'so you can take awesome pictures.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the Gallery');
//       } else {
//         console.log('Gallery permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   updatePhoto = async () => {
//     // user?.photo === this.props.route.params.photo
//     let result = await this.state.usersList.map((user: any) => {
//       if (user?.photo === this.props.route.params.photo) {
//         return {...user, photo: this.state.photo};
//       }
//       return user;
//     });
//     await AsyncStorage.setItem('todos', JSON.stringify(result));

//     console.log(result, 'result');
//   };

//   handleChooseImage = () => {
//     console.log('triggered');
//     const options: Options = {
//       title: 'Select an image',
//       mediaType: 'photo',
//       saveToPhotos: true,
//     };

//     launchImageLibrary(options, (response: any) => {
//       if (response.didCancel) {
//         console.log('User canceled');
//       } else if (response.errorCode) {
//         console.log('Error picking image: ', response.error);
//       } else {
//         this.setState(
//           {
//             photo: response.assets[0].uri,
//           },
//           () => {
//             this.updatePhoto();
//           },
//         );
//       }
//     });
//   };

//   render() {
//     const {email, firstName, lastName, photo, phone} = this.props.route.params;
//     console.log(email, firstName, lastName, phone, photo);
//     console.log(this.state.photo, 'photo');
//     return (
//       <View>
//         <View
//           style={{
//             alignItems: 'center',
//             height: '100%',
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               width: '90%',
//               backgroundColor: 'grey',
//               marginTop: 20,
//               paddingLeft: 20,
//               paddingRight: 20,
//               paddingTop: 10,
//               paddingBottom: 10,
//               borderRadius: 12,
//             }}>
//             {photo ? (
//               <TouchableOpacity
//                 onPress={async () => {
//                   await this.requestGalleryPermission();
//                   await this.handleChooseImage();
//                 }}>
//                 <Image
//                   style={{
//                     width: 50,
//                     height: 50,
//                     borderRadius: 10,
//                   }}
//                   source={{uri: this.state.photo}}
//                 />
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 onPress={async () => {
//                   await this.requestGalleryPermission();
//                   await this.handleChooseImage();
//                 }}>
//                 <Image
//                   style={{
//                     width: 50,
//                     height: 50,
//                     borderRadius: 10,
//                   }}
//                   source={require('./images/emptyprofile.png')}
//                 />
//               </TouchableOpacity>
//             )}
//             <Text style={{color: '#ffffff', fontSize: 18}}>{email}</Text>
//           </View>
//           <View
//             style={{
//               height: 400,
//               width: '90%',
//               backgroundColor: '#ffffff',
//               justifyContent: 'center',
//               alignItems: 'flex-start',
//               padding: 30,
//               borderRadius: 16,
//               marginTop: 60,
//               alignSelf: 'center',
//             }}>
//             <Text style={{color: 'black', fontSize: 18}}>
//               Name: {firstName + lastName}
//             </Text>

//             <Text style={{color: 'black', fontSize: 18}}>
//               Mobile number: {phone}
//             </Text>
//           </View>

//           <View>
//             <TouchableOpacity
//               onPress={() => this.props.navigation.navigate('Login')}
//               style={{
//                 width: 140,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 10,
//                 backgroundColor: '#F70D1A',
//                 marginTop: 40,
//                 alignSelf: 'center',
//               }}>
//               <Text style={{color: '#ffffff', fontSize: 18, padding: 10}}>
//                 Log out
//               </Text>
//             </TouchableOpacity>

//             {/* <TouchableOpacity
//               onPress={() => this.updatePhoto()}
//               style={{
//                 width: 140,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 10,
//                 backgroundColor: 'grey',
//                 marginTop: 40,
//                 alignSelf: 'center',
//               }}>
//               <Text style={{color: '#ffffff', fontSize: 18, padding: 10}}>
//                 Update
//               </Text>
//             </TouchableOpacity> */}
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// export default Home;
