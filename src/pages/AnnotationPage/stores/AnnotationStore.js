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
    set((state) => ({ annotations,
    saveStatus: false }));
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
    AnnotationService.setAnnotationsByDataInstance(id, annotationsList)
    set({ saveStatus: true });
  },

  saveStatus: true,
  setSaveStatus: (saveStatus) => set({ saveStatus }),
  getSaveStatus: () => get().saveStatus,
}));

export default useAnnotationStore;
