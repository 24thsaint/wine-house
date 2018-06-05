class InputHelper {
  constructor(instance) {
    this.instance = instance;
    this.formStateData = this.instance.state.formData;
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.formStateData[name] = value;
    this.instance.setState({ formData: this.formStateData });
  }
        
}

export default InputHelper;