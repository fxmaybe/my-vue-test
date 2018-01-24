<template>
    <section>
        <input type="checkbox" v-model="allDone" v-if="todos.length" /><input placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo" />
        <div class="todo-main" v-cloak>
            <ul>
                <li v-for="todo in currentTodos" :class="{editing: todo == editingTodo, completed: todo.completed}">
                    <div class="todo-view">
                        <input type="checkbox" v-model="todo.completed" />
                        <span class="todo-text" @dblclick="editTodo(todo)">{{todo.text}}</span>
                        <button @click="removeTodo(todo)">删除</button>
                    </div>
                    <input v-todo-focus="todo == editingTodo" @keyup.enter="doneEdit(todo)" class="todo-edit" type="text" v-model="todo.text" @blur="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" />
                </li>
            </ul>
        </div>
        <div class="todo-bar clearfix" v-cloak>
            <div v-show="remaining" class="fl">{{remaining}}{{remaining | pls}}left</div>
            <div class="todo-opra">
                <a href="javascript:void(0);" onclick="return false;" @click="changeTab('all')">All</a>
                <a href="javascript:void(0);" onclick="return false;" @click="changeTab('active')">Active</a>
                <a href="javascript:void(0);" onclick="return false;" @click="changeTab('completed')">Completed</a>
            </div>
            <a href="javascript:void(0);" class="fr clear-completed" onclick="return false;" @click="clearCompleted()" v-if="todos.length > remaining">clear Completed</a>
        </div>
    </section>
</template>

<script>

var STORAGE_KEY = "todos3-vuejs-2.0";
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

var filters = {
    all(todos) {
        return todos;
    },
    active(todos) {
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
        visibility: todoStorage.fetch().visibility
      }
    },

    // watch todos change for localStorage persistence
    watch: {
        todos: {
             handler() {
                // this.$http({
                //     method: "POST",
                //     url: "http://localhost/vue/json.php",
                //     data: {todos: JSON.stringify(todos)}
                // }).then(function(res){
                //     console.log(res);
                // });
            
                todoStorage.save(this.todos, this.visibility);
            },
          deep: true
        }
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
        currentTodos() {
            return filters[this.visibility](this.todos);
        },
        remaining() {
            return filters.active(this.todos).length;
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

    filters: {
        pls(remaining) {
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

            todoStorage.save(this.todos, visibility);
            this.visibility = visibility;
        },

        addTodo() {
            var val = this.newTodo.trim();
            if(val == ""){
                return;
            }
            this.todos.push({
                id: localStorage.uid++,
                text: val,
                completed: false
            });

            this.newTodo = "";
        },
        removeTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
        },
        editTodo(todo) {
            console.log(1);
            this.editCache = todo.text;
            this.editingTodo = todo;
        },
        doneEdit(todo) {
             this.editingTodo = null;
             console.log(243);
        },
        cancelEdit(todo) {
            todo.text = this.editCache;
            this.editingTodo = null;
        },
        clearCompleted(){
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
    /*清浮动*/
    .clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }
    .clearfix { display: inline-block; }
    .clearfix { display: block; }

    .fl{float:left;display: inline;}
    .fr{float:right;display: inline;}

    section {padding-top: 86px;}
    .todo-edit {
        display: none;
    }
    .todo-main ul li{ display: block; }
    .editing .todo-view {
        display: none;
    }
    .editing .todo-edit {
        display: block;
    }
    .completed .todo-text {
        text-decoration: line-through;
    }

    .todo-bar {position: relative;}
    .todo-bar .todo-opra {position: absolute; width: 100%; text-align: center;}
    .clear-completed {z-index: 11; }

</style>
