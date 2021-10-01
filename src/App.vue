<template>
  <div id="app">
    <div class="header">todos</div>
    <TodoInput :todo-arr-length="calTodoArrLength"
               :input-value="inputValue"
               @input="enterWriteTodo"
               @all-selected-clicked="onClickAllSelected">
    </TodoInput>
    <TodoBox :todo-arr="filteredTodo"
             @erase-clicked="onClickErase"
             @edit-dbclicked="ondbClickTextEdit"
             @input="enterEditWriteTodo"
             @edit-clicked-outside="onClickOutsideTextEdit"
             @delete-clicked="onClickDelete">
    </TodoBox>
    <TodoFilter :todo-arr-length="calTodoArrLength"
                :todo-completed-arr-length="calTodoCompletedArrLength"
                :todo-active-arr-length="calTodoActiveArrLength"
                :todo-status="this.status"
                @change-status="statusChange"
                @clear-clicked="onClickClear">
    </TodoFilter>
  </div>
</template>

<script>
import TodoInput from "./components/TodoInput"
import TodoBox from './components/TodoBox'
import TodoFilter from './components/TodoFilter'

import {getTodoList, postNewTodo, patchUpdateTodo, patchAllTodoStatus, deleteTodo} from "./service/todo-service";

export default {
  name: 'App',
  data() {
    return {
      inputValue:"",
      allSelected:false,
      appTodoArr: [
        // {id:'abc', content:'자바 공부하기', status:"Active", edit:false},
        // {id:'abcd', content:'CSS 공부하기', status:"Active", edit:false},
        // {id:'abcde', content:'JS 공부하기', status:"Active", edit:false},
      ],
      status:"All",
    }
  },
  async mounted() {
    const response = await getTodoList();
    this.appTodoArr = response;
  },
  methods: {
    async enterWriteTodo(todoInputText) {
      const response = await postNewTodo({content: todoInputText, status: "Active", edit: false});
      this.appTodoArr.push(response);
    },
    async onClickErase(id) {
      if (this.appTodoArr.find(todo => todo.id === id).status === "Completed") {
        const response = await patchUpdateTodo(id, {status: "Active"});
        this.appTodoArr.find(todo => todo.id === id).status = response.status;
      }
      else {
        const response = await patchUpdateTodo(id, {status:"Completed"});
        this.appTodoArr.find(todo => todo.id === id).status = response.status;
      }
    },
    async ondbClickTextEdit(id) {
      const response = await patchUpdateTodo(id, {edit:true});
      this.appTodoArr.find(todo => todo.id === id).edit = response.edit;
    },
    async enterEditWriteTodo (id, editText) {
      const response = await patchUpdateTodo(id, {content:editText, edit:false});
      this.appTodoArr.find(todo => todo.id === id).content = response.content;
      this.appTodoArr.find(todo => todo.id === id).edit = response.edit;
    },
    async onClickOutsideTextEdit(id) {
      const response = await patchUpdateTodo(id, {edit:false});
      this.appTodoArr.find(todo => todo.id === id).edit = response.edit;
    },
    async onClickDelete(id) {
      await deleteTodo(id);
      this.appTodoArr.splice(this.appTodoArr.findIndex(todo => todo.id === id), 1);
    },
    statusChange(status) {
      this.status = status;
    },
    onClickClear () {
      this.appTodoArr.forEach(async function(todo) {
        if (todo.status !== 'Active') {
          await deleteTodo(todo.id);
        }
      })
      this.appTodoArr = this.appTodoArr.filter(x => x.status==='Active');
    },
    async onClickAllSelected() {
      if (this.calTodoCompletedArrLength === this.calTodoArrLength) {
        this.allSelected = true;
      }
      else {
        this.allSelected = false;
      }
      if (this.allSelected) {
        await patchAllTodoStatus('Active');
        this.appTodoArr.forEach(function(x, idx, appTodoArr) {
          appTodoArr[idx].status = 'Active';
        })
        this.allSelected = false;
      }
      else {
        await patchAllTodoStatus('Completed');
        this.appTodoArr.forEach(function(x, idx, appTodoArr) {
          appTodoArr[idx].status = 'Completed';
        })
        this.allSelected = true;
      }
    }
  },
  computed: {
    filteredTodo () {
      if (this.status==='All') {
        return this.appTodoArr;
      }
      else if (this.status ==='Active') {
        return this.appTodoArr.filter(x => x.status==='Active');
      }
      else {
        return this.appTodoArr.filter(x => x.status==='Completed');
      }
    },
    calTodoArrLength() {
      return this.appTodoArr.length;
    },
    calTodoActiveArrLength() {
      return this.appTodoArr.filter(x => x.status==='Active').length;
    },
    calTodoCompletedArrLength() {
      return this.appTodoArr.filter(x => x.status==='Completed').length;
    },
  },
  components: {
    TodoInput,
    TodoBox,
    TodoFilter
  }
}
</script>

<style>

body {
  background-color: rgba(0, 102, 0, 0.05);
}

.header {
  color:#006600;
  opacity: 0.5;
  font-size: 100px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
