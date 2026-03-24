'use client';

import { Testimonial } from "./projectQuery";

interface TestimonialSectionProps {
  testimonial: Testimonial;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonial }) => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-2xl">
      <div className="flex items-start gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <blockquote className="text-lg text-gray-800 italic mb-4">
            "{testimonial.quote}"
          </blockquote>
          <div>
            <p className="font-semibold text-gray-900">{testimonial.author}</p>
            <p className="text-gray-600">{testimonial.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;