import { faBoxOpen, faList, faSearchDollar, faTachometerAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function DashboardNav() {
	return (
		<>
			<nav className="menu font-semibold flex flex-row flex-wrap px-4 lg:px-0 lg:flex-col lg:justify-evenly py-4">
				<Link href={`/dashboard`}>
					<a className="px-3 lg:px-6 py-3 my-1 hover:text-primary-500 hover:bg-green-50 border-b-2 lg:border-b-0 lg:border-l-2 bg-green-50 border-primary-500">
						<span className="mr-2">
							<FontAwesomeIcon icon={faTachometerAlt} />
						</span>
						Dashboard
					</a>
				</Link>
				<Link href={`/projects`}>
					<a className="px-3 lg:px-6 py-3 my-1 hover:text-primary-500 hover:bg-green-50">
						<span className="mr-2">
							<FontAwesomeIcon icon={faSearchDollar} />
						</span>
						Fund a Project
					</a>
				</Link>
				<Link href={`/dashboard/projects-funded`}>
					<a className="px-3 lg:px-6 py-3 my-1 hover:text-primary-500 hover:bg-green-50">
						<span className="mr-2">
							<FontAwesomeIcon icon={faBoxOpen} />
						</span>
						Projects Funded
					</a>
				</Link>

				<Link href={`/dashboard/project-updates`}>
					<a className="px-3 lg:px-6 py-3 my-1 hover:text-primary-500 hover:bg-green-50">
						<span className="mr-2">
							<FontAwesomeIcon icon={faList} />
						</span>
						Project Updates
					</a>
				</Link>
				<Link href={`/dashboard/profile`}>
					<a className="px-3 lg:px-6 py-3 my-1 hover:text-primary-500 hover:bg-green-50">
						<span className="mr-2">
							<FontAwesomeIcon icon={faUserAlt} />
						</span>
						Profile
					</a>
				</Link>
			</nav>
		</>
	);
}

export default DashboardNav;
