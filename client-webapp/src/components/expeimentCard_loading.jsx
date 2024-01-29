import React from "react";

const ExperimentCardLoading = () => {


  return (
    <a className="relative block my-3 p-6 bg-secondary border border-gray-200 rounded-lg shadow hover:bg-gray-100  border-ternary hover:bg-ternary/80">

      <div className="grid grid-cols-2">
        <h5 className="animate-pulse mb-2 w-60 h-5 bg-ternary rounded-lg"></h5>
        <div className="justify-self-end animate-pulse inline-flex me-2 px-2.5 py-0.5 text-right w-10 h-5 bg-ternary rounded-lg">

          
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className=" bg-gray-100/5 p-4 rounded-lg shadow-md">
          <p className="animate-pulse bg-ternary mb-2 w-50 h-5 rounded-full"><font className=" text-sm"></font></p>
          <p className="animate-pulse bg-ternary mb-2 w-20 h-5 rounded-full"></p>
        </div>
        <div className=" text-right">
                                
        </div>
      </div>
      <br/>
      <p className="text-mainText/50">Attachments : </p>
      <table className="m-2 text-center table-auto border-separate border-spacing-x-3 border ">
        <thead>
          <tr className="text-xs text-mainText/20">
            <th>Bottom left up</th>
            <th>Bottom left down</th>
            <th>Bottom right down</th>
            <th>Bottom right down</th>
            <th>Top left up</th>
            <th>Top left down</th>
            <th>Top right up</th>
            <th>Top right down</th>
          </tr>
        </thead>
        <tbody >
          <tr>
            <td><div className=" animate-pulse bg-ternary w-15 h-5 rounded-lg my-2"></div></td>
            <td><div className="animate-pulse bg-ternary w-15 h-5 rounded-lg my-2"></div></td>
            <td><div className="animate-pulse bg-ternary w-15 h-5 rounded-lg my-2"></div></td>
            <td><div className="animate-pulse bg-ternary w-15 h-5 rounded-lg my-2"></div></td>
            <td><div className="animate-pulse bg-ternary w-15 h-5 rounded-lg my-2"></div></td>
            <td><div className="animate-pulse bg-ternary w-15 h-5 rounded-lg my-2"></div></td>
            <td><div className="animate-pulse bg-ternary w-15 h-5 rounded-lg my-2"></div></td>
            <td><div className="animate-pulse bg-ternary w-15 h-5 rounded-lg my-2"></div></td>
          </tr>
        </tbody>
      </table>
      {/* <ConfirmationDialog /> */}
    </a>
  );
};

export default ExperimentCardLoading;