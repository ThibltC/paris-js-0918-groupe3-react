import React, { Component } from "react";
import Toggle from "react-toggle";

import NewOfferQuestions from "./NewOfferQuestions";
import NewQuestion from "./NewQuestion";
import OrangeButton from "./OrangeButton";
import { connect } from "react-redux";
import { postNewOffer } from "../actions/newOfferActions";
import { fetchCities } from "../actions/searchOffersActions";

import "./css/NewOfferForm.scss";
import "./css/Toggle.scss";

class NewOfferForm extends Component {
  state = {
    title: "",
    place: "",
    contract_type: "CDI",
    description: "",
    is_published: false
  };

  handleChange = async e => {
    const { name, value } = e.target;
    await this.setState({
      [name]: value
    })
    const { place } = this.state;
    if (name === "place"){
      this.props.fetchCities(place);
    }
  };

  handleBoxChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.checked
      },
      () => console.log(this.state)
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.postNewOffer(this.state);
  };

  render() {
    const { citiesList } = this.props;
    return (
      <div className="NewOfferForm">
        <div className="container">
          <h2>Poster une offre</h2>
          <form className="postNewOfferForm" onSubmit={this.handleSubmit}>
            <div className="row align-items-center mt-4 mb-4">
              <div className="col-12 col-md-4 pr-1">
                <label htmlFor="title">Titre de votre offre</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  className="NewOfferForm_field_title"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Ex: Développeur Web"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="place">Lieu</label>
              </div>
              <div className="col-12 col-md-auto">
                <input
                  className="NewOfferForm_field_place"
                  type="text"
                  name="place"
                  id="place"
                  list="cities"
                  placeholder="Ex: Paris"
                  onChange={this.handleChange}
                />
                <datalist id="cities">
                {citiesList.length && citiesList.map(c =>
                  <option key={c.code}>{c.nom} ({c.codesPostaux[0].substr(0,2)})</option>
                )}
              </datalist>
              </div>
              <div className="col-12 col-md-auto">
                <label htmlFor="contract_type">Type de contrat</label>
              </div>
              <div className="col-12 col-md-1">
                <select
                  className="NewOfferForm_field_contactType"
                  name="contract_type"
                  id="contract_type"
                  onChange={this.handleChange}
                >
                  <option>CDI</option>
                  <option>CDD</option>
                  <option>Stage</option>
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="description">Description</label>
              </div>
              <div className="col-12">
                <textarea
                  className="NewOfferForm_field_description"
                  name="description"
                  id="description"
                  placeholder="Description de l'offre"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <NewOfferQuestions handleBoxChange={this.handleBoxChange} />
            <NewQuestion />
            <div className="row justify-content-center">
              <div className="col-auto offset-4 offset-md-8">
                <div className="row align-items-center">
                  <div className="col-3">
                    <Toggle
                      className="customToggleOrange"
                      name="is_published"
                      defaultChecked={false}
                      icons={false}
                      onChange={this.handleBoxChange}
                    />
                  </div>
                  <div className="col-9 text-center">
                    <span>Mettre en ligne</span>
                  </div>
                </div>
              </div>
              <div className="col-auto offset-4 offset-md-8">
                <OrangeButton text="Valider mon offre" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questionsList: state.newOffer.questionsList,
  citiesList : state.searchOffers.citiesList,
});

export default connect(
  mapStateToProps,
  { postNewOffer, fetchCities }
)(NewOfferForm);
