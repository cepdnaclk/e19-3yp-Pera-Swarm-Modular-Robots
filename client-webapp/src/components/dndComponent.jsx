import React from 'react';
import { useDrag } from 'react-dnd';

const Component = ({ id, name, image }) => {
  const [, drag] = useDrag({
    type: 'COMPONENT',
    item: { id, name },
  });

  return (
    <div ref={drag} className="bg-primary m-2 p-2 rounded-md w-40 text-center relative">
      <img src={image} alt={name} className=' h-32 inline hover:brightness-150'/>
      <p className="text-sm font-medium text-center mt-2">{name}</p>
    </div>
  );
};

export default Component;
