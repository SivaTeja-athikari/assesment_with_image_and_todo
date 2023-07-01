// import React, {Component} from 'react';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import TodoContext from './context/TodoContext';
// import Todo from './components/Todo';

// interface IState {
//   tempId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phone: string;
//   photo: string;
//   todoList: any[];
// }

// interface IProps {
//   todoList: any[];
//   clearAsyncStorage: () => void;
//   handleDeleteTodo: () => void;
//   handleUpdateTodo: () => void;
//   handleTodo: () => void;
//   tempId: any;
// }

// export class App extends Component<IProps, IState> {
//   state = {
//     tempId: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     phone: '',
//     photo: '',
//     todoList: [],
//   };
//   componentDidMount() {
//     this.loadTodos();
//   }

//   loadTodos = async () => {
//     try {
//       const todos = await AsyncStorage.getItem('todos');
//       if (todos !== null) {
//         this.setState({todoList: JSON.parse(todos)});
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   saveTodos = async () => {
//     try {
//       await AsyncStorage.setItem('todos', JSON.stringify(this.state.todoList));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   clearAsyncStorage = async () => {
//     console.log('clearAsyncStorage called');
//     this.setState({todoList: []});
//     AsyncStorage.clear();
//     this.loadTodos();
//   };

//   handleDeleteTodo = (todoId: string) => {
//     if (this.state.tempId === '') {
//       const {todoList} = this.state;
//       this.setState(
//         prevState => ({
//           todoList: prevState.todoList.filter(
//             (todo: {id: string}) => todo.id !== todoId,
//           ),
//         }),
//         () => {
//           this.saveTodos();
//         },
//       );
//     }
//   };
//   handleUpdateTodo = (todo: string[]) => {
//     this.state.todoList.map(
//       (each: {
//         id: string;
//         firstName: string;
//         lastName: string;
//         email: string;
//         password: string;
//         phone: string;
//         photo: string;
//       }) => {
//         if (each.id === todo[0]) {
//           return (
//             (each.firstName = todo[1]),
//             (each.lastName = todo[2]),
//             (each.email = todo[3]),
//             (each.password = todo[4]),
//             (each.phone = todo[5]),
//             (each.photo = todo[6])
//           );
//         }
//       },
//     );
//     this.setState(() => {
//       this.saveTodos();
//     });
//   };
//   handleTodo = (tasks: string[]) => {
//     console.log(tasks, 'ahsnskan');
//     let todo = {
//       id: Date.now(),
//       firstName: tasks[0],
//       lastName: tasks[1],
//       email: tasks[2],
//       password: tasks[3],
//       phone: tasks[4],
//       photo: tasks[5],
//     };

//     this.setState(
//       (prevState: any) => ({
//         todoList: [...prevState.todoList, todo],
//       }),
//       () => {
//         this.saveTodos();
//       },
//     );
//   };
//   render() {
//     console.log(this.state.todoList);
//     return (
//       <TodoContext.Provider
//         value={{
//           todoList: this.state.todoList,
//           clearAsyncStorage: this.clearAsyncStorage,
//           handleDeleteTodo: this.handleDeleteTodo,
//           handleUpdateTodo: this.handleUpdateTodo,
//           handleTodo: this.handleTodo,
//         }}>
//         <Todo />
//       </TodoContext.Provider>
//     );
//   }
// }

// export default App;

import React, {Component} from 'react';

import StackNavigation from './src/navigations/StackNavigation';

class App extends Component {
  render() {
    return <StackNavigation />;
  }
}

export default App;
