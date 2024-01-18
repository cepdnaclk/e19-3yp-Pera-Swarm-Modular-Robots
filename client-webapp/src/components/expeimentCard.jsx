import React from "react";
import { XMarkIcon } from '@heroicons/react/20/solid';

const ExperimentCard = ({experiment,userRole,handleDelete,handleAccept,handleDecline,handleStartExperiment,handleLog,handleVideo}) => {

  const {name, id, status, attachments, schedule} = experiment;

  const getStatusBadge = (status) => {
    let badgeClass = "";
    let badgeText = "";

    switch (status) {
      case "pending":
        badgeClass = "bg-yellow-900 text-yellow-300";
        badgeText = "Pending";
        break;
      case "ready":
        badgeClass = "bg-purple-900 text-purple-300";
        badgeText = "Ready";
        break;
      case "accepted":
        badgeClass = "bg-green-900 text-green-300";
        badgeText = "Accepted";
        break;
      case "declined":
        badgeClass = "bg-red-900 text-red-300";
        badgeText = "Declined";
        break;
      case "completed":
        badgeClass = "bg-gray-700 text-gray-300";
        badgeText = "Completed";
        break;
      default:
        break;
    }

    return (
      <span className={`inline-flex items-center text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${badgeClass}`}>
        <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
        {badgeText}
      </span>
    );
  };


  const getSideButtons = (status, userRole) => {
    if (userRole === 'admin') {
      switch (status) {
        case "pending":
          return (
            <>
              <button type="button" onClick={() => handleAccept(id)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Accept
              </button>
              <button type="button" onClick={() => handleDecline(id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Decline
              </button>
            </>
          );
        default:
          break;
      }
    }

    if (userRole === 'experimenter') {
      switch (status) {
        case "pending":
          return (
            <>

            </>
          );

        case "ready":
          return (
            <>
              <button type="button" onClick={() => handleStartExperiment(id)} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Experiment</button>
            </>
          );

        case "accepted":
          return (
            <>
              
            </>
          );

        case "declined":
          return (
            <>
              
            </>
          );

        case "completed":
          return (
            <>
              <button type="button" onClick={() => handleLog(id)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Log</button>
              <button type="button" onClick={() => handleVideo(id)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Video File</button>
            </>
          );


        default:
          break;
      }
    }
  };



  return (
    <a className="relative font-normal font-sans text-mainText block my-3 p-6 bg-secondary border border-gray-200 rounded-lg shadow hover:bg-gray-100  border-ternary hover:bg-mainText/20">
          
          {(status !== 'ready' && userRole !== 'admin') && (
            <div className="absolute z-10 top-0 right-0 m-2">
              <button type="button" onClick={()=> handleDelete(id)} className="focus:outline-none text-red-900 font-medium rounded-full text-sm w-5 h-auto bg-red-500/5 hover:bg-red-600 ">
                <XMarkIcon className="w-5 text-mainText/50 " />
              </button>
            </div>
          )}

      <div className="grid grid-cols-2">
        <h5 className="mb-2 text-2xl font-bold tracking-tight ">{name}</h5>
        <div className=" text-right">
          {getStatusBadge(status)}
          
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className=" bg-gray-100/10 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold mb-2">Experiment ID: {id}</p>
          <p className="text-sm ">Schedule: {schedule}</p>
        </div>
        <div className=" text-right">
          {getSideButtons(status, userRole)}                        
        </div>
      </div>
      <br/>
      <p className=" ">Attachments : </p>
      <table className="m-2 text-center table-auto border-separate border-spacing-x-3 border ">
        <thead>
          <tr className="text-xs text-mainText/60">
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
        <tbody>
          <tr>
            {attachments.map((attachment, index) => ( 
              <td key={index}>{attachment}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </a>
  );
};

export default ExperimentCard;
