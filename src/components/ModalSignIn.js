import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getIdCompany } from "../actions/connexionUsersActions";

import OrangeButton from "./OrangeButton";
import "./css/OrangeButton.scss";
import { toggleModalAccount } from "../actions/modalsAccountActions";

class ModalSignIn extends Component {
  state = {
    inputEmail: "",
    inputPassword: "",
    redirection: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { inputEmail, inputPassword } = this.state;
    await this.props.getIdCompany(inputEmail, inputPassword);
    this.setState({
      redirection: true
    });
  };
  render() {
    const { redirection } = this.state;
    const { toggleModalAccount } = this.props;

    if (redirection === true)
      return <Redirect to={`/company${this.props.idCompany}`} />;

    return (
      <div>
        <div className={this.props.modalDisplay}>
          <div className="backgroundModal">
            <div className="modalDIY animated fadeInDown faster">
              <button className="close" onClick={toggleModalAccount}>
                <span>&times;</span>
              </button>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="inputEmail"
                  placeholder="entrer email entreprise"
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="inputPassword"
                  placeholder="password"
                  onChange={this.handleChange}
                />
                <OrangeButton text="Connection" />
              </form>
              <NavLink to="/newAccountCompagny">Inscription</NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  idCompany: state.usersInfo.idCompany,
  openModal: state.toggleModalsAccount.openModal
});

export default connect(
  mapStateToProps,
  { getIdCompany, toggleModalAccount }
)(ModalSignIn);
