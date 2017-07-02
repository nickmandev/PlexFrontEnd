
export class VideoModel {
  id: Number;
  viewCount: Number;
  thumbnailUrl: String;
  userInfo: JSON;
  url480: String;
  url720: String;
  userId: Number;
  createdAt: Date;
  videoData: Object;
  constructor(data){
    this.id = data.id;
    this.viewCount = data.view_count;
    this.thumbnailUrl = data.thumbnail_url;
    this.userInfo = JSON.parse(data.user_info);
    this.url480 = `${data.url}480/index.m3u8`;
    this.url720 = `${data.url}720/index.m3u8`;
    this.userId = data.user_id;
    this.createdAt = data.created_at;
    this.videoData = JSON.parse(data.video_data);
  }
}
