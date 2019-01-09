import React, { Component } from "react";
import { getOffersCompany, getApplicationsOnOffers } from "../actions/accountCompanyActions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import OrangeButton from "./OrangeButton";

// import './AccountCompany.css';
import Offer from "./Offer";
import CompanyInfo from "./CompanyInfo";

class AccountCompany extends Component {
  componentDidMount = () => {
    const { id } = this.props.match.params
    this.props.getOffersCompany(1);
    this.props.getApplicationsOnOffers(id)
  };

  render() {
    const { offersList, applicationsCompany } = this.props;
    const { id } = this.props.match.params;
    console.log(id)
    console.log(applicationsCompany)
    return (
      <div className="AccountCompany" aria-hidden="true">
        <CompanyInfo id={id} />
        <NavLink to="/newOffer">
          <OrangeButton text="Poster une offre" />
        </NavLink>
        {offersList.map((e, i) => (
          <Offer origin="company" data={e} key={e.id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  offersList: state.accountCompany.offersList,
  applicationsCompany: state.accountCompany.applicationsCompany
});

export default connect(
  mapStateToProps,
  { getOffersCompany, getApplicationsOnOffers }
)(AccountCompany);
