import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { transaction: true },
    });
    res.send(users);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({});
    res.send(transactions);
  } catch (error) {
    //@ts-ignore
    res.status(404).send({ error: error });
  }
});

app.post("/sign-up", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      },
    });
    res.send(user);
  } catch (error) {
    //@ts-ignore
    res.status(404).send({ error: error });
  }
});

app.post("/sign-in", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.send(user);
  } else {
    res.status(400).send({ message: "email or passwors incorrect" });
  }
});

app.listen(port, () => {
  console.log(`app running: http:/localhost:${port}`);
});
