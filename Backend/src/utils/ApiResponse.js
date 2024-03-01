class ApiResponse {
    constructor(statusCode
                ,message = "success"
                ,data) {
        this.statusCode = statusCode < 400;  // statusCode because it is Api response
        this.message = message;
        this.data = data;
    }
}