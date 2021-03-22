import Image from "./image";
import PropTypes from "prop-types";
import { linkPropTypes, mediaPropTypes } from "../../utils/types";
import CustomLink from "./custom-link";

interface Props {
	footer: any;
}

const Footer = ({ footer }: Props) => {
	return (
		<>
			<div className="w-full relative py-10 bg-gray-800 text-white rounded-t-full"></div>
			<footer className="w-full px-10 bg-gray-800 text-white">
				<div className="mx-auto max-w-5xl">
					<div className="container flex flex-col lg:flex-row lg:justify-between">
						<div>{footer.logo && <Image media={footer.logo} className="h-8 w-auto object-contain" />}</div>
						<nav className="flex flex-wrap flex-row lg:gap-20 items-start lg:justify-end mb-10">
							{footer.columns.map((footerColumn: any) => (
								<div key={footerColumn.id} className="mt-10 lg:mt-0 w-6/12 lg:w-auto">
									<p className="uppercase tracking-wide font-semibold">{footerColumn.title}</p>
									<ul className="mt-2">
										{footerColumn.links.map((link: any) => (
											<li key={link.id} className="text-gray-100 py-1 px-1 -mx-1 hover:text-primary-500">
												<CustomLink link={link}>{link.text}</CustomLink>
											</li>
										))}
									</ul>
								</div>
							))}
						</nav>
					</div>
					<div className="text-sm py-6">
						<div className="container">{footer.smallText}</div>
					</div>
				</div>
			</footer>
		</>
	);
};

Footer.propTypes = {
	footer: PropTypes.shape({
		logo: mediaPropTypes.isRequired,
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
				title: PropTypes.string.isRequired,
				links: PropTypes.arrayOf(linkPropTypes),
			}),
		),
		smallText: PropTypes.string.isRequired,
	}),
};

export default Footer;
