import {
  GET_STANDARDS,
  GET_STANDARD_COURSE,
  ADD_STANDARD,
  ADD_CURRENT_STANDARD_COURSE,
  DELETE_BULK_STANDARDS,
  DISABLE_BULK_STANDARDS,
  DELETE_STANDARD,
  ENABLE_DISABLE_STANDARD,
  EDIT_STANDARD,
  SET_CURRENT_STANDARD,
  DELETE_STANDARD_COURSE_ITEM,
  DELETE_STANDARD_BY_RELAY_COURSE,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  standards: [],
  currentStandard: {
    id: null,
    stdcStdCode: null,
    stdcOrgCode: null,
    stdcOrgDescription: null,
    stdcBuCode: null,
    stdcBuName: null,
    stdcStdVersion: null,
    stdcCoursCode: null,
    stdcCoursDescription: null,
    stdcRlayCode: null,
    stdcRlayDescription: null,
    stdcPurcCode: null,
    stdcPurcName: null,
    stdcItemCode: null,
    stdcItemDescription: null,
    stdcItmcName: null,
    stdcItmcParent: null,
    stdcSchoCode: null,
    stdcSchoDescription: null,
    stdcPerformance: null,
    stdcRenewalCicle: null,
    stdcMaintenanceCicle: null,
    stdcDetail: null,
    stdcStatus: null,
  },
  currentStandardCourse: [
    {
      standardId: null,
      stdCode: null,
      stdOrgCode: null,
      stdOrgDescription: null,
      stdBuCode: null,
      stdPurcCode: null,
      stdPurcDescription: null,
      stdVersion: null,
      stdName: null,
      stdRegistrationDate: null,
      stdCaccCode: null,
      stdCaccDescription: null,
      stdSchoCode: null,
      stdSchoDescription: null,
      stdYear: null,
      stdAvailableForPurchase: null,
      relay: [],
    },
  ],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STANDARDS: {
      return {
        ...state,
        standards: action.payload,
      };
    }
    case GET_STANDARD_COURSE: {
      return {
        ...state,
        currentStandardCourse: action.payload,
      };
    }
    case DELETE_STANDARD_COURSE_ITEM: {
      const { indexCourse, itemId } = action.payload;
      return {
        ...state,
        currentStandardCourse: state.currentStandardCourse[0].relay[indexCourse].items.filter(
          courseItem => courseItem.itemId !== itemId,
        ),
      };
    }
    case DELETE_STANDARD_BY_RELAY_COURSE: {
      const { courseId } = action.payload;
      return {
        ...state,
        currentStandardCourse: state.currentStandardCourse[0].relay.filter(relayCourse => relayCourse.courseId !== courseId),
      };
    }
    case ADD_STANDARD: {
      return {
        ...state,
        standards: [action.payload, ...state.standards],
      };
    }

    case ADD_CURRENT_STANDARD_COURSE: {
      return {
        ...state,
        //currentStandardCourse: [action.payload, ...state.currentStandardCourse[0].relay],
        //currentStandardCourse: [action.payload],
        currentStandardCourse: [action.payload],
      };
    }
    case EDIT_STANDARD: {
      return {
        ...state,
        standards: state.standards.map(standard => (standard.id === action.payload.id ? action.payload : standard)),
      };
    }
    case DELETE_STANDARD: {
      return {
        ...state,
        standards: state.standards.filter(standard => standard.id !== action.payload),
      };
    }

    case DELETE_BULK_STANDARDS: {
      return {
        ...state,
        standards: state.standards.filter(standard => !action.payload.includes(standard.id)),
      };
    }

    case ENABLE_DISABLE_STANDARD: {
      return {
        ...state,
        //standards: state.standards.filter(standard => standard.id !== action.payload),
        standards: action.payload,
      };
    }

    case DISABLE_BULK_STANDARDS: {
      return {
        ...state,
        //standards: state.standards.filter(standard => !action.payload.includes(standard.id)),
        standards: action.payload,
      };
    }
    case SET_CURRENT_STANDARD: {
      return { ...state, currentStandard: action.payload };
    }
    default:
      return state;
  }
};
