interface IUser {
  type: string;
  id: string;
}

declare namespace Express {
  interface Request {
    user: IUser;
  }
}

declare namespace jsonwebtoken {
  interface JwtPayload {
    type: string;
  }
}
