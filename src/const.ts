export enum AppRoute {
  Login = '/login',
  Registration = '/registration',
  Edit = '/edit',
  Root = '/',
  Product = '/product',
  Add = '/add'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Guitars = '/guitars',
  Login = '/user/login',
  CheckAuth = '/user/check',
}


export const TIMEOUT_SHOW_ERROR = 2000;
