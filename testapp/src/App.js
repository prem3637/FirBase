import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import writeUserData, { deleteUser, getData, getSingleUser, updateUser } from "./firseBase";
function App() {
  const [data, setData] = useState([]);
  // const [deleteData, setDeleteData] = useState("");
  const [name, setName] = useState("");
  const [updatename, setUpdateName] = useState("");
  const [key, setKey] = useState("");
  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:5000/get-data",{
  //       headers:{
  //         "Content-Type":"applicaton/json"
  //       }
  //     })
  //     .then((res) => {
    
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [deleteData]);
    getData()
      .then((data) => {
        const dataArray = Object.keys(data).map((id) => ({
          id,
          name: data[id].name,
        }));
        setData(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });

  const handleDelete = (id) => {
    // if (window.confirm("Are your sur want to delete")) {
    //   axios
    //     .delete(`http://127.0.0.1:5000/deleteData/${id}`, {
    //       headers: {
    //         "Content-Type": "applicaton/json",
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       setDeleteData(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    if (window.confirm("Are your sur want to delete")){
      deleteUser(id).then((res)=>{
        console.log("data deleted")
      })
    }
  };

  const addUser =()=>{
    if(name){
      const data = {
        name:name
      }
      writeUserData(data).then((res)=>{
        console.log(res)
        setName("")
      })
    }else{
      alert("please fill the empty field")
    }
  }

  const setUpdateUser=async(key)=>{
    getSingleUser(key).then((res)=>{
      setKey(key)
      setUpdateName(res.name)
    })
  }

  const update = async()=>{
  if(updatename){
    const data  = {
      name:updatename
    }
    updateUser(key,data).then((res)=>{
      console.log("user update successfully")
      setUpdateName("")
    })
  }else{
    alert("please fill the empty field")
  }
  }
  return (
    <div className="App">
      <h1>Hello</h1>

      <div>
        <center>
          <table border={1} cellPadding={10} cellSpacing={0} width={"80%"}>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{++index}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <button className="primary" onClick={()=>{setUpdateUser(item.id)}}>Edit</button>
                      <button
                        className="danger"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </center>
      </div>

      <br/>
      <br/>
        <h1>create user</h1>      
      name: <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>{" "}
      <button onClick={addUser}>Submit</button>
      <br/>
        <h1>update user</h1>      
      name: <input type="text" value={updatename} onChange={(e)=>setUpdateName(e.target.value)}/>{" "}
      <button onClick={update}>Update</button>
    </div>
  );
}

export default App;
