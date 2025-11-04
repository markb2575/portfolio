"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Tab } from "@/components/layout";
import MobileMenu from "./mobile-menu";


const MenuToggleButton = ({
    opened,
    toggle,
}: {
    opened: boolean;
    toggle: () => void;
}) => (
    <div
        onClick={toggle}
        className="cursor-pointer z-50 fixed top-6 right-2 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3"
    >
        {opened ? (
            <X className="hover:text-neutral-500 transition-colors" />
        ) : (
            <Menu className="hover:text-neutral-500 transition-colors" />
        )}
    </div>
);

export default function Header() {
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <div>
            {/* Desktop Tabs */}
            <div className="hidden px-10 lg:flex flex-col w-full lg:w-2/3 justify-self-center">
                <Tab />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden px-10 flex flex-col justify-self-center">
                <MenuToggleButton
                    opened={menuOpened}
                    toggle={() => setMenuOpened((prev) => !prev)}
                />
                {menuOpened && <MobileMenu setMenuOpened={setMenuOpened} />}
            </div>
        </div>
    );
}
