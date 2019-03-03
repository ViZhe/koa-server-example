
import { gql } from 'apollo-server-koa';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { JWT, SMTP } from '../../../config';
import User from '../../../models/User';
import sendMail from '../../../services/sendMail';


interface ILogInArgs {
  email: string;
  password: string;
}

interface IRecovery {
  email: string;
}

interface ISignUp {
  email: string;
  password: string;
}

export const typeDef = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type RecoveryPayload {
    isSend: Boolean
  }

  extend type Mutation {
    logIn(email: String!, password: String!): AuthPayload
    recovery(email: String!): RecoveryPayload
    signUp(email: String!, password: String!): AuthPayload
  }
`;

export const resolvers = {
  Mutation: {
    logIn: async (_: {}, { email, password }: ILogInArgs) => {
      const user = await User.findOne({ email }).exec();

      if (!user) {
        throw new Error('No user with that email');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }

      const token = jsonwebtoken.sign({ userId: user.id }, JWT.SECRET, {
        expiresIn: '1d',
      });

      return {
        token,
        user,
      };
    },
    recovery: async (_: {}, { email }: IRecovery) => {
      const user = await User.findOne({ email }).exec();

      if (!user) {
        throw new Error('No user with that email');
      }

      const token = jsonwebtoken.sign({ userId: user.id }, JWT.SECRET, {
        expiresIn: '1d',
      });

      const mailOptions = {
        from: SMTP.USER,
        html: `<h2>Token</h2><code>${token}</code>`,
        subject: 'Password recovery token',
        to: user.email,
      };

      const res = await sendMail(mailOptions);

      return {
        isSend: res.success,
      };
    },
    signUp: async (_: {}, { email, password }: ISignUp) => {
      const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(10));

      const user = await new User({
        email,
        password: passwordHash,
      });

      try {
        await user.save();
      } catch (error) {
        throw new Error('User already exists');
      }

      const token = jsonwebtoken.sign({ userId: user.id }, JWT.SECRET, {
        expiresIn: '1d',
      });

      return {
        token,
        user,
      };
    },
  },
};
