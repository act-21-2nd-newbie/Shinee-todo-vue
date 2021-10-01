<template>
  <div class="todoFilter">
    <div v-if="isNotEmptyTodoArr" class="todoFilterBox">
      <div v-if="isMoreThanOneTodoActiveArr" class="todoLeftItem">
        {{todoActiveArrLength}} items left
      </div>
      <div v-else class="todoLeftItem">
        {{todoActiveArrLength}} item left
      </div>
      <div class="todoStatus">
        <div v-if="isAllButtonSelected">
          <button class="statusButtonSelected" @click="statusChange('All')">All</button>
        </div>
        <div v-else>
          <button class="statusButton" @click="statusChange('All')">All</button>
        </div>
        <div v-if="isActiveButtonSelected">
          <button class="statusButtonSelected" @click="statusChange('Active')">Active</button>
        </div>
        <div v-else>
          <button class="statusButton" @click="statusChange('Active')">Active</button>
        </div>
        <div v-if="isCompletedButtonSelected">
          <button class="statusButtonSelected" @click="statusChange('Completed')">Completed</button>
        </div>
        <div v-else>
          <button class="statusButton" @click="statusChange('Completed')">Completed</button>
        </div>
      </div>
      <div v-if="isNotEmptyTodoCompletedArr" class="todoClear">
        <span class="clearButton" @click="onClickClear">Clear completed</span>
      </div>
      <div v-else class="todoClear">
        <span class="visibilityHidden">Clear completed</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "TodoFilter",
  props: { // 부모한테 받는 데이터
    todoArrLength:Number,
    todoCompletedArrLength:Number,
    todoActiveArrLength:Number,
    todoStatus:String,
  },
  methods: {
    statusChange(status) {
      this.$emit('change-status', status);
    },
    onClickClear() {
      this.$emit('clear-clicked');
    },
  },
  computed :{
    isNotEmptyTodoArr () {
      return this.todoArrLength !== 0;
    },
    isNotEmptyTodoCompletedArr () {
      return this.todoCompletedArrLength !== 0;
    },
    isMoreThanOneTodoActiveArr() {
      return this.todoActiveArrLength > 1;
    },
    isAllButtonSelected() {
      return this.todoStatus === 'All';
    },
    isActiveButtonSelected() {
      return this.todoStatus === 'Active';
    },
    isCompletedButtonSelected() {
      return this.todoStatus === 'Completed';
    },
  }
}
</script>

<style scoped>

.todoFilter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.todoFilterBox {
  width:700px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid rgba(211, 211, 211, 0.4);
  border-left: 1px solid rgba(211, 211, 211, 0.4);
  border-bottom: 1px solid rgba(211, 211, 211, 0.4);
  background-color: white;
  box-shadow: 10px 10px 10px #d3d3d3;
}

.todoLeftItem {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todoStatus {
  width: 170px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.statusButtonSelected {
  background-color: white;
  color: black;
  cursor: pointer;
  border: 1px solid rgba(76, 175, 80); /* Green */
  border-radius: 4px;
}

.statusButton {
  background-color: white;
  color: black;
  border:none;
}

.statusButton:hover {
  cursor: pointer;
  border: 1px solid rgba(76, 175, 80, 0.3); /* Green */
  border-radius: 4px;
}

.todoClear {
  width: 150px;
  display: flex;
  justify-content: center;
}

.clearButton:hover {
  cursor: pointer;
  text-decoration: underline;
}
.visibilityHidden {
  visibility: hidden;
}

</style>