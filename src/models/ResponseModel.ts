export class Response {
  id: Number;
  body: String;
  voteUp: Number;
  voteDown: Number;
  commentId: Number;
  userInfo: Object;
  createdAt: Date;
  constructor(data){
    this.id = data.id;
    this.body = data.body;
    this.voteUp = data.vote_up;
    this.voteDown = data.vote_down;
    this.commentId = data.comment_id;
    this.createdAt = data.created_at;
    this.userInfo = JSON.parse(data.user_info);
  }
}
