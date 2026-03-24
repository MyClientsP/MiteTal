'use client';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ContactInfo } from "./contactQuery";
import iconMap from "../LucideIcon";

interface ContactInfoSidebarProps {
  contactInfo: ContactInfo;
}

const ContactInfoSidebar = ({ contactInfo }: ContactInfoSidebarProps) => {
  const socialMedia = contactInfo?.socialMedia ?? [];
  const feature     = contactInfo?.feature     ?? [];
  
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const contactItems = [
    { icon: Mail,  label: "Email",          value: contactInfo?.email,   href: `mailto:${contactInfo?.email}` },
    { icon: Phone, label: "Phone",          value: contactInfo?.phone,   href: `tel:${contactInfo?.phone}` },
    { icon: MapPin,label: "Address",        value: contactInfo?.address, href: null },
    { icon: Clock, label: "Business Hours", value: contactInfo?.hours,   href: null },
  ].filter(item => item.value && item.value.length > 0);

  return (
    <div ref={ref} className="space-y-6">

      {/* ── Contact info card ── */}
      <div
        className={`bg-primarymitetal-50 rounded-2xl p-8 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h3 className="text-xl font-bold text-primarymitetal-700 mb-6">
          Contact Information
        </h3>

        {contactItems.length > 0 ? (
          <div className="space-y-5">
            {contactItems.map(({ icon: Icon, label, value, href }, i) => (
              <div
                key={label}
                className={`flex items-start gap-4 transition-all duration-500 ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: visible ? `${i * 100 + 150}ms` : '0ms' }}
              >
                <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-primarymitetal-400 to-primarymitetal-600 rounded-full flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-primarymitetal-600 hover:text-primarymitetal-800 font-medium transition-colors duration-200 text-sm"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-gray-700 font-medium text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Fallback — show email directly when no contact items are set */
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-primarymitetal-400 to-primarymitetal-600 rounded-full flex items-center justify-center shadow-sm">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Email</p>
              <a
                href="mailto:hello@mitetal.com"
                className="text-primarymitetal-600 hover:text-primarymitetal-800 font-medium transition-colors duration-200 text-sm"
              >
                hello@mitetal.com
              </a>
            </div>
          </div>
        )}

        {/* Social links */}
        {socialMedia.length > 0 && (
          <div
            className={`mt-8 pt-6 border-t border-primarymitetal-100 transition-all duration-500 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: visible ? '500ms' : '0ms' }}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Follow Us
            </p>
            <div className="flex gap-3">
              {socialMedia.map((item, i) => {
                const iconKey = item.text?.replace(/\s+/g, '') ?? '';
                const Icon = iconMap[iconKey] ?? iconMap['Target'] ?? Target;
                return (
                  <a
                    key={item.id ?? i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.text}
                    className={`w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-primarymitetal-600 hover:bg-primarymitetal-600 hover:text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 ${
                      visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                    style={{ transitionDelay: visible ? `${i * 80 + 550}ms` : '0ms' }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Why choose us card ── */}
      {feature.length > 0 && (
        <div
          className={`bg-white rounded-2xl shadow-md p-8 border border-gray-100 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: visible ? '200ms' : '0ms' }}
        >
          <h3 className="text-xl font-bold text-primarymitetal-700 mb-6">
            Why Work With Us?
          </h3>
          <div className="space-y-4">
            {feature.map((item, i) => (
              <div
                key={item.id ?? i}
                className={`flex items-center gap-3 transition-all duration-500 ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
                style={{ transitionDelay: visible ? `${i * 100 + 350}ms` : '0ms' }}
              >
                <CheckCircle2 className="w-5 h-5 text-primarymitetal-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{item.feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ContactInfoSidebar;