import React, {Fragment,  Link, useState, Redirect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';
import { Applicant } from '../../actions/types';

const AddEducation = ({auth: {loading, user}, addEducation}) => {
    const [formData , setFormData] = useState({
        to: '',
        from : '',
        institute: '',
    });
    const {
        to,
        from,
        institute
    } = formData;
    const onChange = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value});

    };
    const onSubmit = (e) => {
        e.preventDefault();
        addEducation(formData);
    }
    if(loading || !user){
        return (<Fragment>loading....</Fragment>)
    }
    return (
        <Fragment>
        <h1 className="large text-primary">
        Add Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any Institute 
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit= {e => onSubmit(e)}>
        <div className="form-group">
        <label for="insid">Institute</label>
          <input
          id='insid'
          className="form-control"
            type="text"
            placeholder="Institute"
            name="institute"
            value={institute} onChange={e => onChange(e)} required
          />
        </div>
        <div className="form-group">
        <label for="id1">Start Year (YYYY)</label>
          <input type="number" name="from" id='id1'
            placeholder="Start year"
            className="form-control"
            value={from} min='1950' max='2021' onChange={e => onChange(e)} required
          />
        </div>
        <div className="form-group">
        <label for="id2">End Year (YYYY)</label>
          <input type="number" name="to" id='id2'
            placeholder="End Year"
            className="form-control"
            value={to} min='1950' max='2021' onChange={e => onChange(e)}
            />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
      </form>
      {/* <Link  to='/profile'>Go Back</Link> */}

        </Fragment>
    )
}

AddEducation.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth : state.authReducer
});


export default connect(mapStateToProps, {addEducation})(AddEducation);
