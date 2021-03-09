import React ,{useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNewJob} from '../../actions/jobs';
import {Link} from 'react-router-dom';
import { setalert } from '../../actions/alert';

const AddJob = ({addNewJob, setalert}) => {
    const [formData, setFormData] = useState({
        title: '',
            applications: '',
            positions: '',
            skills: '',
            typeOfJob: '',
            duration: '',
            salary: '',
            deadline: ''
      });
    const {title,
        applications,
        positions,
        deadline,
        skills,
        typeOfJob,
        duration,
        salary,} = formData;
        const onChange = (e) => {
            // console.log(e.target.value);
            setFormData({ ...formData, [e.target.name]: e.target.value});
          };
      
          const onSubmit = async (e) => {
            e.preventDefault();

            if(typeOfJob !== 'Full-time' && typeOfJob!=='Part-time' && typeOfJob!=='Work from Home'){
              setalert('Please select type of job', 'danger');
            }
            else{
              addNewJob(formData);
            }
            
          }
    return (
        <Fragment>
        <h1>Add New Job</h1>
      <form onSubmit={e => onSubmit(e)}>
      
        <div className="form-group">
          <input type="text" className="form-control" placeholder="title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>

        <div className="form-group">
          <input type="number" className="form-control" placeholder="number of applications" name="applications" min='0' value={applications} onChange={e => onChange(e)} required />
        </div>

        <div className="form-group">
          <input type="number" className="form-control" placeholder="number of positions" name="positions" min='0' value={positions} onChange={e => onChange(e)} required />
        </div>

        {/* <div className="form-group">
          <input type="date" className="form-control" placeholder="date of posting" max={Date.now} name="date_of_posting"  value={date_of_posting} onChange={e => onChange(e)} required />
        </div> */}

        <div className="form-group">
          <input type="datetime-local" className="form-control" placeholder="deadline" min={Date.now} name="deadline"  value={deadline} onChange={e => onChange(e)} required />
        </div>

        {/* <div className="form-group">
          <input type="number" className="form-control" placeholder="day of deadline" name="day" value={day} max='31' min='1' onChange={e => onChange(e)} required />
        </div>

        <div className="form-group">
          <input type="number" className="form-control" placeholder="month of deadline" name="month" value={month} min='1' max='12' onChange={e => onChange(e)} required />
        </div>

        <div className="form-group">
          <input type="number" className="form-control" placeholder="year of deadline" name="year" value={year} min='0' max='2021' onChange={e => onChange(e)} required />
        </div>

        <div className="form-group">
          <input type="number" className="form-control" placeholder="hour of deadline" name="hour" value={hour} min='0' max='23' onChange={e => onChange(e)} required />
        </div>

        <div className="form-group">
          <input type="number" className="form-control" placeholder="minute of deadline" name="minute" value={minute} min='0' max='59' onChange={e => onChange(e)} required />
        </div> */}

        <div className="form-group">
          <input type="text" className="form-control" placeholder="skills" name="skills" value={skills} onChange={e => onChange(e)} />
        </div>

        <div className="form-group">
          <select class="custom-select" name="typeOfJob" value={typeOfJob} onChange={e => onChange(e)} required>
       <option selected>Type of Job</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Work from Home">Work from Home</option>
        </select>
        </div>
        
        <div className="form-group">
          <input type="number" className="form-control" placeholder="duration" name="duration" value={duration} min='1' max='6' onChange={e => onChange(e)} required />
        </div>

        <div className="form-group">
          <input type="number" className="form-control" placeholder="salary" name="salary" value={salary} onChange={e => onChange(e)} min='0' required />
        </div>
        <input type="submit" className="btn btn-primary" value="Add New Job" />
      </form>
        </Fragment>
    )
}

AddJob.propTypes = {
    addNewJob: PropTypes.func.isRequired,
    setalert: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {addNewJob, setalert})(AddJob);
