import React from 'react';

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