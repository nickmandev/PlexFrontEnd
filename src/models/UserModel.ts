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
    this.imageData = JSON.parse(data.image_data);
    this.username = data.name;
    this.coverData = data.covers_data;
  }
}
