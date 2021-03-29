import Message from "./message";

class ResponseModel {
  constructor(data, code, message) {
    this.data = data;
    this.version = "1.00";
    this.message = new Message({code, message});
  }
};

export default ResponseModel;
