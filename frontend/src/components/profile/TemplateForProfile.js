import React, {Fragment} from 'react'
import PropTypes from 'prop-types'


const TemplateForProfile = ({profile}) => {
    const {
        name,
        email,
        contactnumber,
        bio,
        skills,

    } = profile;
    return (
        <Fragment>
            <h2> Profile</h2>
            <table className='table'>
                    {name ? 
            <Fragment>
                <tr>
                    <th>Name</th>
                    <td>{name}</td>
                </tr>
            </Fragment>
            : 
            <Fragment> </Fragment>}
            {email ? 
            <Fragment>
                <tr>
                    <th>email</th>
                    <td>{email}</td>
                </tr>
            </Fragment>
            : 
            <Fragment> </Fragment>}
            {contactnumber ? 
            <Fragment>
                <tr>
                    <th>contactnumber</th>
                    <td>{contactnumber}</td>
                </tr>
            </Fragment>
            : 
            <Fragment> </Fragment>}
            {bio ? 
            <Fragment>
                <tr>
                    <th>bio</th>
                    <td>{bio}</td>
                </tr>
            </Fragment>
            : 
            <Fragment> </Fragment>}
            {skills ? 
            <Fragment>
                <tr>
                    <th>Skills</th>
                    <td>{skills}</td>
                </tr>
            </Fragment>
            : 
            <Fragment> </Fragment>}
            </table>
            
        </Fragment>
    );
}

TemplateForProfile.propTypes = {
    profile: PropTypes.array.isRequired
}

export default TemplateForProfile;
