<template>
  <div class="todoBox">
    <div class="box">
      <div v-for="todo in todoArr" :key="todo.id">
        <Todo :id="todo.id"
              :content="todo.content"
              :status="todo.status"
              :edit="todo.edit"
              @erase-clicked="onClickErase"
              @edit-dbclicked="ondbClickTextEdit"
              @input="enterEditWriteTodo"
              @edit-clicked-outside="onClickOutsideTextEdit"
              @delete-clicked="onClickDelete">
        </Todo>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from './Todo.vue'

export default {
  name: "TodoBox",
  components: {
    Todo
  },
  props: { // 부모한테 받는 데이터
    todoArr:Array,
  },
  methods: {
    onClickErase(id) {
      this.$emit('erase-clicked', id);
    },
    ondbClickTextEdit(id) {
      this.$emit('edit-dbclicked', id)
    },
    enterEditWriteTodo (id, editText) {
      this.$emit('input', id, editText);
    },
    onClickOutsideTextEdit(id) {
      this.$emit('edit-clicked-outside', id)
    },
    onClickDelete(id) {
      this.$emit('delete-clicked', id);
    },
  },
}
</script>

<style scoped>

.todoBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 10px 10px 10px #d3d3d3;
}

</style>