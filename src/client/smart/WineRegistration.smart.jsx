import React from 'react';
import WineRegistration from '../dumb/WineRegistration';
import InputHelper from '../helpers/inputHelper';

class WineRegistrationSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        cork: '',
        capsule: '',
        glass: '',
        frontLabel: '',
        backLabel: '',
        bottle: ''
      }
    };
    this.inputHelper = new InputHelper(this);
    this.registrationFormHandler = this.registrationFormHandler.bind(this);
  }

  registrationFormHandler(evt) {
    evt.preventDefault();
  }

  render() {
    return (
      <div>
        <WineRegistration
          handleRegister={this.registrationFormHandler}
          handleInputChange={this.inputHelper.handleInputChange}
          formData={this.state.formData}
        />
      </div>
    );
  }
}

export default WineRegistrationSmartComponent;