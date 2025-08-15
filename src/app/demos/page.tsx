import { Column, Meta, Schema } from "@once-ui-system/core";
import { ProjectPreview } from '@/components/ProjectPreview';
import { baseURL, person } from "@/resources";

const demos = {
  path: "/demos",
  label: "Demos",
  title: `Interactive Demos – ${person.name}`,
  description: `Interactive project demonstrations and live previews by ${person.name}`,
};

export default function DemosPage() {
  return (
    <Column maxWidth="l" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={demos.path}
        title={demos.title}
        description={demos.description}
        image={`/api/og/generate?title=${encodeURIComponent(demos.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column fillWidth paddingY="24">
        <ProjectPreview maxDisplay={10} showFilters={true} />
      </Column>
    </Column>
  );
}