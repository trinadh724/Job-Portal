import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {} from '../../actions/jobs';
import moment from "moment";
import {Link} from 'react-router-dom';
// import deleteJob from '../../actions/jobs';
import {changeStatus} from '../../actions/applications';


const DisplayAccepted = ({applicationjobs, changeStatus}) => {
    
    applicationjobs =  applicationjobs.filter((val) => val.status === 'Accepted');
    const code = applicationjobs.map(({
        applicant: {name,skills},
        dateOfJoining,
        dateOfApplication,
        sop,
        status,
        job_id,
        _id
        }) => <table className='table' key={_id}>
        
{name ? 
<Fragment>
    <tr>
        <th>Name Of Applicant</th>
        <td>{name}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}

{skills ? 
<Fragment>
    <tr>
        <th>Skills of Applicant</th>
        <td>{skills}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}


{dateOfApplication ? 
<Fragment>
    <tr>
        <th>Date Of Joining</th>
        <td>{dateOfApplication}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}


{sop ? 
<Fragment>
    <tr>
        <th>Statement Of Purpose</th>
        <td>{sop}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}

{status ? 
<Fragment>
    <tr>
        <th>Status of application</th>
        <td>{status}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}
    
<tr>
    <td>
    
    {
    status === 'Applied' ? 
    <Fragment>
        <button className="btn btn-success" onClick={(e) => changeStatus({_id,status, newstatus: 'Shortlist', nopositions: 0, noapplications: 0,job_id})}>Shortlist</button>
    </Fragment>
    :
    (
        status === 'Shortlist' ? 
        <button className="btn btn-success" onClick={(e) => changeStatus({_id,status, newstatus: 'Accepted', nopositions: 1, noapplications: 0, job_id})}>Accept</button>
        :
        <Fragment/>
    )
    }    
    </td>
    {status !== 'Accepted' ? <td>
    <button className="btn btn-danger" onClick={(e) => changeStatus({_id,status, newstatus: 'Rejected', nopositions: 0, noapplications: -1, job_id})}>Reject</button>
    </td>
    :
    <Fragment/>
}
    
    </tr>

</table>)
    return (
        <Fragment>
            {code}
        </Fragment>
    );
}

DisplayAccepted.propTypes = {
    applicationsjob: PropTypes.array.isRequired,
    changeStatus: PropTypes.func.isRequired,
}

const mapStateToPAcceptedtate => ({
    applicationsjob: state.applications.applications
});
export default connect(mapStateToProps, {changeStatus})(DisplayAcceAccepted