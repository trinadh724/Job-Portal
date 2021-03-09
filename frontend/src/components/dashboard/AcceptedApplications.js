import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {} from '../../actions/jobs';
import moment from "moment";
import {Link} from 'react-router-dom';
// import deleteJob from '../../actions/jobs';
import {changeStatus, getApplications} from '../../actions/applications';


const AcceptedApplications = ({loading , applicationjobs, changeStatus, getApplications}) => {
    useEffect(()=>{
        getApplications();
    },[]);
    // console.log(applicationjobs);
    if(loading){
        return <Fragment><p>loading...</p></Fragment>
    }
    if(applicationjobs==null){
        return <h2>Employees Of recruiter</h2>
    }
    applicationjobs =  applicationjobs.filter((val) => val.status === 'Accepted');
    const code = applicationjobs.map(({
        applicant: {name,skills},
        dateOfJoining,
        typeOfJob,
        title,
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



{dateOfJoining ? 
<Fragment>
    <tr>
        <th>Date Of Joining</th>
        <td>{dateOfJoining}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}


{typeOfJob ? 
<Fragment>
    <tr>
        <th>Type Of Job</th>
        <td>{typeOfJob}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}

{title ? 
<Fragment>
    <tr>
        <th>Title Of Job</th>
        <td>{title}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}


<tr>
    <td>
        <button type="submit" className='btn btn-warning'>Rate</button>
    </td>
    </tr>

</table>)
    return (
        <Fragment>
            <h2>Employess of recruiter</h2>
            {code}
        </Fragment>
    );
}

AcceptedApplications.propTypes = {
    applicationjobs: PropTypes.array.isRequired,
    changeStatus: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    getApplications: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    applicationjobs: state.applications.applications,
    loading: state.applications.loading
});
export default connect(mapStateToProps, {changeStatus, getApplications})(AcceptedApplications
);
