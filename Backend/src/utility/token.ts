// generate token for user login
import jwt from "jsonwebtoken";

const generateToken = (userID: string, userType: string): string => {
  const token = jwt.sign(
    {
      id: userID,
      type: userType,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

export default generateToken;
