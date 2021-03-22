import React, { useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { MdMenu } from "react-icons/md";
import MobileNavMenu from "./mobile-nav-menu";
import ButtonLink from "./button-link";
import Image from "./image";
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "../../utils/types";
import { getButtonAppearance } from "../../utils/button";
import CustomLink from "./custom-link";
interface Props {
	navbar: any;
}
const Navbar = ({ navbar }: Props) => {
	const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

	return (
		<>
			<div className="w-full px-10 shadow-xl">
				<div className="mx-auto max-w-5xl">
					{/* The actual navbar */}
					<nav className="py-6 sm:py-4">
						<div className="container flex flex-row items-center justify-between">
							{/* Content aligned to the left */}
							<div className="flex flex-row items-center">
								<Link href="/[[...slug]]" as="/">
									<a>
										<Image media={navbar.logo} className="h-10 w-auto object-contain" />
									</a>
								</Link>
								{/* List of links on desktop */}
								<ul className="hidden list-none md:flex flex-row gap-4 items-baseline ml-10">
									{navbar.links.map((navLink: any) => (
										<li key={navLink.id}>
											<CustomLink link={navLink}>
												<div className="px-3 py-1 hover:text-primary-500">{navLink.text}</div>
											</CustomLink>
										</li>
									))}
								</ul>
							</div>
							{/* Hamburger menu on mobile */}
							<button onClick={() => setMobileMenuIsShown(true)} className="p-1 block md:hidden">
								<MdMenu className="h-8 w-auto" />
							</button>
							{/* CTA button on desktop */}
							{navbar.button && (
								<div className="hidden md:block">
									<ButtonLink
										button={navbar.button}
										appearance={getButtonAppearance(navbar.button.type, "light")}
										compact
									/>
								</div>
							)}
						</div>
					</nav>

					{/* Mobile navigation menu panel */}
					{mobileMenuIsShown && <MobileNavMenu navbar={navbar} closeSelf={() => setMobileMenuIsShown(false)} />}
				</div>
			</div>
		</>
	);
};

Navbar.propTypes = {
	navbar: PropTypes.shape({
		logo: mediaPropTypes,
		links: PropTypes.arrayOf(linkPropTypes),
		button: buttonLinkPropTypes,
	}),
};

export default Navbar;
