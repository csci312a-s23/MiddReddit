import PropTypes from "prop-types";

const EventShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string, //will be required eventually
  posted: PropTypes.string,
});

export default EventShape;
