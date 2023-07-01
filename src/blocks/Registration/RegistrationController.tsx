import {Text, View, PermissionsAndroid, Alert} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {launchImageLibrary} from 'react-native-image-picker';

interface Options {
  title?: string;
  message?: string;
  cancelText?: string;
  mediaType: any;
  saveToPhotos: boolean;
}

interface IProps {
  navigation?: any;
}
interface IState {
  title: string;
  description: string;
  tempId: string;
  firstName: string;
  lastName: string;
  email: string;
  error: boolean;
  password: string;
  phone: string;
  confirmpassword: string;
  photo: string;

  todoList: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    photo: string;
  }[];
}

class RegistrationController extends Component<IProps, IState> {
  state = {
    title: '',
    tempId: '',
    error: false,
    description: '',
    todoList: [],
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: '',
    photo: '',
  };

  componentDidMount() {
    this.loadTodos();
    this.props.navigation.addListener('didFocus', () => {
      this.loadTodos();
      this.requestGalleryPermission();
    });
  }

  requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      //   return granted == PermissionsAndroid.RESULTS.GRANTED;
      if (granted === (await PermissionsAndroid.RESULTS.GRANTED)) {
        console.log('You can use the Gallery');
      } else {
        console.log('Gallery permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  loadTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos !== null) {
        this.setState({todoList: JSON.parse(todos)});
      }
      //   console.log(todos, 'todos loaded');
    } catch (error) {
      console.log(error);
    }
  };
  saveTodos = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(this.state.todoList));
    } catch (error) {
      console.log(error);
    }
  };

  clearAsyncStorage = async () => {
    this.setState({todoList: []});
    AsyncStorage.clear();
    this.loadTodos();
  };
  handleChooseImage = () => {
    const options: Options = {
      title: 'Select an image',
      mediaType: 'photo',
      saveToPhotos: true,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User canceled');
      } else if (response.errorCode) {
        console.log('Error picking image: ', response.error);
      } else {
        this.setState({
          photo: response.assets[0].uri,
        });
      }
    });
  };

  handleTodo = () => {
    let result = this.state.todoList.some((each: any) => {
      if (each.email === this.state.email) {
        return true;
      } else false;
    });
    if (result) {
      Alert.alert('Email already exists');
    } else {
      console.log('triggered');
      let todo = {
        id: Date.now(),
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        confirmpassword: this.state.confirmpassword,
        photo: this.state.photo,
      };
      if (this.state.firstName.length !== 0) {
        this.setState(
          (prevState: any) => ({
            todoList: [...prevState.todoList, todo],
            error: true,
          }),
          () => {
            this.saveTodos();
          },
        );
      }
    }
  };
  handleLogin = () => {
    this.props.navigation.navigate('Login');
    this.setState({error: false});
  };
}

export default RegistrationController;
