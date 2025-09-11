export interface User {
  [prop: string]: any;

  id?: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: any[];
  permissions?: any[];
}

// export interface Token {
//   [prop: string]: any;

//   access_token: string;
//   token_type?: string;
//   expires_in?: number;
//   exp?: number;
//   refresh_token?: string;
// }
export interface Token {
  [prop: string]: any;

  AccessToken: string;
  TokenType?: string;
  ExpiresIn?: number;

  UserId?: number;
  EmployeeId?: number;
  FullName?: string;
  Email?: string;
  ProfilePictureURL?: string;
}
