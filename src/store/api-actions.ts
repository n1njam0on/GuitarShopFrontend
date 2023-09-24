import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store.js';
import { Guitar } from '../types/guitar-type.js';
import { TokenPayload } from '../types/token-payload-type.js';
import { loadGuitars, requireAuthorization, redirectToRoute, setUser } from './action';
import { saveToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data-type.js';
import { User } from '../types/user-type.js';
import { AccessToken } from '../types/access-token-type.js';

export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchGuitars',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Guitar[]>(APIRoute.Guitars);
    console.log(data);// eslint-disable-line
    dispatch(loadGuitars(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<TokenPayload>(APIRoute.CheckAuth);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser({...data, id: data.sub}));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<User & AccessToken>(APIRoute.Login, { email, password });
    saveToken(data.accessToken);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUser(data));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);
