import React from "react";
import PropTypes from "prop-types";
import className from "classnames";
import defaultLogo from "../static/images/defaultLogo.png";

const Image = ({ tag: Tag, src, size, style, classes, ...restProps }) => {
  const _classes = className({ classes });
  return (
    <Tag
      src={src}
      style={{ width: size.w, height: size.h, ...style }}
      className={_classes}
      {...restProps}
    />
  );
};

Image.propTypes = {
  tag: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.object,
  style: PropTypes.object,
};

Image.defaultProps = {
  tag: "img",
  src: defaultLogo,
  size: { w: 100, h: 100 },
  style: {},
};

export default Image;
