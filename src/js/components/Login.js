import React from 'react';
import { Redirect } from "react-router-dom";

const user = {
  email : "adel",
  pwd : "adel"
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      auth: false,
      isSubmit: false
    }

    if(this.props.location) {

      if (this.props.location.pathname === '/logout') {
        localStorage.removeItem('authToken')
        this.props.onLog(false)

      }
    }
  }


  componentDidMount() {
    if( localStorage.getItem('authToken') )
      this.setState({auth : localStorage.getItem('authToken') === 'true'});
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name] : value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const {email, password} = this.state;

    if(email === user.email && password === user.pwd){
      this.setState({auth:true, isSubmit:true})
      localStorage.setItem('authToken',true)

      if(this.props.onLog){
        this.props.onLog(true)
      }

      this.forceUpdate()

    }

  }

  render() {

    const valid = this.state.email && this.state.password;

    if(this.state.auth) {
      return( <Redirect
          to={{pathname : '/dashboard', state : { from : "/login", message : "Welcome Dashboard"}}}
      />)

    }

    else {
      return(<div className="login">
        <p className={"text-center"}>Authentifiez-vous</p>
        <form className={"container"}>
          {this.state.isSubmit && this.state.auth === false ? <p>Erreur de connexion (mot de passe ou login)</p> : null}
          <div className="form-group">
            <label htmlFor={"login"}>Email</label>
            <input className={"form-control"} name="email" type="email" required={true} value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor={"login"}>Password</label>
            <input className={"form-control"} name="password" type="password" required={true} value={this.state.password} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <button className={"btn btn-primary"} disabled={!valid} onClick={this.handleSubmit}>Valider</button>
          </div>
        </form>
      </div>)
    }
  }
}

export default Login;
