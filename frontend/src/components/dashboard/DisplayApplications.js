import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {} from '../../actions/jobs';
import moment from "moment";
import {Link} from 'react-router-dom';
// import deleteJob from '../../actions/jobs';


const DisplayApplications = ({applicationjobs}) => {
    const code = applicationjobs.map(({
            title,
            dateOfJoining,
            salary,
            recruiter: {name},
            status,
            typeOfJob,
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
        <th>Name Of Recruiter</th>
        <td>{name}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}


{dateOfJoining ? 
<Fragment>
    <tr>
        <th>Date Of Joining</th>
        <td>{dateOfJoining}</td>
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
<input type="submit" className="btn btn-warning" value="Rate Job" />
    </tr>

</table>)
    return (
        <Fragment>
            <h2>Jobs</h2>
            {code}
        </Fragment>
    );
}

DisplayApplications.propTypes = {
    applicationsjob: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    applicationsjob: state.applications.applications
});
export default connect(mapStateToProps, null)(DisplayApplications
);
