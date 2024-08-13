import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
import Users from './Users';
import Standards from './Standards';
import Roles from './Roles';
import BusinessUnits from './BusinessUnits';
import PurchaseAreas from './PurchaseAreas';
import StandardReports from './StandardReports';
import Organizations from './Organizations';
import Majors from './Majors';
import RoomsLayouts from './RoomsLayouts';
import Programs from './Programs';
import ChargeAccounts from './ChargeAccounts';
import Schools from './Schools';
import Levels from './Levels';
import Items from './Items';
import ItemCategories from './ItemCategories';
import ItemsAttributes from './ItemsAttributes';
import Courses from './Courses';
import Procesess from './Procesess';
import GapSourceStock from './GapSourceStock';
import GapSourceStandard from './GapSourceStandard';
import GapSourceDemand from './GapSourceDemand';
import Cities from './Cities';
import FormatTypes from './FormatTypes';
import VolumeTypes from './VolumeTypes';
import Campus from './Campus';
import Activities from './Activities';
import Worktimes from './Worktimes';
import Gaps from './Gap';
import GapPurchases from './GapPurchases';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    usersReducer: Users,
    standardsReducer: Standards,
    rolesReducer: Roles,
    businessUnitsReducer: BusinessUnits,
    purchaseAreasReducer: PurchaseAreas,
    standardAppliedToMajorReducer: StandardReports,
    standardAppliedToRoomLayoutReducer: StandardReports,
    standardsEquipmentByMajorReducer: StandardReports,
    booksCoverageReducer: StandardReports,
    organizationsReducer: Organizations,
    majorsReducer: Majors,
    roomsLayoutsReducer: RoomsLayouts,
    programsReducer: Programs,
    chargeAccountsReducer: ChargeAccounts,
    schoolsReducer: Schools,
    levelsReducer: Levels,
    itemsReducer: Items,
    itemCategoriesReducer: ItemCategories,
    itemsAttributesReducer: ItemsAttributes,
    coursesReducer: Courses,
    procesessReducer: Procesess,
    gapSourceStockReducer: GapSourceStock,
    gapSourceStandardReducer: GapSourceStandard,
    gapSourceDemandReducer: GapSourceDemand,
    citiesReducer: Cities,
    formatTypesReducer: FormatTypes,
    volumeTypesReducer: VolumeTypes,
    campusReducer: Campus,
    activitiesReducer: Activities,
    worktimesReducer: Worktimes,
    gapsReducer: Gaps,
    gapPurchasesReducer: GapPurchases,
  });
