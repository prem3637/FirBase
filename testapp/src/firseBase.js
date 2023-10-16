import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, child, get,remove, update } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCMVt_ielV6dUwTekLkGsoWebgLMuNlKdA",
  authDomain: "gothic-context-401609.firebaseapp.com",
  projectId: "gothic-context-401609",
  storageBucket: "gothic-context-401609.appspot.com",
  messagingSenderId: "785461453802",
  appId: "1:785461453802:web:90dfcfacb76296f2bc4893",
  measurementId: "G-CYYLV901F9",
  databaseURL: "https://gothic-context-401609-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const db = ref(getDatabase(app));
export default async function writeUserData(data) {
  try {
    const userRef = child(db,"users/")
    const newChildRef = push(userRef, data)
    const spanshot =  await get(newChildRef, `users`)
    return spanshot.val()
  } catch (error) {
    console.log("data created Error",error)
  }
}

export const getSingleUser = async (key)=>{
try {
  const snapshot = await get(child(db, `users/${key}`))
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
  }
} catch (error) {
  console.log("Error",error)
}
}

export const updateUser = async (key,data)=>{
 try {
  const dataRef = child(db, `users/${key}`)
  const snapshot = await get(dataRef);
  if (snapshot.exists()) {
    await update(dataRef,data);
    // console.log(deleteuser,"Data deleted successfully");
  }
 } catch (error) {
  console.log("updateing user error",error);
 }
}

export const getData = async () => {
  try {
    const snapshot = await get(child(db, `users`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (key) => {
  try {
    const dataRef = child(db, `users/${key}`);
    const snapshot = await get(dataRef);
  
      if (snapshot.exists()) {
        await remove(dataRef);
        // console.log(deleteuser,"Data deleted successfully");
      }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
