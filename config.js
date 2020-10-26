import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

export const config = {
    JWTDEVTOKEN: process.env.JWTDEVTOKEN || false
}
