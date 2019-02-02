import * as React from 'react'
import { TodoStore } from '../store/todoStore'
import { Todo } from '../store/interface'
import TodoItem from './todoItem'
import cx from 'classnames'

const Filters = {
    completed: (todo: Todo) => todo.completed,
    active: (todo: Todo) => !todo.completed,
    all: (todo: Todo) => true
}

type FilterOptions = 'all' | 'completed' | 'active'

interface ITodoListProps {
}

interface ITodoListState {
    todos: Todo[],
    newTodo: string,
    filter: FilterOptions,
    database: boolean
}

export default class TodoList extends React.PureComponent<ITodoListProps, ITodoListState> {
    private store: TodoStore = new TodoStore()
    private toggleTodo: (todo: Todo) => void
    private deleteTodo: (todo: Todo) => void
    private cleanTodo: () => void
    private updateTodo: (todo: Todo, title: string) => void

    constructor (props: ITodoListProps) {
        super(props)

        this.state = { todos: [], newTodo: '', filter: 'all', database: false}

        this.store.onChange((store) => {
            this.setState({todos: store.todos, database: store.DataBase})
        })

        this.toggleTodo = this.store.toggleTodo.bind(this.store)
        this.deleteTodo = this.store.removeTodo.bind(this.store)
        this.cleanTodo = this.store.cleanTodo.bind(this.store)
        this.updateTodo = this.store.updateTitle.bind(this.store)
    }

    componentDidMount () {
        // this.store.addTodo('salut')
        // this.store.addTodo('les gens')
    }

    get remainingCount (): number {
        return this.store.todos.reduce((count, todo) => !todo.completed ? count + 1 : count, 0)
    }

    get completedCount (): number {
        return this.store.todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0)
    }

    render () {
        const { todos, newTodo, filter, database } = this.state
        const remaining = this.remainingCount
        const completed = this.completedCount
        const todoFiltered = todos.filter(Filters[filter])

        return (
            <section className="todoapp">
                <div>
                    <div>
                        <input type="checkbox" onChange={this.useDatabase} checked={database}/>
                        <label>Use database</label>
                    </div>
                    <header className="header">
                        <h1>todos</h1>
                        <input className="new-todo" placeholder="What needs to be done?" value={newTodo} onInput={this.updateNewTodo} onKeyPress={this.addTodo} onChange={this.onChangeInput}/>
                    </header>
                    <section className="main">
                        <input className="toggle-all" type="checkbox" checked={remaining === 0} onChange={this.onChangeInput}/>
                        <label htmlFor="toggle-all" onClick={this.toggleAllTodo}></label>
                        <ul className="todo-list">
                            {
                                todoFiltered.map((todo:Todo) => {
                                    return <TodoItem todo={todo} key={todo.id} onToggle={this.toggleTodo} onDestroy={this.deleteTodo} onUpdate={this.updateTodo}/>
                                })
                            }
                        </ul>
                    </section>
                    <footer className="footer">
                        {remaining > 0 &&
                            <span className="todo-count">
                                <strong>{remaining}</strong>
                                <span> item left</span>
                            </span>
                        }
                        <ul className="filters">
                            <li>
                                <a href="#/" className={cx({selected: filter === 'all'})} onClick={this.setFilter('all')}>All</a>
                            </li>
                            <li>
                                <a href="#/active" className={cx({selected: filter === 'active'})} onClick={this.setFilter('active')}>Active</a>
                            </li>
                            <li>
                                <a href="#/completed" className={cx({selected: filter === 'completed'})} onClick={this.setFilter('completed')}>Completed</a>
                            </li>
                        </ul>
                        {completed > 0 &&
                            <button className="clear-completed" onClick={this.cleanTodo}>Clear completed</button>
                        }
                    </footer>
                </div>
            </section>        
        )
    }

    onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {

    }

    updateNewTodo = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({newTodo: (e.target as HTMLInputElement).value })
    }

    addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.store.addTodo(this.state.newTodo)
            this.setState({newTodo: ''})
        }
    }

    toggleAllTodo = () => {
        this.store.toggleAll(this.remainingCount > 0)
    }

    setFilter = (filter: FilterOptions) => {
        return (e: React.MouseEvent<HTMLElement>) => {
            this.setState({filter})
        }
    }

    useDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('useDatabase', e.target.checked)
        this.store.DataBase = e.target.checked
    }
}
