import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/shared/layouts/Footer";
import Header from "@/shared/layouts/Header";

export default function RootLayout(props: { children?: ReactNode }) {
    return (
        <div>
            <Header />
                <div className="py-8 px-4 mx-auto md:container sm:pb-24 md:px-6 lg:px-6">
                    {props.children}
                    <Outlet />
                </div>
            <Footer />
        </div>
    );
}
