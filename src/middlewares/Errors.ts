import {NextFunction, Request, Response } from 'express';

export default async (error:Error, req:Request, res:Response, next:NextFunction) => {
    
  return res.status(500).json({
    status: 500,
    message: `Internal server error: ${error.message}`,
  });

};