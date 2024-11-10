import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const SettingsNavigation: FC = () => {
  return (
    <div className='flex justify-around mb-6'>
      <NavLink
        to='/settings/change-email'
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition-colors ${
            isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`
        }
      >
        Zmień Email
      </NavLink>
      <NavLink
        to='/settings/change-password'
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition-colors ${
            isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`
        }
      >
        Zmień Hasło
      </NavLink>
    </div>
  );
};

export default SettingsNavigation;
