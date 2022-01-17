export class ErrorResponse extends Error {
  constructor(message: any, statusCode: any) {
    super(message);
    //@ts-ignore
    this.statusCode = statusCode;
  }
}
