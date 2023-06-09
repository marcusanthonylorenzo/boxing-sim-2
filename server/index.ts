import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
      origin: "https://localhost:3000",
    //   allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

const express = require('express');
const app = express();

app.get('/', (req:any, res:any) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: any) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
 
httpServer.listen(3003, () => {
  console.log('listening on *:3003');
});
