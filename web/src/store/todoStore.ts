import {Todo} from './interface'
import { ApiClient } from '../service/ApiClient'

declare type ChangeCallback = (store: TodoStore) => void

export class TodoStore {
    public todos: Todo[] = []
    private dataBase: boolean = false
    private static i = 0
    private callbacks: ChangeCallback[] = []

    static incement (): number {
        return this.i ++
    }

    get DataBase ():boolean {
        return this.dataBase
    }

    set DataBase (value: boolean) {
        this.dataBase = value
        if (this.dataBase) {
            this.loadFromDatabase()
        } else {
            this.inform()
        }
    }

    onChange (cb: ChangeCallback) {
        this.callbacks.push(cb)
    }

    inform () {
        this.callbacks.forEach(cb => cb(this))
    }

    // Add Todo
    addTodo (title: string): void {
        if(this.DataBase) {
            ApiClient.createTask(title)
            .then(response => {
                this.addingTodo(response.data)
            })
        } else {
            this.addingTodo( 
                {   id: TodoStore.incement(),
                    title: title,
                    completed: false
                }
            )
        }
    }

    private addingTodo (todo: Todo): void {
        this.todos = [ todo, ...this.todos]
        this.inform()
    }


    // Remove Todo
    removeTodo (todo: Todo): void {
        if(this.DataBase) {
            ApiClient.deleteTask(todo.id)
            .then(response => {
                console.log(response)
                this.removingTodo(todo)
            })
        } else {
            this.removingTodo(todo)
        }
    }

    private removingTodo (todo: Todo): void {
        this.todos = this.todos.filter(t => t !== todo)
        this.inform()
    }


    // Update completed Todo
    toggleTodo(todo: Todo) : void {
        if(this.DataBase) {
            ApiClient.updateTask({ ...todo, completed:!todo.completed })
            .then(response => {
                console.log(response)
                this.togglingTodo(todo)
            })
        } else {
            this.togglingTodo(todo)
        }
    }

    private togglingTodo(todo: Todo) : void {
        this.todos = this.todos.map(t => t === todo ? {...t, completed:!t.completed} : t)
        this.inform()
    }


    // Update completed all Todo
    toggleAll(completed: boolean = true) : void {
        if(this.DataBase) {
            this.todos.map(t =>{
                if (t.completed !== completed) {
                    ApiClient.updateTask({...t, completed})
                    .then(response => {
                        console.log(response)
                    })
                }
            })
        }

        this.togglingAll(completed)
    }

    private togglingAll(completed: boolean ) : void {
        this.todos = this.todos.map(t => t.completed !== completed ? {...t, completed} : t)
        this.inform()
    }



    // Update title Todo
    updateTitle (todo: Todo, title: string): void {
        if(this.DataBase) {
            ApiClient.updateTask({...todo, title})
            .then(response => {
                console.log(response)
                this.updatingTitle(todo, title)
            })
        } else {
            this.updatingTitle(todo, title)
        }
    }

    updatingTitle (todo: Todo, title: string): void {
        this.todos = this.todos.map(t => t === todo ? {...t, title} : t)
        this.inform()
    }


    // Delete completed Todo
    cleanTodo (): void {
        if(this.DataBase) {
            this.todos.map(t =>{
                if (t.completed) {
                    ApiClient.deleteTask(t.id)
                    .then(response => {
                        console.log(response)
                    })
                }
            })
        }

        this.cleaningTodo()
    }

    private cleaningTodo (): void {
        this.todos = this.todos.filter(t => !t.completed)
        this.inform()
    }

    private loadFromDatabase () : void {
        ApiClient.getTasks()
        .then(response => response.data)
        .then(data => {
            this.todos = data as Todo[]
            console.log('loadFromDatabase', this.todos)
            this.inform()
        })

    }
}