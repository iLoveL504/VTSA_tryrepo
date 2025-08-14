import React, { useState } from 'react';
import { Axios } from '../../api/axios.js';

const CreateProject = () => {
  // State for each form field
  const [liftName, setLiftName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [drive, setDrive] = useState('');
  const [doorOperator, setDoorOperator] = useState('');
  const [speed, setSpeed] = useState('');
  const [control, setControl] = useState('');
  const [stops, setStops] = useState('');
  const [servingFloor, setServingFloor] = useState('');
  const [travel, setTravel] = useState('');
  const [powerSupply, setPowerSupply] = useState('');
  const [shaft, setShaft] = useState('');
  const [shaftSize, setShaftSize] = useState('');
  const [carSize, setCarSize] = useState('');
  const [doorSize, setDoorSize] = useState('');
  const [overheadHeight, setOverheadHeight] = useState('');
  const [pitDepth, setPitDepth] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    try {
      await Axios.post('/projects', {
        liftName,
        description,
        capacity: Number(capacity),
        drive,
        doorOperator,
        speed: Number(speed),
        control,
        stops: Number(stops),
        servingFloor,
        travel: Number(travel),
        powerSupply,
        shaft,
        shaftSize,
        carSize,
        doorSize,
        overheadHeight: Number(overheadHeight),
        pitDepth: Number(pitDepth)
      });
      
      // Reset form after successful submission
      setLiftName('');
      setDescription('');
      setCapacity('');
      // Reset all other fields...
      
      alert('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  return (
    <div className='Content CreateProject'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="liftName">Lift Name</label>
          <input 
            type="text" 
            id="liftName" 
            value={liftName}
            onChange={(e) => setLiftName(e.target.value)}
          />         
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            id="description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />  
        </div>
        <div>
          <label htmlFor="capacity">Capacity</label>
          <input 
            type="number" 
            id="capacity" 
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="drive">Drive</label>
          <input 
            type="text" 
            id="drive" 
            value={drive}
            onChange={(e) => setDrive(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="doorOperator">Door Operator</label>
          <input 
            type="text" 
            id="doorOperator" 
            value={doorOperator}
            onChange={(e) => setDoorOperator(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="speed">Speed</label>
          <input 
            type="number" 
            id="speed" 
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="control">Control</label>
          <input 
            type="text" 
            id="control" 
            value={control}
            onChange={(e) => setControl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stops">Stops</label>
          <input 
            type="number" 
            id="stops" 
            value={stops}
            onChange={(e) => setStops(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="servingFloor">Serving Floor</label>
          <input 
            type="text" 
            id="servingFloor" 
            value={servingFloor}
            onChange={(e) => setServingFloor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="travel">Travel</label>
          <input 
            type="number" 
            id="travel" 
            value={travel}
            onChange={(e) => setTravel(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="powerSupply">Power Supply</label>
          <input 
            type="text" 
            id="powerSupply" 
            value={powerSupply}
            onChange={(e) => setPowerSupply(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="shaft">Shaft</label>
          <input 
            type="text" 
            id="shaft" 
            value={shaft}
            onChange={(e) => setShaft(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="shaftSize">Shaft Size</label>
          <input 
            type="text" 
            id="shaftSize" 
            value={shaftSize}
            onChange={(e) => setShaftSize(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="carSize">Car Size</label>
          <input 
            type="text" 
            id="carSize" 
            value={carSize}
            onChange={(e) => setCarSize(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="doorSize">Door Size</label>
          <input 
            type="text" 
            id="doorSize" 
            value={doorSize}
            onChange={(e) => setDoorSize(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="overheadHeight">Overhead Height</label>
          <input 
            type="number" 
            id="overheadHeight" 
            value={overheadHeight}
            onChange={(e) => setOverheadHeight(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pitDepth">Pit Depth</label>
          <input 
            type="number" 
            id="pitDepth" 
            value={pitDepth}
            onChange={(e) => setPitDepth(e.target.value)}
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;