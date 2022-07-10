const backendURL = process.env.REACT_APP_BACKEND_URL

const ResponseCode = {
  SUCCESS: 'success',

  ERROR_PARAMS: 'error_params',
  ERROR_HEADER: 'error_header',
  ERROR_FORBIDDEN: 'error_forbidden',
}


const ANNOTATION_TYPE = {
  BBOX: 'BBOX',
  EVENT: 'EVENT',
}

const ENUM_ANNOTATION_TYPE = {
  BBOX: 1,
  EVENT: 2,
}

const ENUM_ANNOTATE_STATUS = {
  FINSIHED: 1,
  UNFINISHED: 2,
  UNCERTAIN: 3,
}

const DATASET_DATATYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
}

const FEATURE_TYPE = {
  EVENT: 0,
  BBOX: 1,
}

const MODEL_ID = {
  NON_AUDIO_SOCCERNET_MODEL: "50d1e0bd-1d88-4da4-a200-cbe72ac4e00a",
  AUDIO_SOCCERNET_MODEL: "",
  FACENETFACENET_MODEL: "",
}


export {
  backendURL,
  ResponseCode,
  FEATURE_TYPE,
  ANNOTATION_TYPE,
  ENUM_ANNOTATION_TYPE,
  DATASET_DATATYPE,
  ENUM_ANNOTATE_STATUS,
  MODEL_ID
}