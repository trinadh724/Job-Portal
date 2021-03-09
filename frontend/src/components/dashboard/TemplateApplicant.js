import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {} from '../../actions/jobs';
import moment from "moment";
import {Link} from 'react-router-dom';
// import deleteJob from '../../actions/jobs';


const TemplateApplicant = ({jobs, applicationsjob}) => {
    jobs = jobs.filter((value)=>new Date(value.deadline).getTime() > new Date().getTime());
    const code = jobs.map(({
            title,
            applications,
            positions,
            recruiter_id: {name},
            deadline,
            skills,
            typeOfJob,
            duration,
            salary,
            status,
            date_of_posting,
            _id
        }) => <table className='table' key={_id}>
        {title ? 
<Fragment>
    <tr>
        <th>Title</th>
        <td>{title}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}

{name ? 
<Fragment>
    <tr>
        <th>Name of recruiter</th>
        <td>{name}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}


{deadline ? 
<Fragment>
    <tr>
        <th>Deadline of application</th>
        <td>{moment(deadline).format('LLL')}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}
{salary ? 
<Fragment>
    <tr>
        <th>salary</th>
        <td>{salary}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}


{typeOfJob ? 
<Fragment>
    <tr>
        <th>Type Of Jobs</th>
        <td>{typeOfJob}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}

{duration ? 
<Fragment>
    <tr>
        <th>duration</th>
        <td>{duration}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}
    <tr>
         { applicationsjob && applicationsjob.filter((value)=>  value.job_id === _id).length !== 0? <Fragment>
            <td><button className="btn btn-primary">Applied</button></td>              
        </Fragment>
        :
        (status === 'Full' ? 
        <td><button className="btn btn-warning">Full</button></td>
        : 
        <td><Link to={`/sop/${_id}`} className="btn btn-success">Apply</Link></td>
        )
    }

    </tr> 
    
</table>)
    return (
        <Fragment>
            <h2>Jobs</h2>
            {code}
        </Fragment>
    );
}

TemplateApplicant.propTypes = {
    applicationsjob: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    applicationsjob: state.applications.applications
});
export default connect(mapStateToProps, null)(TemplateApplicant
);
