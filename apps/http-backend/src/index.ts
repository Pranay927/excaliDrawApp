import express from "express";
const app = express();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { userInputSchema, roomSchema} from "@repo/common/types";
import { Prisma } from "@repo/db/prisma";
import { auth } from "./auth";
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const typeCheck = userInputSchema.safeParse({ username, password });

  if (!typeCheck.success) {
    res.status(400).json({ msg: "Incorrect inputs" });
    return;
  }

  try {
    const hashPassword = await bcrypt.hash(password, 7);

    const user = await Prisma.user.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    res.json({ msg: `Hey ${user.username} your account has been created!` });
    return;
  } catch (error) {
    res.status(400).json({ msg: "Error from signup: " + error });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // input validation, then a db call to compare, then genereta  a JWT token for gated routes
    const inputCheck = userInputSchema.safeParse({ username, password });
    if (!inputCheck.success) {
      res.json({ InputError: inputCheck.error });
      return;
    }

    const user = await Prisma.user.findFirst({ where: { username }});

    if (!user) {
      res.status(400).json({ msg: "User not found" });
      return;
    }
    // user.password is hashed
    console.log(user);
    const pass = await bcrypt.compare(password, user.password);

    console.log(`password ; ${password} && hash ${user.password}`);
    if (!pass) {
      res.status(400).json({ msg: "Incorrect password" });
      return;
    }

    const token = jwt.sign({id: user.id }, JWT_SECRET);
    res.json({ msg: token });
    return;

  } catch (error) {
    res.status(400).json({ msg: "Error from signIn: " + error });
    return;
  }
});

app.post("/room", auth, async (req, res) => {
  // @ts-ignore
  try {
    const { name } = req.body;
    const typeCheck = roomSchema.safeParse({name});
    if(!typeCheck.success){
      res.json({Error: "Invalid Room name"})
      return;
    }
    // @ts-ignore
    const userId = req.id;
    console.log(userId)

    const room = await Prisma.room.create({
      data: {
        slug: name,
        adminId: userId,
      },
    });

    res.json({roomID: room.id});
    return;
    
  } catch (e) {
    res.status(400).json({ msg: "Error from creating room : " + e });
    return;
  }
});

app.listen(3001);
