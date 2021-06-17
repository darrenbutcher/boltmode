// import NextAuth from 'next-auth'
// import Providers from 'next-auth/providers'

// const database = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: true,
//   extra: {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
// }

// const options = {
//   secret: 'hello',
//   jwt: {
//     secret:
//       'hello2fsdfsfsdfdfsfdsfsfdsfsffsffsfdsfdfsfdsfsfdsfsfdsfdsfdffsffsdfsffffr32432324',
//   },
//   session: {
//     jwt: true,
//   },
//   database,
//   providers: [
//     Providers.GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// }

// export default (req, res) => NextAuth(req, res, options)

import Cookies from 'cookies'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaClient } from '@prisma/client'
import jwt from 'next-auth/jwt'
import Adapters from 'next-auth/adapters'
import Models from '../../../models'

const prisma = new PrismaClient()

const secret = process.env.JWT_SECRET
const userId = 'a4b4a4ef-d3ce-4cd5-8938-9f56e6cd6afd'

export default async (req, res) => {
  const rawToken = await jwt.getToken({ req, secret, raw: true })
  // const { forceRefresh } = req.query
  //const forceRefresh = true
  const maxAge = 30 * 24 * 60 * 60
  // console.log(req.query)

  const database = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }

  const options = {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    // secret,
    session: {
      jwt: true,
    },
    database,
    jwt: {
      signingKey: process.env.JWT_SIGNING_KEY,
    },
    callbacks: {
      jwt: async (token, user, account, profile, isNewUser) => {
        const isSignIn = !!user
        // Add auth_time to token on signin in

        if (isSignIn) {
          token.auth_time = Math.floor(Date.now() / 1000)
          console.log('in is Sign in')

          token['https://hasura.io/jwt/claims'] = {
            'x-hasura-allowed-roles': ['standard', 'premium', 'elite'],
            'x-hasura-default-role': user.role,
            'x-hasura-user-id': user.uid,
          }
        }

        // const { refresh } = req.cookies
        // const cookies = new Cookies(req, res)
        // console.log('------------------------')
        // console.log('yum, cookies', req.cookies)
        // const ck = cookies.get('refresh')
        // console.log('ck is:', ck)
        // console.log('------------------------')
        // if (token && refresh) {----------------------------
        //   const cookies = new Cookies(req, res)
        //   // token['https://hasura.io/jwt/claims'] = {
        //   //   'x-hasura-allowed-roles': ['free', 'beta', 'pro'],
        //   //   'x-hasura-default-role': refresh,
        //   //   // 'x-hasura-role': 'beta',
        //   //   'x-hasura-user-id':  token['https://hasura.io/jwt/claims'].,
        //   // }
        //   token['https://hasura.io/jwt/claims']['x-hasura-default-role'] = role
        //   cookies.set('refresh')
        // }
        console.log(token)
        return Promise.resolve(token)
      },
      session: async (session, user, sessionToken) => {
        console.log('user is', user)
        session.token = rawToken
        return Promise.resolve(session)
      },
    },
    debug: true,
    adapter: Adapters.TypeORM.Adapter(database, {
      models: {
        User: Models.User,
      },
    }),
    // adapter: Adapters.Prisma.Adapter({
    //   prisma,
    //   // modelMapping: {
    //   //   User: 'user',
    //   //   Account: 'account',
    //   //   Session: 'session',
    //   //   VerificationRequest: 'verificationRequest',
    //   // },
    // }),
  }
  return NextAuth(req, res, options)
}
