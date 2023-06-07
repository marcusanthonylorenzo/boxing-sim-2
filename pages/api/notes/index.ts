// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
// handle server error middleware
import onError from "../../../middlewares/errors";
// import the notes controller for postingNotes and fetching all notes
import { postNote, getAllNotes } from "../../../controllers/NotesController";

// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// initiate next-connect with error middleware
const handler = nc({ onError });

// handler request from "api/notes" endpoint
// handle post request for posting a note
handler.get(getAllNotes);
// handle post request for posting a note
handler.post(postNote);

export default handler;