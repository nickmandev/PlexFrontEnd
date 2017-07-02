import { Response } from './ResponseModel';
export class Comment{
  id: Number;
  body: String;
  voteUp: Number;
  voteDown: Number;
  videoId: Number;
  userInfo: Object;
  messages: Array<Response> = [];
  createdAt: Date;
  constructor(data){
    this.id = data.comment.id;
    this.body = data.comment.body;
    this.voteUp = data.comment.vote_up;
    this.voteDown = data.comment.vote_down;
    this.createdAt = data.comment.created_at;
    this.videoId = data.comment.video_id;
    this.userInfo = JSON.parse(data.comment.user_info);
    data.messages.forEach(message => {
      this.messages.push(new Response(message));
    });
  }
};
