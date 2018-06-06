import React from 'react';
import Registration from '../dumb/Registration';
import InputHelper from '../helpers/inputHelper';

class RegistrationSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        fullClientName: '',
        username: '',
        password: ''
      }
    };
    this.inputHelper = new InputHelper(this);
    this.registrationFormHandler = this.registrationFormHandler.bind(this);
  }

  registrationFormHandler(evt) {
    evt.preventDefault();
    console.log(this.state.formData);
  }

  render() {
    return (
      <div>
        <Registration
          handleRegister={this.registrationFormHandler}
          handleInputChange={this.inputHelper.handleInputChange}
          formData={this.state.formData}
        />
      </div>
    );
  }
}

export default RegistrationSmartComponent;