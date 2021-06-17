import { useMemo } from 'react'
import useDarkmode from './use-darkmode'
import { withProtected } from './protected-route'

export const usePreEffect = (fn) => {
  useMemo(fn, [])
}

export const isClient = typeof window !== 'undefined'

export const fetchGatewayAPI = (operation) => 
  fetch('/api/graphql', {
    method: 'POST',
    body: JSON.stringify(operation),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json())

export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export const checkRequest = (handler) => (req, res) => {
  const { body, headers, cookies } = req
  const contype = headers['content-type']
  const cookieName = process.env.SESSION_COOKIE_NAME
  const token = cookies[cookieName] // || 'eyJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiRGFycmVuIEJ1dGNoZXIiLCJlbWFpbCI6ImRidXRjaGVyNkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9hdmF0YXJzMC5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDY5ODQ_dj00IiwiYXV0aF90aW1lIjoxNjA2OTI1NDYwLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiZnJlZSJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJmcmVlIiwieC1oYXN1cmEtdXNlci1pZCI6ImE0YjRhNGVmLWQzY2UtNGNkNS04OTM4LTlmNTZlNmNkNmFmZCJ9LCJpYXQiOjE2MDY5NTc2NDgsImV4cCI6MTYwOTU0OTY0OH0.VG2Ne8dHce-SgvSfU8Daq3FC152ZtCfK4t7FMCk0iUC-01160v7JMo8zDzaqCIgjZgj9qbOATxvyrZhQZR9SPA'

  if (!contype || contype.indexOf('application/json') !== 0) {
    return res.status(400).json({ error: '1042' })
  }

  // if (!body || typeof body !== 'string' || body === '') {
  //   return res.status(400).json({ error: '2946' })
  // }
  if (!body || body === '') {
    return res.status(400).json({ error: '2946' })
  }

  // if (!token) {
  //   return res.status(400).send({ error: '4305' })
  // }

  return handler(req, res)
}

export const formatMoney = (amount, currency = 'USD', local = 'en-US') => {
  const money = amount / 100
  return money.toLocaleString(local, { style: 'currency', currency })
}

export const settingsToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: 'rounded-md bg-white',
  bodyClassName: "text-gray-600 pl-4",
}

export { 
  useDarkmode,
  withProtected
  // usePreEffect,
  // fetchGatewayAPI,
  // runMiddleware,
  // formatMoney,
  // checkRequest,
}
