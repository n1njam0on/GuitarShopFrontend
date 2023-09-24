import {createAction} from '@reduxjs/toolkit';
import { Guitar } from '../types/guitar-type';
import { AuthorizationStatus } from '../const';
import { User } from '../types/user-type';


export const loadGuitars = createAction<Guitar[]>('loadGuitars');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const redirectToRoute = createAction<string>('redirectToRoute');
export const setUser = createAction<User>('setUser');
