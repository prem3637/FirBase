const express = require("express");
const cors = require("cors");
const { ref, onValue, push, get, update,remove } = require("firebase/database");
const database = require("./config/firebase");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/create", async (req, res) => {
  const data = req.body;
  const userRef = ref(database, "users/");
  const newChildRef = push(userRef, data);
  onValue(
    newChildRef,
    (snapshot) => {
      let pushedData = snapshot.val();
      let key = snapshot.key; // Retrieve the unique ID
      res
        .status(201)
        .json({
          message: "Data pushed successfully",
          data: { [key]: pushedData },
        });
    },
    {
      onlyOnce: true,
    }
  );
});

app.get("/get-data", (req, res) => {
  const dataRef = ref(database, "users/");

  onValue(
    dataRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        res.status(200).json({
          data: data,
        });
      } else {
        res.status(200).json({
          data: {},
        });
      }
    },
    {
      onlyOnce: true, // Retrieve data only once and stop listening
    }
  );
});
app.get("/get-single-data/:id", (req, res) => {
    const id = req.params.id
  const dataRef = ref(database, "users/"+id);

  onValue(
    dataRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const key = snapshot.key
        res.status(200).json({
          data: { [key]: data },
        });
      } else {
        res.status(200).json({
          data: {},
        });
      }
    },
    {
      onlyOnce: true, // Retrieve data only once and stop listening
    }
  );
});

app.put("/updateData/:id", async (req, res) => {
  const dataRef = ref(database, "users/" + req.params.id);
  const updatedData = req.body;

  try {
    // Check if the data exists
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      await update(dataRef, updatedData);
      res.status(200).json({ message: "Data updated successfully" });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Error updating data" });
  }
});

app.delete("/deleteData/:id", async (req, res) => {
    try {
      const recordKey = req.params.id;
      const dataRef = ref(database, "users/" + recordKey);
      const snapshot = await get(dataRef);
  
      if (snapshot.exists()) {
        await remove(dataRef);
        return res.status(200).json({ message: "Data deleted successfully" });
      } else {
        return res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      return res.status(500).json({ message: "Error deleting data", error: error });
    }
  });
  


app.listen(5000, () => {
  console.log("started at 5000");
});
