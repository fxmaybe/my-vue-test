<template>
    <section>
        <input v-if="todos.length != 0" type="checkbox" v-model="allDone" /><input type="text" v-model="newTodo" @keyup.enter="addTodo" />
        <div class="todo-main">
            <ul>
                <li v-for="(todo, index) in currentTodos" :class="{editing: editingTodo == todo, completed: todo.completed}">
                    <div class="todo-view"><input type="checkbox" v-model="todo.completed" /><span class="todo-text" @dblclick="editTodo(todo)">{{todo.text}}</span> <span class="todo-remove" @click="removeTodo(todo)">删除</span></div>
                    <input type="text" v-todo-focus="editingTodo == todo" class="todo-edit" v-model="todo.text" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit" />
                </li>
            </ul>
        </div>
        <div class="todo-bar">
            <span v-if="remaining > 0">{{remaining}}{{remaining | ql}} left</span>
            <div>
                <a href="javascript:void(0);" onclick="return false;" @click="changeTab('all')">All</a>
                <a href="javascript:void(0);" onclick="return false;" @click="changeTab('active')">Active</a>
                <a href="javascript:void(0);" onclick="return false;" @click="changeTab('completed')">Completed</a>
            </div>
            <a href="javascript:void(0);" onclick="return false;" v-if="remaining < todos.length" @click="clearTodo()">Clear Completed</a>
        </div>
    </section>
</template>

<script>
var STORAGE_KEY = "todosx-vuejs-2.0";
var todoStorage = {
    fetch() {
        var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{\"visibility\": \"all\", \"todos\": []}");
        data.todos.forEach(function(todo, index){
            todo.id = index;
        });

        todoStorage.uid = data.length;

        return data;
    },
    save(todos, visibility) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({"visibility": visibility, "todos": todos}));
    }
}
var filters = {
    all(todos) {
        return todos;
    },
    active(todos){
        return todos.filter(function(todo){
            return !todo.completed;
        });
    },
    completed(todos){
        return todos.filter(function(todo){
            return todo.completed;
        });
    }
};

export default {
    // app initial state
    data() {
      return {
        todos: todoStorage.fetch().todos,
        newTodo: "",
        editingTodo: null,
        id: todoStorage.uid++,
        visibility: todoStorage.fetch().visibility
      }
    },

    computed: {
        currentTodos() {
            return filters[this.visibility](this.todos);
        },
        remaining() {
            return this.todos.filter(function(todo){
                return !todo.completed;
            }).length;
        },
        allDone: {
            get() {
                return this.remaining === 0;
            },
            set(val) {
                this.todos.forEach(function(todo){
                    todo.completed = val;
                });
            }
        }
    },
    watch: {
        todos: {
            handler() {
                todoStorage.save(this.todos, this.visibility);
            },
            deep: true
        }
    },

    filters: {
        ql(remaining) {
           return remaining > 1 ? "items" : "item";
        }
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
        changeTab(visibility) {
            if(this.visibility == visibility){
                return;
            }
            this.visibility = visibility;
            todoStorage.save(this.todos, this.visibility);
        },
        addTodo(){
            var val = this.newTodo.trim();
            if(val==""){
                return;
            }
            this.todos.push({
                id: this.id++,
                text: val,
                completed: false
            });
            this.newTodo = "";
        },
        removeTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1)
        },
        editTodo(todo) {
            this.editingTodo = todo;
            this.editCache = todo.text;
        },
        doneEdit(todo){
            this.editingTodo = null;
            todo.text = todo.text.trim();
            if(todo.text == "") {
                this.removeTodo(todo);
            }
            
        },
        cancelEdit(todo){
            this.editingTodo = null;
            todo.text = this.editCache;
        },
        clearTodo(){
            this.todos = filters.active(this.todos);
        }
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        todoFocus(el) {
            el.focus();
        }
    }
};

</script>

<style>
    section {
        padding-top: 86px;
    }
    ul li {
        display: block;
    }
    .todo-edit {display: none;}
    .editing .todo-view {display: none;}
    .editing .todo-edit {display: block;}

    .todo-remove {cursor: pointer;}
    .completed .todo-text {text-decoration: line-through;}
</style>
