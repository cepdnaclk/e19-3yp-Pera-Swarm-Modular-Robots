import React from 'react';
import { useDrop } from 'react-dnd';


const Container = ({ id, name, component, onDrop, onRemove }) => {
    const [, drop] = useDrop({
      accept: 'COMPONENT',
      drop: (item) => onDrop(id, item.id),
    });
  
    return (
      <div ref={drop} className="bg-primary m-2 p-2 rounded-md h-60">
        
          <div className="bg-ternary/30 p-2 h-48 rounded-md border-2 border-ternary/20">
        {component && (
            <>
           <div className="group text-center relative">
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-white bg-red-600/50 hover:bg-red-700 " onClick={() => onRemove(id)}>
                    Remove
                </button>
                <div className="">
                    <img src={component.image} alt={component.name} className="p-1 h-40 inline" />
                </div>
                <p className="text-sm font-medium mb-3 ">{component.name}</p>
            </div>
            </>
            )}
            </div>
        <p className="text-center text-sm font-medium mt-2">{name}</p>
      </div>
    );
  };
  
  export default Container;