import React from 'react';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';

import Login from './Login';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div>
        <Login 
          handleLogin={this.props.handleLogin} 
          handleInputChange={this.props.handleInputChange}
          formData={this.props.formData}
        />
      </div>
    );
  }
}

export default HomeView;