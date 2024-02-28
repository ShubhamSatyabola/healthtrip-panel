import { useState } from "react";
import {
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import '../../App.css'
import { blockUserAsync, deleteApiKeyAsync, fetchAllUsersAsync, getApiKeyAsync, postApiKeyAsync, selectUsers, selectkeys, updateMessageFrequencyAsync } from "./AdminSlice";


export function Admin () {
  const dispatch = useDispatch()
  const [apiKey, setApiKey] = useState("")
  const [selectedHour, setSelectedHour] = useState(24);
  const users = useSelector(selectUsers)
  const apiKeys = useSelector(selectkeys)


  const addApiKey = () => {
    dispatch(postApiKeyAsync({apiKey}))
  };

  const deleteApiKey = (id) => {
    console.log(id);
    dispatch(deleteApiKeyAsync(id))
  };

  const blockUser = async (userId) => {

    dispatch(blockUserAsync(userId));
  };


  const handleHourChange = (event) => {
     setSelectedHour(parseInt(event.target.value, 10));
  };

  const handleUpdate = async () => {
    dispatch(updateMessageFrequencyAsync(selectedHour))
  };

  useEffect(() => {
    dispatch(fetchAllUsersAsync())
    dispatch(getApiKeyAsync())
  }, []);

  return (
    <div className="app-container">
      {" "}
      {/* Added a class for the main container */}
      <h1 className="app-title">HealthTrip Admin Panel</h1>
      {/* Form for managing API keys */}
      <div className="manage-keys card">
        <h2>Manage API Keys</h2>
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
        <button type="button" onClick={addApiKey}>
          Add API Key
        </button>
      </div>
      {/* Table to display existing API keys */}
      <div className="existing-keys card">
        <h3>Existing API Keys</h3>
        <table>
          <thead>
            <tr>
              <th>API Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key, index) => (
              <tr key={index}>
                <td>{key.key}</td>
                <td>
                  <button type="button" onClick={() => deleteApiKey(key._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table to display existing users */}
      <div className="card">
        <div className="existing-users">
          <h3>Existing Users</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.city}</td>
                  <td>{user.country}</td>
                  {/* <td>{user.allowed}</td> */}
                  {user.allowed == "true" ? <td>
                    <button type="button" onClick={() => blockUser(user._id)}>
                      Block
                    </button>
                  </td> : <td>User blocked</td>}
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        {/* Hour Selector */}
        <div className="hour-selector">
          <p>you can select time for sending weather update daily . by default it is 0 means 12 midnight</p>
          <label htmlFor="hourSelector">Select Hour:</label>
          <select
            id="hourSelector"
            value={selectedHour}
            onChange={handleHourChange}
          >
            {Array.from({ length: 23 }, (_, i) => i + 1).map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>

        {/* Button to trigger the update */}
        <button onClick={handleUpdate}>Update Message Frequency</button>
      </div>
    </div>
  );
};

