import path from "path";
import express from "express";
import {app} from "./app";
export default app;

import "./identity"
import "./configuration"

// If no URL matches, Send all requests to index.html

// default port or localhost
app.listen(process.env["PORT"] || 5000);
console.log('app listening on ', process.env["PORT"] || 5000)
