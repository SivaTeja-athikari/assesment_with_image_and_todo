import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import RegistrationController from './RegistrationController';

import {ChooseImage, Clear, RegistrationText} from './config';
import {LoginText, Register} from '../../components/config';
import {
  FerrariRed,
  DeepSkyBlue,
  LightPurpleBlue,
  PurpleSageBush,
} from '../../components/colors';

const {height} = Dimensions.get('window');

class Registration extends RegistrationController {
  render() {
    console.log(this.state.todoList);
    let result = this.state.todoList.some((each: any) => {
      each.title === this.state.title;
    });

    return (
      <SafeAreaView style={styles.bgMainContainer}>
        <View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.modalView}>
              <View>
                <Text style={{color: 'black', fontSize: 28, fontWeight: '700'}}>
                  {' '}
                  {RegistrationText}
                </Text>
              </View>

              <TextInput
                maxLength={15}
                style={styles.input}
                value={this.state.firstName}
                onChangeText={value => this.setState({firstName: value})}
                placeholder=" First Name"
                placeholderTextColor={'black'}
              />
              {this.state.error && this.state.firstName.length === 0 ? (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'flex-start',
                    paddingLeft: 35,
                  }}>
                  First name required
                </Text>
              ) : null}

              <TextInput
                maxLength={15}
                style={styles.input}
                value={this.state.lastName}
                onChangeText={value => this.setState({lastName: value})}
                placeholder=" Last Name"
                placeholderTextColor={'black'}
              />
              {this.state.error && this.state.lastName === '' ? (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'flex-start',
                    paddingLeft: 35,
                  }}>
                  Last name required
                </Text>
              ) : null}
              <TextInput
                maxLength={10}
                inputMode="numeric"
                style={styles.input}
                value={this.state.phone}
                onChangeText={value => this.setState({phone: value})}
                placeholder=" Phone Number"
                placeholderTextColor={'black'}
              />
              {this.state.error &&
              (this.state.phone === '' || this.state.phone.length < 10) ? (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'flex-start',
                    paddingLeft: 35,
                  }}>
                  Phone number required
                </Text>
              ) : null}

              <TextInput
                maxLength={60}
                style={styles.input}
                value={this.state.email}
                onChangeText={value => this.setState({email: value})}
                placeholder=" Email"
                placeholderTextColor={'black'}
              />
              {this.state.error &&
              (this.state.email === '' ||
                !this.state.email.includes('@gmail.com')) ? (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'flex-start',
                    paddingLeft: 35,
                  }}>
                  Email required
                </Text>
              ) : null}

              <TextInput
                maxLength={20}
                style={styles.input}
                value={this.state.password}
                onChangeText={value => this.setState({password: value})}
                placeholder=" Password"
                placeholderTextColor={'black'}
              />
              {this.state.error && this.state.password === '' ? (
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'right',
                    alignSelf: 'flex-start',
                    paddingLeft: 35,
                  }}>
                  Password required
                </Text>
              ) : null}

              <TextInput
                maxLength={20}
                style={styles.input}
                value={this.state.confirmpassword}
                onChangeText={value => this.setState({confirmpassword: value})}
                placeholder="Confirm Password"
                placeholderTextColor={'black'}
              />
              {this.state.error &&
              this.state.password !== this.state.confirmpassword ? (
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'right',
                    alignSelf: 'flex-start',
                    paddingLeft: 35,
                  }}>
                  Password Mismatched
                </Text>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 140,
                    backgroundColor: DeepSkyBlue,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                    borderRadius: 10,
                    marginRight: 16,
                  }}
                  onPress={async () => {
                    // await this.requestGalleryPermission();
                    await this.handleChooseImage();
                  }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                    {ChooseImage}
                  </Text>
                </TouchableOpacity>
                {this.state.error && this.state.photo === '' ? (
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'right',
                      alignSelf: 'flex-start',
                    }}>
                    Image required
                  </Text>
                ) : null}

                {this.state.photo && (
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                    source={{uri: this.state.photo}}
                  />
                )}
              </View>

              <View style={{flexDirection: 'row'}}>
                {this.state.firstName.length !== 0 &&
                this.state.lastName.length !== 0 &&
                this.state.email.length !== 0 &&
                this.state.password.length !== 0 &&
                this.state.confirmpassword.length !== 0 ? (
                  <TouchableOpacity
                    style={styles.button5}
                    onPress={async () => {
                      await this.handleTodo();
                      await this.setState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmpassword: '',
                        phone: '',
                        photo: '',
                        error: !this.state.error,
                      });
                      if (!result) {
                      } else {
                        await this.props.navigation.navigate('Login');
                      }
                    }}>
                    <Text>{Register}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.setState({error: true})}
                    style={styles.button5}>
                    <Text>{Register}</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    backgroundColor: FerrariRed,
                    padding: 10,
                    width: 120,
                    borderRadius: 8,
                    marginLeft: 20,
                  }}
                  onPress={() => this.clearAsyncStorage()}>
                  <Text>{Clear}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{color: 'black', fontSize: 18, paddingTop: 20}}>
                  Already registered?{' '}
                  <Text
                    style={{fontWeight: '700', color: PurpleSageBush}}
                    onPress={() => this.handleLogin()}>
                    {LoginText}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bgMainContainer: {
    backgroundColor: '#C3B1DB',
    height: height,
  },

  button5: {
    alignItems: 'center',
    backgroundColor: LightPurpleBlue,
    padding: 10,
    width: 120,
    borderRadius: 8,
  },

  modalView: {
    backgroundColor: '#ffffff',
    paddingBottom: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 14,
    height: '97%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },

  input: {
    height: 40,
    margin: 12,
    width: '80%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    color: 'black',
  },
});

export default Registration;
