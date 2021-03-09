import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {deleteEducation} from '../../actions/profile';

const TemplateForEducation = ({educations, deleteEducation}) => {
    const code = educations.map(education => 
        <Fragment> 
        <tr key={education._id} >
        <td>{education.institute}</td>
        <td>{education.from}</td>
        <td>{education.to}</td>
        <td>
            <button className='btn btn-danger' onClick={() => {deleteEducation(education._id) }}>Delete</button>
        </td>
        </tr>
        </Fragment>
    );
    return (
        <Fragment>
            <h2> Education Credentials</h2>
            <table className='table'>
                {/* <Table striped bordered hover>
            <thead> */}
            <tr>
                <th>Institute Name</th>
        <th>StartingDate</th>
                <th>EndingDate</th>
                                <th/>
            </tr>
            {/* </thead> */}
            {/* <tbody> */}
            {code}
            {/* </tbody> */}
            {/* </Table> */}
            </table>
            
        </Fragment>
    )
}

TemplateForEducation.propTypes = {
    educations: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(TemplateForEducation);
