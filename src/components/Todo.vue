<template>
  <div class="todo">
    <div v-if="statusCheck" class="todoErase" @click="onClickErase">
      ⚪
    </div>
    <div v-else class="todoErase" @click="onClickErase">
      ✔
    </div>
    <div v-if="statusCheck" class="todoInputText">
      <div @dblclick="ondbClickTextEdit">
        <div v-if=this.edit class="todoInputTextEdit" @keypress="enterEditWriteTodo">
          <input v-on:input="enterEditWriteTodo"
                 :value="content"
                 v-click-outside="onClickOutsideTextEdit"/>
        </div>
        <div v-else>
          {{this.content}}
        </div>
      </div>
    </div>
    <div v-else class="todoInputText">
      <div @dblclick="ondbClickTextEdit">
        <div v-if=this.edit class="todoInputTextEdit" @keypress="enterEditWriteTodo">
          <input v-on:input="enterEditWriteTodo"
                 :value="content"
                 v-click-outside="onClickOutsideTextEdit"/>
        </div>
        <div v-else class="cancelLine">
          {{this.content}}
        </div>
      </div>
    </div>
    <div class="todoDelete" @click="onClickDelete">
      🗙
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  name: "Todo",
  directives:{
    clickOutside:vClickOutside.directive
  },
  props: { //부모한테 받아야 하는 데이터
    id:String, //id
    content:String, //할 내용
    status:String, //완료 상태 --> Completed:완료, Active:미완료
    edit:Boolean, //텍스트 수정 여부 true: 텍스트 수정 창 활성화, false: 텍스트 수정 창 비활성화
  },
  methods: {
    onClickErase() {
      this.$emit('erase-clicked', this.id);
    },
    ondbClickTextEdit() {
      this.$emit('edit-dbclicked', this.id)
    },
    onClickOutsideTextEdit() {
      this.$emit('edit-clicked-outside', this.id)
    },
    enterEditWriteTodo:function (event) {
      if (event.key==='Enter') {
        this.$emit('input', this.id, event.target.value);
      }
    },
    onClickDelete() {
      this.$emit('delete-clicked', this.id);
    },
  },
  computed: {
    statusCheck () {
      return this.status === 'Active';
    },
  }
}
</script>

<style scoped>

body {
  background-color:white;
}

.todo {
  width:700px;
  height:50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid rgba(211, 211, 211, 0.4);
  border-left: 1px solid rgba(211, 211, 211, 0.4);
  border-bottom: 1px solid rgba(211, 211, 211, 0.4);
}

.todo:hover .todoDelete{
  visibility: visible;
  cursor: pointer;
}

.todoErase {
  cursor: pointer;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todoInputText {
  width: 620px;
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
}

input {
  width: 620px;
  height: 30px;
  font-size: 18px;
}

.cancelLine{
  text-decoration: line-through;
  color: #d3d3d3
}

.todoDelete{
  visibility: hidden;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>