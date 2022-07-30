import create from "zustand";
import { filter, cloneDeep, find, findIndex } from "lodash";

import LabelService from "../../../services/LabelService";
import AnnotationService from "../../../services/AnnotationService";
const useAnnotationStore = create((set, get) => ({
  isLoading: {},
  setIsLoading: (name, value) =>
    set((state) => ({ isLoading: { ...state.isLoading, [name]: value } })),

  labels: [],
  loadAnnotationLabels: async (datasetId) => {
    const setIsLoading = get().setIsLoading;
    setIsLoading("loading_dataset_labels", true);

    const labels = await LabelService.getLabelByDataset(datasetId);
    set({ labels });

    setIsLoading("loading_dataset_labels", false);
  },
  getLabelByName: (name) => {
    return find(get().labels, { label: name });
  },

  selectedAnnotationId: null,
  setSelectedAnnotationId: (newAnnotationId) =>
    set({ selectedAnnotationId: newAnnotationId }),
  getSelectedAnnotationId: () => get().selectedAnnotationId,

  annotations: [],
  loadAnnotations: async (dataID) => {
    set({
      annotations: [],
      saveStatus: true,
    });
    const setIsLoading = get().setIsLoading;
    setIsLoading("loading_annotations", true);
    let annotationsList = await AnnotationService.getAnnotationsByDataInstance(
      dataID
    );
    console.log("annotationsListstore", annotationsList);
    let annotations = [];
    annotationsList.forEach((ann) => {
      annotations.push(ann);
    });
    set({
      annotations,
    });
    setIsLoading("loading_annotations", false);
  },

  appendAnnotation: (newAnnotation) => {
    const annotations = [...get().annotations, newAnnotation];
    // sort annotations by frameid
    annotations.sort((a, b) => a.frameID - b.frameID);
    console.log("sorted annotations", annotations);
    set((state) => ({ annotations, saveStatus: false }));
  },

  deleteAnnotation: (deleteAnnotationId) => {
    set((state) => ({
      saveStatus: false,
      annotations: filter(
        state.annotations,
        (ann) => ann.id !== deleteAnnotationId
      ),
    }));
  },
  updateAnnotations: (id, annotationsList) => {
    AnnotationService.setAnnotationsByDataInstance(id, annotationsList);
    set({ saveStatus: true });
  },
  setAnnotationLabel: (id, newLabelId) => {
    const annotations = get().annotations.map((object) => {
      if (object.id !== id) {
        return object;
      } else {
        let newAnnotationObject = cloneDeep(object);
        newAnnotationObject.labelId = newLabelId;
        return newAnnotationObject;
      }
    });
    set({ annotations, saveStatus: false });
  },

  saveStatus: true,
  setSaveStatus: (saveStatus) => set({ saveStatus }),
  getSaveStatus: () => get().saveStatus,

  loadAnnotationsByDataID: async (dataID) => {
    let annotationsList = await AnnotationService.getAnnotationsByDataInstance(
      dataID
    );
    let annotations = [];
    annotationsList.forEach((ann) => {
      annotations.push({
        Label: find(get().labels, { id: ann.labelID })?.label,
        FrameNumber: ann.frameID,
        Confidence: ann?.confidence,
      });
    });
    return annotations;
  },

  loadAnnotationsOfDataset: async (dataList) => {
    // const  = get().dataList;
    //promise all to get all annotations of all data instances
    const annotations = await Promise.all(
      dataList.map(async (data) => {
        return {
          fileName: data.name,
          dataID: data.id,
          annotations: await get().loadAnnotationsByDataID(data.id),
        };
      })
    );
    return annotations;
  },
}));

export default useAnnotationStore;
