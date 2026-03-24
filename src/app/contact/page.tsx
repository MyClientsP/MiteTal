import HeroSection from "@/components/custom/contact/heroSection";
import ContactMethodsSection from "@/components/custom/contact/contactMethod";
import ContactForm from "@/components/custom/contact/contactForm";
import ContactInfoSidebar from "@/components/custom/contact/infoSideBar";
import OfficeLocationsSection from "@/components/custom/contact/officeLocation";
import { notFound } from "next/navigation";
import { contactQuery } from "@/components/custom/contact/contactQuery";
import { fetchStrapiData } from "@/utils/fetchData";

const ContactUsPage = async () => {
    const data = await fetchStrapiData('contact', contactQuery);

    if (!data) {
        notFound();
    }

    // Block order must match contactMock in mockData.ts:
    // [0] components.contact-hero   → hero
    // [1] layout.contact-method     → contactMethods
    // [2] components.contact-info   → contactInfo
    // [3] layout.contact-form       → contactForm
    // [4] layout.office             → offices (optional)
    const hero           = data.blocks[0];
    const contactMethods = data.blocks[1];
    const contactInfo    = data.blocks[2];
    const contactForm    = data.blocks[3];
    const offices        = data.blocks[4];

    return (
        <div className="min-h-screen bg-white">

            <HeroSection hero={hero} />

            <ContactMethodsSection contactData={contactMethods} />

            <section id="contact-form" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <ContactForm contactForm={contactForm} />
                        </div>
                        <div className="lg:col-span-1">
                            <ContactInfoSidebar contactInfo={contactInfo} />
                        </div>
                    </div>
                </div>
            </section>

            {offices?.offices?.length > 0 && (
                <OfficeLocationsSection office={offices} />
            )}

        </div>
    );
};

export default ContactUsPage;