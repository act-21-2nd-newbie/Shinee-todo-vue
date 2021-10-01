import axios from "axios";

async function getTodoList() {
    const response = await axios.get("api/todos");
    return response.data;
}

async function postNewTodo(newTodo) {
    const response = await axios.post("api/todos", newTodo);
    return response.data;
}

async function patchUpdateTodo(id, updateTodo) {
    const response = await axios.patch("api/todos/" + id, updateTodo);
    return response.data;
}

async function patchAllTodoStatus(status) {
    await axios.patch("api/todos", {status});
}

async function deleteTodo(id) {
    await axios.delete("api/todos/" + id);
}

export { getTodoList, postNewTodo, patchUpdateTodo, patchAllTodoStatus, deleteTodo }