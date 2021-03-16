import jwtPkg from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { verify } = jwtPkg;

function getTokenPayload(token) {
  return verify(token, process.env.APP_SECRET);
}

export function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error('Not authenticated');
}
