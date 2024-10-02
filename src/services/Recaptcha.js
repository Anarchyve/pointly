import React, { useState, useEffect } from "react";
import { googleSignIn, emailSignIn, phoneSignIn } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { RecaptchaVerifier } from "firebase/auth";

const AdminLoginPage = () => {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Recaptcha 설정
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        },
        auth
      );
    }
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await emailSignIn(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhoneLogin = async () => {
    try {
      await phoneSignIn(phoneNumber, window.recaptchaVerifier);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>관리자 로그인</h2>

      {currentUser ? (
        <p>현재 로그인된 사용자: {currentUser.email}</p>
      ) : (
        <>
          <button onClick={handleGoogleLogin}>구글로 로그인</button>

          <div>
            <h3>이메일 로그인</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
            <button onClick={handleEmailLogin}>이메일로 로그인</button>
          </div>

          <div>
            <h3>핸드폰 로그인</h3>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="전화번호"
            />
            <div id="recaptcha-container"></div>
            <button onClick={handlePhoneLogin}>핸드폰으로 로그인</button>
          </div>

          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default AdminLoginPage;
