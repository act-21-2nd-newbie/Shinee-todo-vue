<template>
  <div class="todoInput" @keypress="enterWriteTodo">
    <div class="todoInputBox">
      <div v-if="isNotEmptyTodoArr" class="allSelectButton" @click="onClickAllSelected">
        ▼
      </div>
      <div v-else class="visibilityHidden">
        ▼
      </div>
      <input class="todoInputTextBox"
             v-on:input="enterWriteTodo"
             :value="inputValue"
             placeholder="What needs to be done?">
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoInput",
  props: {
    todoArrLength: Number,
    inputValue:String,
  },
  methods:{
    enterWriteTodo:function (event) {
      if (event.key==='Enter' && event.target.value !=="") {
        this.$emit('input', event.target.value);
        event.target.value = "";
      }
    },
    onClickAllSelected () {
      this.$emit('all-selected-clicked')
    }
  },
  computed: {
    isNotEmptyTodoArr () {
      return this.todoArrLength !== 0;
    },
  }
}
</script>

<style scoped>

.todoInput{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.todoInputBox{
  width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(211, 211, 211, 0.4);
  box-shadow: 10px 10px 10px #d3d3d3;
  background-color: white;
}

.allSelectButton {
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todoInputTextBox {
  width:650px;
  height: 40px;
  border: hidden;
  font-size: 20px;
}

.todoInputTextBox:focus {
  outline: none;
}

.todoInputTextBox::placeholder {
  color:#d3d3d3;
  font-style: italic;
}

.visibilityHidden {
  visibility: hidden;
}

</style>