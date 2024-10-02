// src/pages/StudentJoinRequestPage.js
import React, { useState } from "react";
import { submitJoinRequest } from "../services/authService";

const StudentJoinRequestPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const handleJoinRequest = async () => {
    try {
      await submitJoinRequest(email, name);
      setMessage("가입 요청이 성공적으로 제출되었습니다. 관리자의 승인을 기다리세요.");
    } catch (error) {
      setMessage("가입 요청 제출에 실패했습니다. 다시 시도하세요.");
    }
  };

  return (
    <div>
      <h2>학생 가입 요청</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <button onClick={handleJoinRequest}>가입 요청 제출</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StudentJoinRequestPage;
