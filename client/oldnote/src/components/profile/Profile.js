import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/user/userSlice';
import './Profile.css';
import default_profile from '../../assets/default_profile.png';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { username, name, email, institute } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="profile">
      <div className="pf-header">
        <div className="pf-left">
          <img src={default_profile} alt="Profile" />
        </div>
        <div className="pf-right">
          <div className="username">Username: {username}</div>
          <div className="text">Name: {name}</div>
          <div className="text">Email: {email}</div>
          <div className="text">Institute: {institute}</div>
        </div>
      </div>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
