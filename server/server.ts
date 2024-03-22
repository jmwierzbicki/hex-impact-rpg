import path from "path";
import express from "express";
import {app} from "./app";

// Serve static files...
app.use(express.static(__dirname + '/../hex-impact-rpg/browser'));

import "./identity"
import "./configuration"

// If no URL matches, Send all requests to index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../hex-impact-rpg/browser/index.html'));
});

// default port or localhost
app.listen(process.env["PORT"] || 5000);
console.log('app listening on ', process.env["PORT"] || 5000)
