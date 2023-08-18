// generate token for user login
import jwt from "jsonwebtoken";

const generateToken = (userID: string): string => {
  console.log(process.env.JWT_SECRET_KEY);

  const token = jwt.sign(
    {
      id: userID,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

export default generateToken;
