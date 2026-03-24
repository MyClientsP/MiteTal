type abtComp = {
	id?: number;
	description: string;
}

type AboutCom = {
	title: string;
	aboutCompany: abtComp[];
}

type AboutCompanyProps = {
	about: AboutCom;
}

const AboutCompany = ({ about }: AboutCompanyProps) => {
	const { title, aboutCompany } = about

	return (
		<section>
			<div className="text-center mt-20 mb-10 px-3">
				<h2 className="text-4xl lg:text-5xl font-bold text-primarymitetal-700 mb-6 headingUpper">
					{title}
				</h2>

				{aboutCompany && aboutCompany.length > 0 &&
					aboutCompany.map((item, index) => (
						<div key={item.id ?? index}>
							<p className="text-lg lg:text-xl text-gray-600 max-w-6xl mx-auto leading-relaxed">
								{item.description}
							</p>
						</div>
					))
				}

				<p className="text-primarymitetal-700 text-xl font-bold mt-3">_________________</p>
			</div>
		</section>
	)
}

export default AboutCompany