import React, {Component} from 'react';
import {Consumer} from '../../context'
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios'

export default class AddContact extends Component {

  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const {name, email, phone} = this.state;

    // check for errors

    if (name === "") {
      this.setState({errors: {name: "Name is required"}})
      return;
    }
    if (email === "") {
      this.setState({errors: {email: "Email is required"}})
      return;
    }
    if (phone === "") {
      this.setState({errors: {phone: "Phone is required"}})
      return;
    }

    const res = await axios.post('https://jsonplaceholder.typicode.com/users', {
      name, email, phone
    })

    dispatch({
      type: 'ADD_CONTACT',
      payload: res.data
    })

    this.setState({name: '', email: '', phone: '', errors: ''})

    this.props.history.push('/')
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {name, email, phone, errors} = this.state;
    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form
                  onSubmit={this
                  .onSubmit
                  .bind(this, dispatch)}>
                  <TextInputGroup
                    type="text"
                    value={name}
                    label="Name"
                    onChange={this.onChangeHandler}
                    name="name"
                    placeholder="Enter Name..."
                    error={errors.name}
                    />
                  <TextInputGroup
                    type="email"
                    value={email}
                    label="Email"
                    onChange={this.onChangeHandler}
                    name="email"
                    placeholder="Enter Email..."
                    error={errors.email}
                      
                    />
                  <TextInputGroup
                    type="phone"
                    value={phone}
                    label="Phone"
                    onChange={this.onChangeHandler}
                    name="phone"
                    placeholder="Enter Phone..."
                    error={errors.phone}

                    />

                  <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}