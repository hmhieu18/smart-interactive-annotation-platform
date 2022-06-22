import RestConnector from "../connectors/RestConnector";

import ImageDataInstanceClass from "../classes/ImageDataInstanceClass";
import VideoDataInstanceClass from "../classes/VideoDataInstanceClass";
import { mockupDataInstance } from "../mockup";

class DataInstanceService {
  parseDataInstanceFromServer(instance) {
    if (instance._cls.includes(ImageDataInstanceClass._cls)) {
      return ImageDataInstanceClass.constructorFromServerData(instance);
    }
    if (instance._cls.includes(VideoDataInstanceClass._cls))
      return VideoDataInstanceClass.constructorFromServerData(instance);
    return {};
  }

  async getDataInstancesByDataset(datasetId, page = 1, per_page = 0) {
    // const dataInstancesResponse = await RestConnector.get(`/data?dataset_id=${datasetId}`)

    // const dataInstancesObj = await Promise.all(dataInstancesResponse.data.map(instance => this.parseDataInstanceFromServer(instance)))

    //mockup
    // const dataInstancesResponse = await [mockupDataInstance, mockupDataInstance]
    const dataInstancesObj = [mockupDataInstance, mockupDataInstance].map(
      (instance) => this.parseDataInstanceFromServer(instance)
    );
    return dataInstancesObj;
  }

  async deleteDataById(id) {
    return RestConnector.delete(`/data?id=${id}`).then((response) => {
      return response.data;
    });
  }

  async putDataInstance(dataInstance) {
    const updateData = {
      id: dataInstance.id,
      annotateStatus: dataInstance.annotateStatus,
    };
    return await RestConnector.put(`/data`, updateData);
  }

  upload(file, datasetId, onUploadProgress) {
    let formData = new FormData();

    formData.append("datasetID", datasetId);

    let uploadURL = "/data/image";
    if (file.type.includes("image")) {
      formData.append("data", file);
      uploadURL = "/data/image";
    } else {
      formData.append("data", file);
      uploadURL = "/data/video";
    }

    return RestConnector.post(uploadURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    }).then((response) => {
      if (response.data.success === "success"){
        const data = response.data;
        return this.parseDataInstanceFromServer(data);
      }
    }).catch((err) => {
      alert(err.response.data); // alert
      console.log(err.response.status); 
  });
  }
}

export default new DataInstanceService();
