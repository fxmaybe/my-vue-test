<template>
      <section class="todoapp">
        <header class="header">
            <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo" />
        </header>
        <section class="main" v-show="todos.length" v-cloak>
            <input class="toggle-all" type="checkbox" v-model="allDone" />
            <ul class="todo-list">
                <li v-for="(todo, index) in filteredTodos" class="todo" :key="todo.id" :class="{ completed: todo.completed, editing: todo == editedTodo }">
                <div class="view">
                    <input class="toggle" type="checkbox" v-model="todo.completed" />
                    <label @dblclick="editTodo(todo)">{{(index + 1) +".&nbsp;"+ todo.title }}</label>
                    <button class="destroy" @click="removeTodo(todo)"></button>
                </div>
                <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
                </li>
            </ul>
        </section>
        <footer class="footer" v-show="todos.length" v-cloak>
            <span class="todo-count">
                <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
            </span>
            <ul class="filters">
                <li><a href="javascript:void(0);" @click="changeTab('all')" :class="{ selected: visibility == 'all' }">All</a></li>
                <li><a href="javascript:void(0)" @click="changeTab('active')" :class="{ selected: visibility == 'active' }">Active</a></li>
                <li><a href="javascript:void(0)" @click="changeTab('completed')" :class="{ selected: visibility == 'completed' }">Completed</a></li>
            </ul>
            <button class="clear-completed" @click="removeCompleted" v-if="todos.length > remaining">
            Clear completed
            </button>
        </footer>
    </section>
</template>

<script>
import "../assets/css/todos.css";

import Axios from "axios";

var STORAGE_KEY = "todos-vuejs-2.0";
var todoStorage = {
    fetch() {
        var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{\"visibility\": \"all\", \"todos\": []}");
        data.todos.forEach(function (todo, index) {
            todo.id = index;
        })
        todoStorage.uid = data.todos.length;
        return data;
    },
    save(todos, visibility) {
      console.log(visibility);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({"visibility": visibility, "todos": todos}));
    }
};

// visibility filters
var filters = {
    all(todos) {
        return todos;
    },
    active(todos) {
        return todos.filter(function (todo) {
            return !todo.completed;
        });
    },
    completed(todos) {
        return todos.filter(function (todo) {
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
        editedTodo: null,
        visibility: todoStorage.fetch().visibility
      }
    },

    // watch todos change for localStorage persistence
    watch: {
        todos: {
            handler(todos) {
                // this.$http({
                //     method: "POST",
                //     url: "http://localhost/vue/json.php",
                //     data: {todos: JSON.stringify(todos)}
                // }).then(function(res){
                //     console.log(res);
                // });
                // 
                todoStorage.save(todos, this.visibility);
            },
          deep: true
        }
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
        filteredTodos() {
            return filters[this.visibility](this.todos);
        },
        remaining() {
            return filters.active(this.todos).length;
        },
        allDone: {
            get() {
                return this.remaining === 0;
            },
            set(value) {
                this.todos.forEach(function (todo) {
                    todo.completed = value;
                });
            }
        }
    },

    filters: {
        pluralize(n) {
            return n === 1 ? "item" : "items";
        }
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
        changeTab(visibility){
            if(this.visibility == visibility){
              return;
            }
            this.visibility = visibility;  
            todoStorage.save(this.todos, this.visibility);
        },
        addTodo() {
            var value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return;
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: value,
                completed: false
            });
            this.newTodo = "";
        },

        removeTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
        },

        editTodo(todo) {
            this.beforeEditCache = todo.title;
            this.editedTodo = todo;
        },

        doneEdit(todo) {
            if (!this.editedTodo) {
                return;
            }

            this.editedTodo = null;
            todo.title = todo.title.trim();
            if (!todo.title) {
                this.removeTodo(todo);
            }
        },

        cancelEdit(todo) {
            this.editedTodo = null;
            todo.title = this.beforeEditCache;
        },

        removeCompleted() {
            this.todos = filters.active(this.todos);
        }
   },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        "todo-focus"(el, value) {
            if (value) {
                el.focus();
            }
        }
    }
};

</script>

<style scoped>
.todo-list .edit {
  height: auto;
}
.todo-list .toggle:before {
  position: static;
  top: auto;
  right: auto;
  font-size: 13px;
  color: #999;
  text-transform: uppercase;
  content: "";
}
.footer {box-sizing: content-box;}
</style>
