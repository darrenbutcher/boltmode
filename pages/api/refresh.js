import Cookies from 'cookies'
import { getSession } from 'next-auth/client'

export default (req, res) => {
  // const cookies = new Cookies(req, res)
  const { role } = req.body.event.data.new
  console.log('my role <------', role)
  // cookies.set('refresh', role, { domain: 'app-3000.buildthat.xyz' })
  // req.headers = {
  //   cookie: 'big; 1',
  // }
  // req.cookies = {
  //   x: 'y',
  // }
  getSession({ req }).then((s) => {
    console.log('my session is ----->', s)
    s.lip = 'jell'
    return res.send('good')
  })
  // if (session) session.lip = 'hello'
}

// import Cookies from 'cookies'
// import NextAuth from 'next-auth'
// import Providers from 'next-auth/providers'
// import jwt from 'next-auth/jwt'
// // import Adapters from 'next-auth/adapters'
// // import Models from '../../../models'

// const secret = process.env.JWT_SECRET
// const userId = 'a4b4a4ef-d3ce-4cd5-8938-9f56e6cd6afd'

// export default async (req, res) => {
//   const rawToken = await jwt.getToken({ req, secret, raw: true })
//   // const { forceRefresh } = req.query
//   //const { role } = req.body.event.data.new
//   // const forceRefresh = true

//   // const database = {
//   //   type: 'postgres',
//   //   host: process.env.DB_HOST,
//   //   port: process.env.DB_PORT,
//   //   username: process.env.DB_USERNAME,
//   //   password: process.env.DB_PASSWORD,
//   //   database: process.env.DB_NAME,
//   //   ssl: true,
//   //   extra: {
//   //     ssl: {
//   //       rejectUnauthorized: false,
//   //     },
//   //   },
//   // }

//   // const options = {
//   //   session: {
//   //     jwt: true,
//   //   },
//   //   providers: [
//   //     Providers.GitHub({
//   //       clientId: process.env.GITHUB_ID,
//   //       clientSecret: process.env.GITHUB_SECRET,
//   //     }),
//   //   ],
//   //   // database,
//   //   jwt: {
//   //     signingKey: process.env.JWT_SIGNING_KEY,
//   //   },
//   //   callbacks: {
//   //     jwt: async (token, user) => {
//   //       if (token && role) {
//   //         const cookies = new Cookies(req, res)
//   //         // token['https://hasura.io/jwt/claims'] = {
//   //         //   'x-hasura-allowed-roles': ['free', 'beta', 'pro'],
//   //         //   'x-hasura-default-role': refresh,
//   //         //   // 'x-hasura-role': 'beta',
//   //         //   'x-hasura-user-id':  token['https://hasura.io/jwt/claims'].,
//   //         // }
//   //         token['https://hasura.io/jwt/claims']['x-hasura-default-role'] = role
//   //         cookies.set('refresh')
//   //       }
//   //       console.log(token)
//   //       return Promise.resolve(token)
//   //     },
//   //     session: async (session) => {
//   //       session.token = rawToken
//   //       return Promise.resolve(session)
//   //     },
//   //   },
//   //   // debug: true,
//   //   // adapter: Adapters.TypeORM.Adapter(database, {
//   //   //   models: {
//   //   //     User: Models.User,
//   //   //   },
//   //   // }),
//   // }
//   const options = {}
//   return NextAuth(req, res, options)
// }
