import { ErrorResponse } from "../utils/ErrorResponse";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;
  console.log(error);
  if (err.code === 11000) {
    const message = "Duplicated field value";
    error = new ErrorResponse(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => {
      //@ts-ignore
      val.message;
    });
    error = new ErrorResponse(message, 400);
  }
  response.status(error.status || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};
