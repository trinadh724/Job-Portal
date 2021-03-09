import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


const Alert = ({alerts}) => {
    if(alerts!=null && alerts.length>0){
        return (
            alerts.map(alert => (
            <div key={alert.id} style={{backgroundColor: 'red'}}>
                {alert.msg}
            </div>
        )
           )
   );    
    }
    return (
        alerts!=null && alerts.length>0 && alerts.map(alert => (
         <div key={alert.id}>
             {alert.msg}
         </div>
     )
        )
    );
}

alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
