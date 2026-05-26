import {test} from "@playwright/test"
import BusSearchAndFilter from '../pages/BusSearch-filter.page';
test("BusSearchAndFilter",async({page})=>{

    let BusSearch:BusSearchAndFilter=new BusSearchAndFilter(page);
    await BusSearch.searchBus();
    await BusSearch.filterBuses();
    await BusSearch.sortBuses();
})