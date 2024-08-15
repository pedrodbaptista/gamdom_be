import express from 'express';
import cors from 'cors';
import {errorHandler} from './error';

export default [
  express.json(),
  express.urlencoded({extended: true}),
  cors(),
  errorHandler
];
