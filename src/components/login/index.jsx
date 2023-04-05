import Button from 'react-bootstrap/Button';

import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";


const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();
  const handleKeyDown = e => {
    

    if (e.key === 'Enter' && isRegister === true) {
      // 👇️ your logic here
      console.log('Enter key pressed ✅');
      console.log('Registered! ✅'); 
      handleRegister();
    }
    else if (e.key === 'Enter' && isRegister === false) {
      console.log('Enter key pressed ✅');
      console.log('Logged in!! ✅'); 
      handleLogin();
    }
    
   
  };

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    
    triggerSignUp({ username, password });
    triggerLogin({ username, password });
    
  };

  useEffect(() => {
    
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data]); // eslint-disable-line
  
 

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">AI.FORBID.CC</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>

        <div>
          
          <input
            className="login-input"
            type="text"
            
            
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <div className="login-actions">
        
          {isRegister ? (
            
            <button type="button" class="btn btn-dark" onClick={handleRegister}>
              Register
            </button>
            
          ) : (
            <button type="button" class = "btn btn-dark" onClick={handleLogin}>
              Login
            </button>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
