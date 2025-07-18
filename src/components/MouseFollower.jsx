import React from 'react';
import { useMouseFollower } from '../hooks/useScrollAnimation';

const MouseFollower = () => {
  const { position, isPointer } = useMouseFollower();

  return (
    <div
      className={`mouse-follower transition-all duration-200 ${
        isPointer ? 'scale-150 opacity-60' : 'scale-100 opacity-30'
      }`}
      style={{
        left: position.x - 10,
        top: position.y - 10,
        transform: `translate3d(0, 0, 0) scale(${isPointer ? 1.5 : 1})`,
      }}
    />
  );
};

export default MouseFollower;