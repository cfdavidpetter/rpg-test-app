import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "@/shared/layouts/RootLayout";
import Error404 from "@/shared/components/404";

const Home = React.lazy(() => import("@/pages/Home"));
const Players = React.lazy(() => import("@/pages/Players"));
const Guilds = React.lazy(() => import("@/pages/Guilds"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/guilds" element={<Guilds />} />
            <Route path="*" element={<Error404 />} />
        </Route>
    )
);

export default router;
