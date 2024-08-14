import express from 'express';
import cors from 'cors';

export const middleware = [
  express.json(),
  express.urlencoded({extended: true}),
  cors()
];
