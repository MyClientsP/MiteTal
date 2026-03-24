import { Mail, SendHorizonal } from "lucide-react";
import {LinkT} from "@/components/custom/home/homeQuery"

type Marketing = {
	title: string;
	description: string;
	cta: LinkT;
}

type MarketingProps = {
	marketing: Marketing
}

const Market = ({marketing}: MarketingProps) => {
	const serviceSection = '/#service-section'
	return (
		<section className="py-20 bg-gradient-to-r from-primarymitetal-400 to-primarymitetal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {marketing.title}
          </h2>
          <p className="text-xl text-white/90 mb-10">
            {marketing.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
			<div className="flex flex-row sm:flex-row gap-6 justify-center sm:mr-10 ">
	            <a href={serviceSection} className="cursor-pointer inline-flex items-center px-8 py-4 bg-white text-primarymitetal-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
	              Check Our Services
	            </a>
			  </div>
			<div className="flex flex-row sm:flex-row gap-6 justify-center">
	            <a href={marketing.cta.url} className="cursor-pointer  inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primarymitetal-600 transition-colors duration-300">
	              {marketing.cta.text} <SendHorizonal className="ml-2 w-5 h-5" />
	            </a>
			  </div>
			  
		  </div>
		</div>
	  </section>
	)
}

export default Market
