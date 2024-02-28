// A mock function to mimic making an async request for data
import axios from "axios";
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export async function fetchAllUsers() {
  try{
    const response =  await axios.get("http://localhost:5000/admin/get-users");
    return response
  }
  catch(error){
    console.log(error)
  }
}

export async function getkeys() {
  try {
    const response = axios.get("http://localhost:5000/admin/get-keys");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function postKey( key ) {
  try {
    const response = await axios.post("http://localhost:5000/admin/post-key", key);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteKey(id) {
  try {
    const response = await axios.delete(
      "http://localhost:5000/admin/delete-key/"+id
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function blockUser(userId) {
  try {
    const response = await axios.patch(
      "http://localhost:5000/admin/block-user/" + userId
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function messageFrequency(time) {
  try {
    const response = await axios.post(
      "http://localhost:5000/admin/message-frequency" , {frequency:time}
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}


