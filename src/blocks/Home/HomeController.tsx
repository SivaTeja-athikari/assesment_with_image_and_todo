import {
  Image,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  navigation: any;
  route: any;
}

interface Options {
  title?: string;
  message?: string;
  cancelText?: string;
  mediaType: any;
  saveToPhotos: boolean;
}

class HomeController extends Component<IProps, {}> {
  state = {
    photo: this.props.route.params.photo,
    usersList: [],
  };

  componentDidMount() {
    this.loadTodos();
  }
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    console.log('Updated');
    this.loadTodos();
  }
  loadTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos !== null) {
        await this.setState({usersList: JSON.parse(todos)});
      }
      console.log(todos, 'todos loaded');
    } catch (error) {
      console.log(error);
    }
  };
  requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Gallery');
      } else {
        console.log('Gallery permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  updatePhoto = async () => {
    // user?.photo === this.props.route.params.photo
    let result = await this.state.usersList.map((user: any) => {
      if (user?.photo === this.props.route.params.photo) {
        return {...user, photo: this.state.photo};
      }
      return user;
    });
    await AsyncStorage.setItem('todos', JSON.stringify(result));

    console.log(result, 'result');
  };

  handleChooseImage = () => {
    console.log('triggered');
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
        this.setState(
          {
            photo: response.assets[0].uri,
          },
          () => {
            this.updatePhoto();
          },
        );
      }
    });
  };
}

export default HomeController;
