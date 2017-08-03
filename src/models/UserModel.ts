export class UserModel {
  id: Number;
  email: String;
  createdAt: Date;
  imageData: JSON;
  coverData: String;
  username: String;
  password: String;
  constructor(data){
    this.id = data.id;
    this.email = data.email;
    this.createdAt = data.created_at;
    this.imageData = Object.keys(data.image_data).length ?  JSON.parse(data.image_data): data.image_data;
    this.username = data.name;
    this.coverData = Object.keys(data.covers_data).length ?  JSON.parse(data.covers_data): data.covers_data;
  }
}
