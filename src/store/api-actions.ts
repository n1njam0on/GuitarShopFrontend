import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store.js';
import { Guitar } from '../types/guitar-type.js';
import { TokenPayload } from '../types/token-payload-type.js';
import { loadGuitars, requireAuthorization, redirectToRoute, setUser } from './action';
import { saveToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data-type.js';
import { RegistrationData } from '../types/registration-data-type.js';
import { User } from '../types/user-type.js';
import { AccessToken } from '../types/access-token-type.js';
import { CreateGuitar } from '../types/create-guitar-type.js';
import { UploadType } from '../types/upload-type.js';

export const fetchGuitarsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchGuitars',
  async (query, { dispatch, extra: api }) => {
    const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}/${query}`);
    dispatch(loadGuitars(data));
  },
);

export const createGuitarAction = createAsyncThunk<void, CreateGuitar, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/createGuitar',
  async (guitar, { dispatch, extra: api }) => {
    await api.post(APIRoute.CreateGuitar, guitar);
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const updateGuitarAction = createAsyncThunk<void, CreateGuitar, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/upfdateGuitar',
  async (guitar, { dispatch, extra: api }) => {
    await api.patch(`${APIRoute.UpdateGuitar}/${guitar.id}`, guitar);
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const deleteGuitarAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/deleteGuitar',
  async (guitarId, { dispatch, extra: api }) => {
    await api.delete(`${APIRoute.DeleteGuitar}/${guitarId}`);
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const uploadAction = createAsyncThunk<void, UploadType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/uploadFile',
  async ({file, guitarId}, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.UploadFile}/${guitarId}`, file);
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
      dispatch(setUser({ ...data, id: data.sub }));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const registrationAction = createAsyncThunk<void, RegistrationData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/registration',
  async ({ name, email, password }, { dispatch, extra: api }) => {
    await api.post<User & AccessToken>(APIRoute.Registration, { name, email, password });
    dispatch(redirectToRoute(AppRoute.Root));
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
