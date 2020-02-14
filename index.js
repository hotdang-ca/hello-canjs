import { realtimeRestModel, StacheElement, type } from "can";

const Todo = realtimeRestModel('http://localhost:3001/api/todos/{id}').ObjectType;

class TodosApp extends StacheElement {
    static view = `
        <h1>{{ this.title }}</h1>
        <input placeholder="What needs to be done?" value:bind="this.newName">
        <button on:click="this.save()" type="button">Add</button>

        {{# if(this.todosPromise.isPending) }}
            Loading todos…
        {{/ if }}

        {{# if(this.todosPromise.isRejected) }}
            <p>Couldn’t load todos; {{ this.todosPromise.reason }}</p>
        {{/ if }}

        {{# if(this.todosPromise.isResolved) }}
            <ul>
            {{# for(todo of this.todosPromise.value) }}
                <li class="{{# if(todo.complete) }}done{{/ if }}">
                    <label>
                        <input checked:bind="todo.complete" on:change="todo.save()" type="checkbox">
                    </label>
                    {{# eq(todo, this.selected) }}
                        <input focused:from="true" on:blur="this.saveTodo(todo)" value:bind="todo.name">
                    {{ else }}
                        <span on:click="this.selected = todo">
                            {{ todo.name }}
                        </span>
                    {{/ eq }}

                    <button on:click="todo.destroy()" type="button"></button>
                </li>
            {{/ for }}
            </ul>
        {{ /if }}
    `;

  static props = {
        newName: String,
        selected: type.maybe(Todo),

        get title() {
            return "Hello CanJS!"
        },

        get todosPromise() {
            return Todo.getList({ sort: "name" });
        },

        save() {
            const todo = new Todo({ name: this.newName });
            todo.save();

            this.newName = "";
        },

        saveTodo(todo) {
            todo.save();
            this.selected = null;
        }
  };
}

customElements.define("todos-app", TodosApp);
