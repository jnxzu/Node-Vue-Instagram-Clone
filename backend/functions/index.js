const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.get("/jebacpis", (req, res) => res.send("***** ***"));

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.region("europe-west1").https.onRequest(app);
