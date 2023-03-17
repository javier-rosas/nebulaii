export type User = {
  email: string,
  email_verified: string,
  family_name: string | undefined,
  given_name:string | undefined,
  locale:string | undefined,
  name:string | undefined,
  nickname:string | undefined,
  picture: string | undefined,
  sid: string | undefined,
  sub: string | undefined,
  updated_at: string | undefined,
  accountType: string,
  token: string
}