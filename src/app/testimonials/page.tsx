import { Column, Meta, Schema } from "@once-ui-system/core";
import { Testimonials } from '@/components';
import { baseURL, person } from "@/resources";

const testimonials = {
  path: "/testimonials",
  label: "Testimonials",
  title: `Testimonials – ${person.name}`,
  description: `Client testimonials and recommendations for ${person.name}`,
};

export default function TestimonialsPage() {
  return (
    <Column maxWidth="l" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={testimonials.path}
        title={testimonials.title}
        description={testimonials.description}
        image={`/api/og/generate?title=${encodeURIComponent(testimonials.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column fillWidth paddingY="24">
        <Testimonials maxDisplay={4} showPagination={true} />
      </Column>
    </Column>
  );
}