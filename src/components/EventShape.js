import PropTypes from "prop-types";

const EventShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string,
  posted: PropTypes.string,
});

export default EventShape;
