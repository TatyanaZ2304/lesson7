import React from 'react';
import { v4 } from 'uuid';
import { FaCheck } from "react-icons/fa";
import styles from './ToDoList.module.scss';


class Header extends React.Component {
    render() {
        return (
            <h1 className={styles.header}> You have <span className={styles.todos}>{this.props.length}</span> todos </h1>)
    }
}

class SubmitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.value);
        this.setState({
            value: ""
        })
    }
    render() {
        return (
            <form>
                <input className={styles.inp} type="text" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                <input className={styles.subm} type="submit" onClick={this.handleSubmit} value="Submit" />
            </form>)
    }
}

class List extends React.Component {
    render() {
        return (
            <ul>
                {this.props.list.map(element => {
                    const { id, value } = element;
                    return <li key={id}>
                        <FaCheck className={styles.check} color="green" />
                        {value}
                        <button className={styles.btn} onClick={() => this.props.onDelete(id)}>Delete</button> </li>
                })}
            </ul>
        )
    }
}

class ToDoList extends React.Component {
    state = {
        list: []
    }
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleAdd(value) {
        this.setState({
                list: this.state.list.concat({
                    id: v4(),
                    value
                })
            })
    }

    handleDelete(id) {
        this.setState((prevState) => {
            const filteredList = prevState.list.filter(element => element.id !== id)
            return {
                list: filteredList
            }
        })
    }
    render() {
        return (
            <div>
                <Header length={this.state.list.length} />
                <FaCheck opacity="0" />
                <List list={this.state.list} onDelete={this.handleDelete} />
                <SubmitForm onAdd={this.handleAdd} />
            </div>)

    }
}

export default ToDoList;