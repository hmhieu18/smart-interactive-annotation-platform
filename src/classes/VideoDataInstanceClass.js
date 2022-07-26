import DataInstanceClass from "./DataInstanceClass";
import ImageClass from "./ImageClass";
import StorageFileClass from "./StorageFileClass";

export default class VideoDataInstanceClass extends DataInstanceClass {
  static _cls = "VideoDataInstance";

  constructor(id, name = "", video, thumbnail, otherData) {
    const { fps, width, height, ...others } = otherData;

    super(id, name, thumbnail, width, height, others);

    this.video = video;
    this.frames = null;
    this.fps = null;
    this.numFrames = null;
  }

  static async constructorFromServerData(data) {
    const { id, name, url, thumbnail, ...others } = data;
    return new VideoDataInstanceClass(
      id,
      name,
      url,
      StorageFileClass.constructorFromServerData({
        URL: thumbnail,
        filename: name,
      }),
      others
    );
  }
  async loadFrames(data) {
    console.log("Loading Frame", data);
    const { fps, URL, numFrames, ...others } = data;
    // const numFrames = 10;
    const frames = [];
    // const  = 10;
    for (let i = 1; i <= numFrames; i++) {
      const name = `${i}.jpeg`;
      // const url = `files/${URL.split("files/")[1]}/${name}`;
      const url = `${URL}/${name}`;
      console.log(i, url)
      const id = `${i}`;
      frames.push({
        id: id,
        name: name,
        url: url,
      });
    }
    let frames_obj = frames.map((frame) =>
      ImageClass.constructorFrameFromServerData(frame)
    );
    // await Promise.all(frames_obj.map(async (frame) => frame.getData()));
    let height = 50;
    let width = 50;

    if (frames_obj && frames_obj[0]) {
      await frames_obj[0].getData();
      let img = new Image();
      img.src = frames[0].url;
      img.onload = () => {
        this.width = img.width;
        this.height = img.height;
        // console.log(height, width);
      };
    }
    this.frames = frames_obj;
    this.numFrames = numFrames;
    this.fps = fps;
    this.width = width;
    this.height = height;
    // console.log(this.height, this.width);
  }

  getCurrentImage(playingState) {
    const { playingFrame = 0 } = playingState;
    return this.frames[playingFrame];
  }
}
