import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const {height} = Dimensions.get('window');
import LoginController from './LoginController';
import {LoginText, Register} from '../../components/config';
import {LightPurpleBlue, PurpleSageBush} from '../../components/colors';

export class Login extends LoginController {
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
          backgroundColor: '#FEFCFF',
        }}>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 28,
              fontWeight: '800',
              marginBottom: 40,
            }}>
            {LoginText}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              width: '90%',
              marginBottom: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              padding: 9,
            }}>
            <TextInput
              style={{
                width: '90%',

                height: 40,
                padding: 10,

                color: 'black',
              }}
              secureTextEntry={this.state.hidePassword}
              placeholder="Enter Mobile Number"
              placeholderTextColor={'black'}
              value={this.state.UserPhone}
              inputMode="numeric"
              maxLength={10}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="send"
              onChangeText={UserPhone => this.setState({UserPhone})}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={{}}
              onPress={this.managePasswordVisibility}>
              <Image
                source={
                  this.state.hidePassword
                    ? require('../../images/view.png')
                    : require('../../images/hide.png')
                }
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              padding: 9,
            }}>
            <TextInput
              style={{
                width: '90%',

                height: 40,
                padding: 10,

                color: 'black',
              }}
              secureTextEntry={this.state.hidePassword2}
              placeholder="Enter Password"
              placeholderTextColor={'black'}
              autoCapitalize="none"
              value={this.state.UserPassword}
              autoCorrect={false}
              returnKeyType="send"
              onChangeText={UserPassword => this.setState({UserPassword})}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={{}}
              onPress={this.managePasswordVisibility1}>
              <Image
                source={
                  this.state.hidePassword2
                    ? require('../../images/view.png')
                    : require('../../images/hide.png')
                }
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          </View>

          {this.state.errorMessage !== '' ? (
            <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
          ) : (
            <Text></Text>
          )}

          <TouchableOpacity
            onPress={() => this.getCurrentUser()}
            style={{
              width: 140,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: LightPurpleBlue,
              marginTop: 40,
              alignSelf: 'center',
            }}>
            <Text style={{color: '#ffffff', fontSize: 18, padding: 10}}>
              {LoginText}
            </Text>
          </TouchableOpacity>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 18, paddingTop: 20}}>
              Need to Sign Up?{' '}
              <Text
                style={{fontWeight: '700', color: PurpleSageBush}}
                onPress={() => this.props.navigation.navigate('Registration')}>
                {' '}
                {Register}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
