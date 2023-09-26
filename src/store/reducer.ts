import { createReducer } from '@reduxjs/toolkit';
import { loadGuitars, requireAuthorization, setUser} from './action';
import { AuthorizationStatus } from '../const';
import { Guitar } from '../types/guitar-type';
import { User } from '../types/user-type';

type InitialState = {
  guitars: Guitar[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  user: User;
};


const initialState: InitialState = {
  guitars: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  user: {
    id: '',
    name:'',
    email:'',
  }
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export { reducer };
