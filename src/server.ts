import express from "express"
import cors from "cors"
import { PrismaClient } from '@prisma/client'
import brypt from "bcryptjs"

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())
const port = 4000

