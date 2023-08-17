import React, {forwardRef} from "react";

import PropTypes from "prop-types";

const VideoPlayer = forwardRef(function VideoPlayer({src, posterSrc, className, isMuted, isControls}, ref) {
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={posterSrc}
      muted={isMuted}
      controls={isControls}
    ></video>
  );
});

VideoPlayer.propTypes = {
  src: PropTypes.string,
  posterSrc: PropTypes.string,
  className: PropTypes.string,
  isMuted: PropTypes.bool,
  isControls: PropTypes.bool
};

export default VideoPlayer;
