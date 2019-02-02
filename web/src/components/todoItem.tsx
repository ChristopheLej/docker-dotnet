import * as React from 'react'
import { Todo } from '../store/interface'
import cx from 'classnames'

interface ITodoItemProps {
    todo: Todo
    onToggle: (todo: Todo) => void
    onDestroy: (todo: Todo) => void
    onUpdate: (todo: Todo, title: string) => void
}

interface ITodoItemState {
    editing: boolean
    title: string
}

export default class TodoItem extends React.PureComponent<ITodoItemProps, ITodoItemState> {
    constructor (props: ITodoItemProps) {
        super(props)
        this.state = {editing: false, title: props.todo.title}
    }

    // shouldComponentUpdate ({todo}: ITodoItemProps, state: ITodoItemState) {
    //     return todo !== this.props.todo
    // }
 
    render () {
        const {todo} = this.props
        const {editing, title} = this.state

        return (
            <li className={cx({completed: todo.completed, editing})}>
                <div className="view" >
                    <input className="toggle" type="checkbox" onChange={this.onToggle} checked={todo.completed} />
                    <label onDoubleClick={this.startEditing}>{todo.title}</label>
                    <button className="destroy" onClick={this.onDestroy}></button>
                </div>
                <input type="text" className="edit" value={title} onBlur={this.handleSubmit} onKeyDown={this.handleKeyDown} onInput={this.handleInput} onChange={this.onChangeInput}/>
            </li>
        )
    }

    onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {

    }

    onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onToggle(this.props.todo)
    }

    onDestroy = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onDestroy(this.props.todo)
    }

    startEditing = (e: React.MouseEvent<HTMLLabelElement>) => {
        this.setState({editing: true})
    }

    handleSubmit = (e: React.FocusEvent<HTMLInputElement>) => {
        this.setState({editing: false, title: this.props.todo.title})
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key, e.keyCode)
        if (e.keyCode == 27) { // Escape
            this.setState({editing: false, title: this.props.todo.title})
        } else if (e.keyCode == 13) { // Enter
            this.setState({editing: false})
            this.props.onUpdate(this.props.todo, this.state.title)
        }

    }

    handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ title: (e.target as HTMLInputElement).value })
    }
}
