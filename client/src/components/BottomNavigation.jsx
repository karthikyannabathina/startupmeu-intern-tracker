import { NavLink } from "react-router-dom";
import {
House,
Search,
ClipboardList,
UserRound,
} from "lucide-react";

const navigation = [
{ label: "Home", path: "/", Icon: House },
{ label: "Search", path: "/search", Icon: Search },
{ label: "Applications", path: "/applications", Icon: ClipboardList },
{ label: "Profile", path: "/profile", Icon: UserRound },
];

function BottomNavigation() {
return ( <nav className="bottom-nav" aria-label="Mobile navigation">
{navigation.map(({ label, path, Icon }) => (
<NavLink
key={label}
to={path}
end={path === "/"}
className={({ isActive }) =>
`bottom-nav__item${isActive ? " bottom-nav__item--active" : ""}`
}
> <Icon size={21} strokeWidth={1.8} aria-hidden="true" /> <span>{label}</span> </NavLink>
))} </nav>
);
}

export default BottomNavigation;
