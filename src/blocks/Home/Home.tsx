import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HomeController from './HomeController';

export class Home extends HomeController {
  render() {
    const {email, firstName, lastName, photo, phone} = this.props.route.params;
    return (
      <View>
        <View
          style={{
            alignItems: 'center',
            height: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              backgroundColor: 'grey',
              marginTop: 20,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 12,
            }}>
            {photo ? (
              <TouchableOpacity
                onPress={async () => {
                  await this.requestGalleryPermission();
                  await this.handleChooseImage();
                }}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                  }}
                  source={{uri: this.state.photo}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={async () => {
                  await this.requestGalleryPermission();
                  await this.handleChooseImage();
                }}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                  }}
                  source={require('../../images/emptyprofile.png')}
                />
              </TouchableOpacity>
            )}
            <Text style={{color: '#ffffff', fontSize: 18}}>{email}</Text>
          </View>
          <View
            style={{
              height: 400,
              width: '90%',
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: 30,
              borderRadius: 16,
              marginTop: 60,
              alignSelf: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 18}}>
              Name: {firstName + lastName}
            </Text>

            <Text style={{color: 'black', fontSize: 18}}>
              Mobile number: {phone}
            </Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={{
                width: 140,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#F70D1A',
                marginTop: 40,
                alignSelf: 'center',
              }}>
              <Text style={{color: '#ffffff', fontSize: 18, padding: 10}}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
