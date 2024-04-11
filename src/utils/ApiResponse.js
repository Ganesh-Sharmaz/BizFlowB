class ApiResponse {
  constructor(statuscode, data, message = "success") {
    this.statuscode = statuscode;
    this.data = this.data;
    this.message = message;
    this.success = statuscode < 400;
  }
}

export { ApiResponse };
