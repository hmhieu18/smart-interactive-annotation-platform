import create from 'zustand'
import { filter, cloneDeep, find, findIndex } from 'lodash'

import LabelService from '../../../services/LabelService'
import AnnotationService from '../../../services/AnnotationService'


const useAnnotationStore = create((set, get) => ({
  isLoading: {},
  setIsLoading: (name, value) => set(state => ({ isLoading: { ...state.isLoading, [name]: value } })),

  labels: [],
  loadAnnotationLabels: async (datasetId) => {
    const setIsLoading = get().setIsLoading
    setIsLoading("loading_dataset_labels", true)

    const labels = await LabelService.getLabelByDataset(datasetId)
    set({ labels })

    setIsLoading("loading_dataset_labels", false)
  },

  selectedObjectId: null,
  setSelectedObjectId: (newObjectId) => set({ selectedObjectId: newObjectId }),
  getSelectedObjectId: () => get().selectedObjectId,


  annotations: {},
  loadAnnotations: async (instanceId) => {
    const setIsLoading = get().setIsLoading
    setIsLoading("loading_annotations", true)

    let annotationsObj = await AnnotationService.getAnnotationsByDataInstance(instanceId)
    let annotations = {}
    annotationsObj.forEach(ann => {
      if (!annotations[ann.annotationImageId]) {
        annotations[ann.annotationImageId] = []
      }
      annotations[ann.annotationImageId].push(ann)
    })
    set({ 
      drawingAnnotation: null,
      annotations 
    })
    setIsLoading("loading_annotations", false)
  },
  setAnnotation: async (annotationId, newEditingAnnotationData, options = {}) => {
    const { commitAnnotation = true, setKeyFrame = false } = options
    let annotations = cloneDeep(get().annotations)

    Object.keys(annotations).forEach(annotationImageId => {
      annotations[annotationImageId] = annotations[annotationImageId].map((annotation) => {
        if (annotation.id !== annotationId) {
          return annotation
        } else {

          annotation.updateData = newEditingAnnotationData
          if (setKeyFrame) {
            annotation.keyFrame = true
            annotation.isPropagating = false
          }
          if (commitAnnotation) {
            annotation.applyUpdate()
          }

          return annotation
        }
      })
    })

    set({ annotations })
  },
  setAnnotationWithImageId: async (annotationId, annotationImageId, newEditingAnnotationData, options = {}) => {
    const { commitAnnotation = true, setKeyFrame = false } = options
    let annotations = cloneDeep(get().annotations)

    annotations[annotationImageId] = annotations[annotationImageId].map((annotation) => {
      if (annotation.id !== annotationId) {
        return annotation
      } else {

        annotation.updateData = newEditingAnnotationData
        if (setKeyFrame) {
          annotation.keyFrame = true
          annotation.isPropagating = false
        }
        if (commitAnnotation) {
          annotation.applyUpdate()
        }

        return annotation
      }
    })

    set({ annotations })
  },
  updateAnnotation: async (newAnnotation, options = {}) => {
    const { commitAnnotation = true } = options
    let annotations = cloneDeep(get().annotations)

    let clonedAnnotation = cloneDeep(newAnnotation)

    try {
      if (commitAnnotation) {
        await clonedAnnotation.applyUpdate()
      }
    } catch (error) {
      console.log(error)
    }
    
    const annotationImageId = newAnnotation.annotationImageId
    annotations[annotationImageId] = annotations[annotationImageId].map((annotation) => {
      if (annotation.id !== newAnnotation.id) {
        return annotation
      } else {
        return clonedAnnotation
      }
    })

    set({ annotations })
    return "finish"
  },
  updateAnnotations: async (newAnnotationsDict, options = {}) => {
    const { commitAnnotation = true } = options
    let annotations = cloneDeep(get().annotations)

    try {
      if (commitAnnotation) {
        await Promise.all(Object.keys(newAnnotationsDict).map(id => newAnnotationsDict[id].applyUpdate()))
      }
    } catch (error) {
      console.log(error)
    }

    Object.keys(annotations).forEach(annotationImageId => {
      annotations[annotationImageId] = annotations[annotationImageId].map((annotation) => {
        if (!!newAnnotationsDict[annotation.id]) {
          return newAnnotationsDict[annotation.id]
        } else {
          return annotation
        }
      })
    })

    set({ annotations })
  },
  getAnnotationByAnnotationObjectId: (annotationObjectId, annotationImageId) => {
    let annotations = get().annotations

    return find(annotations[annotationImageId], { annotationObjectId })
  },
  deleteAnnotation: (deleteAnnotationId, options = {}) => {
    const { commitAnnotation = true } = options

    try {
      if (commitAnnotation) {
        AnnotationService.deleteAnnotationById(deleteAnnotationId)
      }
    } catch (error) {
      console.log(error)
    }

    let annotations = cloneDeep(get().annotations)

    Object.keys(annotations).forEach(annotationImageId => {
      annotations[annotationImageId] = filter(annotations[annotationImageId], (ann) => ann.id !== deleteAnnotationId)
    }) 

    set({ annotations })
  },



  appendAnnotation: async (newAnnotation, options = {} ) => {
    const { commitAnnotation = true, awaitUpdate = true } = options
    try {
      if (commitAnnotation) {
        awaitUpdate ? await newAnnotation.applyUpdate() : newAnnotation.applyUpdate()
      }
    } catch (error) {
      console.log(error)
    }
    const annotations = cloneDeep(get().annotations)
    if (!annotations[newAnnotation.annotationImageId]) {
      annotations[newAnnotation.annotationImageId] = []
    }
    annotations[newAnnotation.annotationImageId] = [...annotations[newAnnotation.annotationImageId], newAnnotation]

    set({ annotations })
  },
  appendAnnotations: async (newAnnotations, options = {}) => {
    const { commitAnnotation = true } = options
    try {
      if (commitAnnotation) {
        await Promise.all(newAnnotations.map((ann) => ann.applyUpdate()))
      }
    } catch (error) {
      console.log(error)
    }
    const annotations = cloneDeep(get().annotations)

    newAnnotations.forEach(newAnnotation => {
      if (!annotations[newAnnotation.annotationImageId]) {
        annotations[newAnnotation.annotationImageId] = []
      }
      annotations[newAnnotation.annotationImageId] = [...annotations[newAnnotation.annotationImageId], newAnnotation]
    })

    set({ annotations })
  },

}))

export default useAnnotationStore