import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import './LoginForm.css';

const Login = ({ onLoginSuccess }) => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { code, password });
      if (response.data.success) {
        onLoginSuccess(response.data.hospital);
         // Check if the hospital code is one of the predefined codes
         const predefinedCodes = ['23901', '23902', '23903', '23904', '23905'];
         if (predefinedCodes.includes(code)) {
           navigate('/dash'); // Redirect to the main dashboard
         } else {
           navigate(`/hospital-dash`); // Redirect to the specific hospital dashboard
         }
      } else {
        setError('Invalid hospital code or password');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Too many login attempts from this IP, please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="grid-container">
        <div className="left-grid">
          <div className="left-section">
            <img src="/images/img-12.png" alt="Logo" />
            <p>Central Login Server</p>
            <span>© 2024</span>
            <p>Damu Kwa Wote</p>
          </div>
        </div>
        <div className="right-grid">
          <div className="right-section">
            <h2>Login</h2>
            <form className='login-form' onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="loginCode">Unique Code</label>
                <input
                  type="text"
                  id="loginCode"
                  name='loginCode'
                  className='login-input'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder='Type Here'
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  className='login-input'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  required
                />
              </div>
              {error && <p>{error}</p>}
              <button type='submit' className='login-button'>
                Login <FontAwesomeIcon icon={faCircleCheck} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;














































// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
// import './LoginForm.css';

// const LoginForm = () => {
//     const [loginCode, setloginCode] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle login logic here
//         console.log('Login Code:', loginCode);
//         console.log('Password:', password);
//     };

//     return (
//         <div className="login-container">
//             <div className="grid-container">
//                 <div className="left-grid">
//                     <div className="left-section">
//                         <img src="/images/img-12.png" alt="Logo" />
//                         <p>Central Login Server</p>
//                         <span>© 2024</span>
//                         <p>Damu Kwa Wote</p>
//                     </div>
//                 </div>
//                 <div className="right-grid">
//                     <div className="right-section">
//                         <h2>Login</h2>
//                         <form className='login-form' onSubmit={handleSubmit}>
//                             <div className="form-group">
//                                 <label htmlFor="loginCode">Unique Code</label>
//                                 <input type="text" id="loginCode" name='loginCode' className='login-input'
//                                     value={loginCode}
//                                     onChange={(e) => setloginCode(e.target.value)} placeholder='Type Here'
//                                     required />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="password">Password</label>
//                                 <input type="password" id="password" name='password' className='login-input'
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)} placeholder='Password'
//                                     required />
//                             </div>
//                             <button type='submit' className='login-button'>
//                                 Login <FontAwesomeIcon icon={faCircleCheck} />
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LoginForm;
