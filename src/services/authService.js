// src/services/authService.js
import { auth, firestore } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

// 구글 로그인
export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// 이메일 로그인
export const emailSignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// 핸드폰 로그인
export const phoneSignIn = (phoneNumber, appVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

// 학생 가입 요청을 Firestore에 저장
export const submitJoinRequest = async (studentEmail, studentName) => {
  try {
    const requestRef = doc(firestore, 'joinRequests', studentEmail);
    await setDoc(requestRef, {
      studentName,
      studentEmail,
      status: 'pending'  // 'pending', 'approved', 'rejected' 상태로 관리
    });
  } catch (error) {
    console.error("Error submitting join request:", error);
    throw error;
  }
};

// 가입 요청 상태를 변경 (승인/거절)
export const updateJoinRequestStatus = async (studentEmail, status) => {
  try {
    const requestRef = doc(firestore, 'joinRequests', studentEmail);
    await updateDoc(requestRef, { status });
  } catch (error) {
    console.error("Error updating join request status:", error);
    throw error;
  }
};

// 가입 요청 상태를 Firestore에서 확인
export const getJoinRequest = async (studentEmail) => {
  try {
    const requestRef = doc(firestore, 'joinRequests', studentEmail);
    const requestSnapshot = await getDoc(requestRef);
    if (requestSnapshot.exists()) {
      return requestSnapshot.data();
    } else {
      console.log("No such request!");
    }
  } catch (error) {
    console.error("Error getting join request:", error);
    throw error;
  }
};
