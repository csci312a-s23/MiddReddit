/*
  PostShape.js

  This provides a PropTypes shape descriptor of post objects. This is pulled out
  since multiple components take posts as props.
*/

import PropTypes from "prop-types";

const PostShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.number,
  contents: PropTypes.string.isRequired,
  tags: PropTypes.array,
  edited: PropTypes.string,
});

export default PostShape;
