import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Route , Redirect } from 'react-router-dom';


const Privateroute = ({component: Component,auth,...restofprops}) => {
    const {userVerified, loading} = auth;
    return (
    <Route {...restofprops} render={(props) => !userVerified && !loading ? <Redirect to='/login'/> : <Component {...props} />}/>
    );
}

Privateroute.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.authReducer,
});
export default connect(mapStateToProps)(Privateroute);
