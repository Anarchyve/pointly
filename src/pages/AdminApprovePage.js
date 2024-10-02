// src/pages/AdminApprovePage.js
import React, { useState } from "react";
import { getJoinRequest, updateJoinRequestStatus } from "../services/authService";

const AdminApprovePage = () => {
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState(null);
  const [message, setMessage] = useState("");

  const fetchJoinRequest = async () => {
    try {
      const requestData = await getJoinRequest(email);
      setRequest(requestData);
    } catch (error) {
      setMessage("가입 요청을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleApprove = async () => {
    try {
      await updateJoinRequestStatus(email, "approved");
      setMessage("가입 요청이 승인되었습니다.");
      setRequest(null);
    } catch (error) {
      setMessage("승인 처리 중 오류가 발생했습니다.");
    }
  };

  const handleReject = async () => {
    try {
      await updateJoinRequestStatus(email, "rejected");
      setMessage("가입 요청이 거절되었습니다.");
      setRequest(null);
    } catch (error) {
      setMessage("거절 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2>가입 요청 승인</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="가입 요청자의 이메일"
      />
      <button onClick={fetchJoinRequest}>가입 요청 조회</button>

      {request ? (
        <div>
          <p>이름: {request.studentName}</p>
          <p>이메일: {request.studentEmail}</p>
          <p>상태: {request.status}</p>
          <button onClick={handleApprove}>승인</button>
          <button onClick={handleReject}>거절</button>
        </div>
      ) : (
        message && <p>{message}</p>
      )}
    </div>
  );
};

export default AdminApprovePage;
