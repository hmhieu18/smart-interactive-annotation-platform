// import Image_1 from './static/images/mockup/Image_1.jpg'
// import Image_2 from './static/images/mockup/Image_2.jpg'
// import Image_3 from './static/images/mockup/Image_3.jpg'
// import Image_4 from './static/images/mockup/Image_4.jpg'
// import Image_5 from './static/images/mockup/Image_5.jpg'
// import Image_6 from './static/images/mockup/Image_6.jpg'
// import Image_7 from './static/images/mockup/Image_7.jpg'
// import Image_8 from './static/images/mockup/Image_8.jpg'
// import Image_9 from './static/images/mockup/Image_9.jpg'
// import Image_10 from './static/images/mockup/Image_10.jpg'
export const mockupProject = {
  id: 1,
  name: "Project1",
  description: "This is the project",
};

export const mockupModel = {
  id: 1,
  name: "Model1",
  description: "This is the project",
};
export const modelList = [mockupModel, mockupModel, mockupModel];
export const projectList = [
  mockupProject,
  mockupProject,
  mockupProject,
  mockupProject,
  mockupProject,
];

export const demoAnnotateData = [
  { id: 1, label: "Cat", isHidden: true, color: "red" },
  { id: 2, label: "Dog", isHidden: false, color: "green" },
];

export const mockupDataset = {
  id: 1222,
  name: "SoccerNet",
  description: "This is a soccer dataset",
  projectId: 1,
  datatype: "image",
  instances: 1,
  createdDate: new Date(2012, 1, 1),
};

export const mockupLabelList = [
  {
    annotation_properties: { fill: "#9C27B0", stroke: "#000000" },
    date_created: "2021-12-01T17:02:43.289000",
    id: "61a7aab3ba45c2d182c087b4",
    label: "Person",
    dataset: "61a649b13c699d85a19735c3",
  },
];

export const mockupLabelMaps = [
  [
    {
      id: "0549867f-39c9-4f2e-b5e0-9b36fd8451f2",
      datasetId: "e6645871-4519-4b95-b2b6-0019dbf25d29",
      label: "Goal",
      annotation_properties: { fill: "#1A237E", stroke: "#B71C1C" },
      date_created: 1656153980052,
    },
    {
      id: "0eabe8ee-220c-46b8-bfe5-c98bc2e40e69",
      datasetId: "e6645871-4519-4b95-b2b6-0019dbf25d29",
      label: "Kick off",
      annotation_properties: { fill: "#4A148C", stroke: "#1A237E" },
      date_created: 1656253054043,
    },
  ],
];

export const mockupThumbnail = {
  filename: "Image132",
  URL: "https://cdn.britannica.com/51/190751-050-147B93F7/soccer-ball-goal.jpg?q=60",
};

export const mockupImage = {
  id: 132,
  original: mockupThumbnail,
  thumbnail: mockupThumbnail,
};
export const mockupDataInstance = {
  id: 132,
  name: "Image132",
  image: mockupImage,
  thumbnail: mockupThumbnail,
  _cls: "ImageDataInstance",
  annotateStatus: 1,
};

export const mockupDataList = [
  {
    _cls: "DataInstance.ImageDataInstance",
    annotateStatus: 2,
    dataset: "625a83f303383f34b7603037",
    date_created: "2022-06-18T09:04:17.832000",
    height: 168,
    id: "62ad9511841ee8b12dd48ba7",
    image: {
      _cls: "Image",
      id: "62ad9511841ee8b12dd48ba6",
      original: {
        URL: "https://storage.googleapis.com/iaa-production/dataset/625a83f303383f34b7603037/images/original/download.jpeg",
        filename: "download.jpeg",
      },
      thumbnail: {
        URL: "https://storage.googleapis.com/iaa-production/dataset/625a83f303383f34b7603037/images/thumbnail/download.jpeg",
        filename: "download.jpeg",
      },
    },
    name: "download.jpeg",
    width: 300,
  },
];

// export const dataList = [
//     // {
//     //     id: 0,
//     //     imageURL: 'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//     //     thumbnailURL: 'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
//     // },
//     // {
//     //     id: 1,
//     //     imageURL: 'https://images.pexels.com/photos/1521306/pexels-photo-1521306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//     //     thumbnailURL: 'https://images.pexels.com/photos/1521306/pexels-photo-1521306.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
//     // },
//     // {
//     //     id: 2,
//     //     imageURL: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`',
//     //     thumbnailURL: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
//     // },
//     // {
//     //     id: 3,
//     //     imageURL: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     //     thumbnailURL: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
//     // },
//     // {
//     //     id: 4,
//     //     imageURL: 'https://images.pexels.com/photos/3054570/pexels-photo-3054570.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     //     thumbnailURL: 'https://images.pexels.com/photos/3054570/pexels-photo-3054570.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
//     // },
//     // {
//     //     id: 5,
//     //     imageURL: 'https://images.pexels.com/photos/982865/pexels-photo-982865.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//     //     thumbnailURL: 'https://images.pexels.com/photos/982865/pexels-photo-982865.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
//     // },
//     // {
//     //     id: 6,
//     //     imageURL: 'https://images.pexels.com/photos/918441/pexels-photo-918441.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     //     thumbnailURL: 'https://images.pexels.com/photos/918441/pexels-photo-918441.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
//     // },
//     // {
//     //     id: 7,
//     //     imageURL: 'https://images.pexels.com/photos/1787414/pexels-photo-1787414.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     //     thumbnailURL: 'https://images.pexels.com/photos/1787414/pexels-photo-1787414.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
//     // },
//     // {
//     //     id: 8,
//     //     imageURL: 'https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     //     thumbnailURL: 'https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
//     // },
//     // {
//     //     id: 9,
//     //     imageURL: 'https://images.pexels.com/photos/2691779/pexels-photo-2691779.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     //     thumbnailURL: 'https://images.pexels.com/photos/2691779/pexels-photo-2691779.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
//     // },
//     {
//         id: 10,
//         imageURL: Image_1,
//         thumbnailURL: Image_1,
//     },
//     {
//         id: 11,
//         imageURL: Image_2,
//         thumbnailURL: Image_2,
//     },
//     {
//         id: 12,
//         imageURL: Image_3,
//         thumbnailURL: Image_3,
//     },
//     {
//         id: 13,
//         imageURL: Image_4,
//         thumbnailURL: Image_4,
//     },
//     {
//         id: 14,
//         imageURL: Image_5,
//         thumbnailURL: Image_5,
//     },
//     {
//         id: 15,
//         imageURL: Image_6,
//         thumbnailURL: Image_6,
//     },
//     {
//         id: 16,
//         imageURL: Image_7,
//         thumbnailURL: Image_7,
//     },
//     {
//         id: 17,
//         imageURL: Image_8,
//         thumbnailURL: Image_8,
//     },
//     {
//         id: 18,
//         imageURL: Image_9,
//         thumbnailURL: Image_9,
//     },
//     {
//         id: 19,
//         imageURL: Image_10,
//         thumbnailURL: Image_10,
//     },
// ]
