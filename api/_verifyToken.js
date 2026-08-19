/* eslint-env node */
import { createRemoteJWKSet, jwtVerify } from 'jose'

const PROJECT_ID = 'kedung-api-7eaed'
const PROJECT_NUMBER = '405425437612'
const API_KEY = process.env.FIREBASE_API_KEY || 'AIzaSyC9Aw39v6eUNEnHyGhkt9x7NCNCoh34_oE'
const AUDIENCES = [API_KEY, PROJECT_ID, PROJECT_NUMBER]
const ISSUER = `https://securetoken.google.com/${PROJECT_ID}`

const jwks = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
)

export async function verifyIdToken(idToken) {
  if (!idToken || typeof idToken !== 'string') {
    throw new Error('Token tidak valid')
  }
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: ISSUER,
    audience: AUDIENCES,
    algorithms: ['RS256']
  })
  return { uid: payload.sub, email: payload.email }
}