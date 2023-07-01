import {Dimensions, Text, View} from 'react-native';
import React, {Component} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  navigation?: any;
}

class LoginController extends Component<IProps, {}> {
  state = {
    hidePassword: true,
    hidePassword2: true,
    usersList: [],
    singleUser: [],
    UserPhone: '',
    UserPassword: '',
    errorMessage: '',
  };
  async componentDidMount() {
    this.loadTodos();
  }
  getCurrentUser = async () => {
    let result = await this.state.usersList.find(
      (user: any) => user?.phone === this.state.UserPhone,
    );
    // this.setState({singleUser: result});

    if (
      result?.phone === this.state.UserPhone &&
      result?.password === this.state.UserPassword
    ) {
      await this.setState({
        errorMessage: '',
        UserPhone: '',
        UserPassword: '',
      });
      await this.props.navigation.navigate('Home', result);
    } else {
      this.setState({errorMessage: 'Credentials are not matched'});
    }
  };
  managePasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };
  managePasswordVisibility1 = () => {
    this.setState({hidePassword2: !this.state.hidePassword2});
  };
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
}

export default LoginController;
