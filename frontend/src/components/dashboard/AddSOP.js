import React, {Fragment, useEffect, useState, Redirect} from 'react'
import PropTypes from 'prop-types'
import { loadJobWithId } from '../../actions/jobs';
import {connect} from 'react-redux';
import {newApplication} from '../../actions/applications';

const AddSOP = ({match, jobs: {cjob, loading}, loadJobWithId, newApplication}) => {
    const job = match.params.id;

    // console.log(job);
    const [formData, setFormData] = useState({
        recruiter: '',
        status: 'Applied',
        sop: '',
        title: '',
        salary: '',
        typeOfJob: '',
        rating: '',
        job_id: '',
        deadline: ''
      });
      
    const {
        recruiter,
        status,
        sop,
        recruiter_id,
        title,
        salary,
        typeOfJob,
        rating,
        deadline,
        job_id
    } = formData;
    useEffect(()=>{
        loadJobWithId(job);
    },[loadJobWithId]);
    if(!cjob || loading){
      return <Fragment>Loading.....</Fragment>
    }
    // console.log(deadline);
        const onChange = (e) => {
            console.log(e.target.value);
            setFormData({ ...formData, [e.target.name]: e.target.value,
              recruiter: cjob.recruiter_id, title: cjob.title, salary: cjob.salary, typeOfJob: cjob.typeOfJob, job_id: job, deadline: cjob.deadline
            });
          };
      
        const onSubmit =  (e) => {
            e.preventDefault();
            newApplication(formData);
          }
    return (
        <Fragment>
        <h1>Submit Application</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label for="id1">Statement Of Purpose</label>
          <textarea type="text" id='id1' className="form-control" rows='5' placeholder="SOP"  name="sop"  value={sop} onChange={e => onChange(e)} required></textarea>
        </div>
        <input type="submit" className="btn btn-primary" value="Submit Application" />
      </form>
        </Fragment>
    )
}

AddSOP.propTypes = {
    jobs: PropTypes.object.isRequired,
    loadJobWithId: PropTypes.array,
    newApplication: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    jobs: state.jobs,
});

export default connect(mapStateToProps, {newApplication, loadJobWithId})(AddSOP);
