import { getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { RoundTimerType } from "../App";
import { timersCollection, usersCollection } from "./firebase";

export const getTimers = async () => {
  const timers: RoundTimerType[] = [];
  await getDocs(timersCollection)
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        timers.push(doc.data() as RoundTimerType);
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });

  return timers;
};

export const addTimer = async (timer: RoundTimerType) => {
  await addDoc(timersCollection, timer);
};
export const deleteTimer = async (id: string) => {
  const docRef = doc(timersCollection, id);
  await deleteDoc(docRef);
};
export const addUser = async (user: any) => {
  await addDoc(usersCollection, user);
};
