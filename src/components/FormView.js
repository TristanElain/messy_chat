var React = require("react");
var PropTypes = require('prop-types');

const FormView = view => {return view};

FormView.propTypes = {view: PropTypes.func.isRequired}

export default FormView;