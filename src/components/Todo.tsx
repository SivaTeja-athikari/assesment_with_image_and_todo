import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from 'react-native';
import React, {Component} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TodoContext from '../../context/TodoContext';
import {launchImageLibrary} from 'react-native-image-picker';

interface Options {
  title?: string;
  message?: string;
  cancelText?: string;
  mediaType: any;
  saveToPhotos: boolean;
}

const requestGalleryPermission = async () => {
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

class Todo extends Component {
  state = {
    modalVisible: false,
    modalVisible1: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    photo: '',
    tempId: '',
    error: false,
  };

  handleEditTodo = (eachTodo: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    photo: string;
  }) => {
    this.setState({
      tempId: eachTodo.id,
      firstName: eachTodo.firstName,
      lastName: eachTodo.lastName,
      email: eachTodo.email,
      password: eachTodo.password,
      phone: eachTodo.phone,
      photo: eachTodo.photo,

      // modalVisible: !this.state.modalVisible,
    });
  };
  static contextType: React.Context<any> | undefined = TodoContext;
  declare context: React.ContextType<typeof TodoContext>;

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

  render() {
    console.log(this.state.tempId);
    const {modalVisible} = this.state;

    return (
      <SafeAreaView style={styles.bgMainContainer}>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.expenseText}> T O D O</Text>
          </View>
          <View style={styles.historyContainer}>
            {this.context.todoList.length !== 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={this.context.todoList}
                renderItem={({
                  item,
                }: {
                  item: {
                    id: string;
                    firstName: string;
                    lastName: string;
                    email: string;
                    password: string;
                    phone: string;
                    photo: string;
                  };
                }) => {
                  return (
                    <View style={[styles.expenseCard]}>
                      <Image
                        style={{width: 60, height: 60, borderRadius: 10}}
                        source={{uri: item.photo}}
                      />

                      <View
                        style={{
                          flexDirection: 'column',
                          paddingLeft: 12,
                          width: '50%',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            fontWeight: '600',
                            paddingBottom: 5,
                          }}>
                          {item?.firstName + ' ' + item?.lastName}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 14,
                            fontWeight: '500',
                            paddingBottom: 5,
                          }}>
                          {item?.phone}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            width: '85%',
                            fontSize: 14,
                            fontWeight: '500',
                            paddingBottom: 5,
                          }}>
                          {item?.email}
                        </Text>
                      </View>

                      <View style={styles.editDelete}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                            this.handleEditTodo(item);
                            this.setState({
                              modalVisible: true,
                            });
                          }}>
                          <Feather name="edit" color="#ffffff" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.button2}
                          onPress={() =>
                            this.context.handleDeleteTodo(item.id)
                          }>
                          <MaterialCommunityIcons
                            name="delete"
                            color="#ffffff"
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <Text style={styles.transactionHistory}>
                {' '}
                No Tasks were added
              </Text>
            )}
          </View>

          <View style={styles.transactionContainer}>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  this.setState({modalVisible: !modalVisible});
                }}>
                <KeyboardAvoidingView
                  behavior="height"
                  style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Submit</Text>
                    <TextInput
                      maxLength={15}
                      style={styles.input}
                      value={this.state.firstName}
                      onChangeText={value => this.setState({firstName: value})}
                      placeholder=" First Name"
                      placeholderTextColor={'black'}
                    />
                    {this.state.error && this.state.firstName === '' ? (
                      <Text style={{color: 'red', alignSelf: 'flex-start'}}>
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
                      <Text style={{color: 'red', alignSelf: 'flex-start'}}>
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
                    (this.state.phone === '' ||
                      this.state.phone.length < 10) ? (
                      <Text style={{color: 'red', alignSelf: 'flex-start'}}>
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
                      <Text style={{color: 'red', alignSelf: 'flex-start'}}>
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
                        }}>
                        Password required
                      </Text>
                    ) : null}

                    <View>
                      <TouchableOpacity
                        style={{
                          height: 40,
                          width: 140,
                          backgroundColor: '#00bfff',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 20,
                          borderRadius: 10,
                        }}
                        onPress={async () => {
                          await requestGalleryPermission();
                          this.handleChooseImage;
                        }}>
                        <Text
                          style={{
                            color: '#ffffff',
                            textAlign: 'center',
                            fontSize: 16,
                          }}>
                          Choose Image
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
                          style={{width: 150, height: 150, marginBottom: 10}}
                          source={{uri: this.state.photo}}
                        />
                      )}
                    </View>
                    {this.state.firstName !== '' &&
                    this.state.lastName !== '' &&
                    this.state.email !== '' &&
                    this.state.password !== '' &&
                    this.state.phone !== '' &&
                    this.state.photo !== '' ? (
                      <TouchableOpacity
                        style={styles.button5}
                        onPress={
                          this.state.tempId !== ''
                            ? () => {
                                this.context.handleUpdateTodo([
                                  this.state.tempId,
                                  this.state.firstName,
                                  this.state.lastName,
                                  this.state.email,
                                  this.state.password,
                                  this.state.phone,
                                  this.state.photo,
                                ]);
                                this.setState({
                                  firstName: '',
                                  lastName: '',
                                  email: '',
                                  password: '',
                                  phone: '',
                                  photo: '',
                                  modalVisible: !this.state.modalVisible,

                                  tempId: '',
                                });
                              }
                            : () => {
                                this.context.handleTodo([
                                  this.state.firstName,
                                  this.state.lastName,
                                  this.state.email,
                                  this.state.password,
                                  this.state.phone,
                                  this.state.photo,
                                ]);
                                this.setState({
                                  testId: '',
                                  firstName: '',
                                  lastName: '',
                                  email: '',
                                  password: '',
                                  phone: '',
                                  photo: '',
                                  modalVisible: !this.state.modalVisible,
                                  error: !this.state.error,
                                });
                              }
                        }>
                        <Text>
                          {this.state.tempId !== '' ? 'Update' : 'Add'}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.setState({error: true, tempId: ''})}
                        style={styles.button5}>
                        <Text>
                          {this.state.tempId !== '' ? 'Update' : 'Add'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </KeyboardAvoidingView>
              </Modal>
              <View style={{flexDirection: 'row'}}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => this.setState({modalVisible: true})}>
                  <Text style={styles.textStyle}>Add</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={this.context.clearAsyncStorage}>
                  <Text style={styles.textStyle}>Clear</Text>
                </Pressable>
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
    flex: 1,
    backgroundColor: '#C3B1DB',
  },
  subContainer: {
    height: '95%',
    margin: 20,
    borderRadius: 9,
    backgroundColor: '#ffffff',
    elevation: 20,
    shadowColor: '#52006A',
  },
  expenseText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '800',
    margin: 10,
    padding: 30,
  },
  balance: {
    color: 'black',
    fontSize: 18,
  },
  historyContainer: {
    height: '70%',
  },
  walletAmount: {
    color: 'black',
    fontSize: 28,
  },
  walletContainer: {
    marginLeft: 16,
  },
  expenseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    alignItems: 'center',
    margin: 15,
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    width: '90%',
    backgroundColor: '#F0FFFF',
    // marginTop: 15,
  },
  historyText: {
    borderBottomWidth: 2,
    color: 'black',
    borderBottomColor: '#C3B1DB',
    fontSize: 22,
    fontWeight: '700',
    margin: 16,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: 8,
    padding: 10,
    width: 50,

    borderRadius: 9,
    color: '#ffffff',
  },
  editDelete: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#57eb83',
    padding: 10,
    width: 50,
    borderRadius: 8,
  },
  button5: {
    alignItems: 'center',
    backgroundColor: '#57eb83',
    padding: 10,
    width: 70,
    borderRadius: 8,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    width: 100,
    borderRadius: 8,
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 3,
    borderRadius: 12,
    margin: 13,
    padding: 13,
    backgroundColor: 'black',
  },
  centeredView: {
    height: '100%',
    backgroundColor: '#000000aa',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#ffffff',
    margin: 50,
    padding: 40,
    borderRadius: 10,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  button3: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#57eb83',
    width: 100,
    marginRight: 20,
  },
  buttonClose: {
    backgroundColor: 'red',
    width: 100,
  },
  buttonOpen1: {
    backgroundColor: 'red',
    width: 100,
  },
  buttonClose1: {
    backgroundColor: 'red',
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    width: '100%',
    borderWidth: 1,
    padding: 10,
    borderColor: 'black',
    color: 'black',
  },
  credited: {
    fontSize: 18,
    width: 100,
  },
  creditedReason: {
    fontSize: 18,
    width: 50,
  },
  transactionHistory: {
    fontSize: 20,
    color: 'red',
    margin: 10,
  },
});

export default Todo;
