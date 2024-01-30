import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewExperiment() {
  const [experimentName, setExperimentName] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleOk = () => {
    // You might want to do something with experimentName and date here
    navigate('/robotConfig');
  };

  const handleCancel = () => {
    // Reset the form
    setExperimentName('');
    setDate('');
  };

  return (
    <div>
      <h2>New Experiment</h2>
      <form>
        <label>
          Experiment Name:
          <input type="text" value={experimentName} onChange={e => setExperimentName(e.target.value)} />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <button type="button" onClick={handleOk}>OK</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default NewExperiment;