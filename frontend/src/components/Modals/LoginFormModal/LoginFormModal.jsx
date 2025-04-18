import { useEffect, useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import '../Modal.css';



function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disabledLogin, disableLogin] = useState(true);

  useEffect(() => {
    return() => {
      setCredential('');
      setPassword('');
      setErrors({});
    };
  }, []);

  useEffect(() => {
    disableLogin(credential.length < 4 || password.length < 6);
  }, [credential, password]);

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({ credential: 'demo', password: 'demoPassword' }))
    .then(closeModal)
    .catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) {
      setErrors(data.errors);
    }
  });
}

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <div className="login-modal-wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" disabled={disabledLogin}>Log In</button>
      </form>
      <a href='#' onClick={(e) => {
        e.preventDefault();
        handleDemoLogin(e);
      }} className='demo-login'>
        Log in as Demo User</a>

      </div>
    </>
  );
}

export default LoginFormModal;
