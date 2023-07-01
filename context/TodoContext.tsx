import React from 'react';

interface IState {
  todoList: any[];
}
const TodoContext = React.createContext({
  todoList: [],
  handleTodo: (items: any) => {},
  clearAsyncStorage: () => {},
  handleDeleteTodo: (id: any) => {},
  handleUpdateTodo: (id: any) => {},
});

export default TodoContext;
