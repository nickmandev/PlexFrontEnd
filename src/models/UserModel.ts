export class User {
  id: Number;
  email: String;
  createdAt: Date;
  imageData: String;
  username: String;
  password: String; 
  constructor(data){
    this.id = data.id;
    this.email = data.email;
    this.createdAt = data.created_at;
    this.imageData = data.image_data;
    this.username = data.name;
  }
}
