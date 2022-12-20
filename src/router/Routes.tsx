import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import LoaderPage from '../pages/LoaderPage';
import AgGridSolutionPage from "../pages/AgGridSolutionPage";
import DashboardPage from "../pages/DashboardPage";

export const RoutesSwitch = () => {
    return (
        <Suspense fallback={<LoaderPage/>}>
            <Routes>
                <Route path={'/'} element={<DashboardPage/>}/>
                <Route path={'/agGridSolution'} element={<AgGridSolutionPage/>}/>
            </Routes>
        </Suspense>
    );
};

