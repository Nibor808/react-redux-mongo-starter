import { reducer as FormReducer } from 'redux-form';
import { authReducer } from './actions/auth_actions';
import { adminReducer } from './actions/admin_actions';
import { userActionsReducer } from './actions/user_actions';
import { requiredData } from './actions/required_data';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const config = {
  key: 'primary',
  storage,
  whitelist: ['auth', 'requiredData']
};

const reducers = persistCombineReducers(config, {
  form: FormReducer,
  auth: authReducer,
  admin: adminReducer,
  actions: userActionsReducer,
  requiredData: requiredData
});

export default reducers;
