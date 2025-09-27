import { Heading, Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { Repositories } from "@/components/Repositories";

const repositories = {
  path: "/repositories",
  label: "Repositories",
  title: `GitHub Repositories – ${person.name}`,
  description: `Explore ${person.name}'s open source projects and GitHub repositories`,
};

export async function generateMetadata() {
  return Meta.generate({
    title: repositories.title,
    description: repositories.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(repositories.title)}`,
    path: repositories.path,
  });
}

export default function RepositoriesPage() {
  return (
    <Column fillWidth gap="xl" horizontal="center" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }} className="repository-page-container">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={repositories.path}
        title={repositories.title}
        description={repositories.description}
        image={`/api/og/generate?title=${encodeURIComponent(repositories.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column fillWidth paddingY="24" gap="m">
        <Column fillWidth gap="12" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Heading as="h1" variant="display-strong-l">
            GitHub Repositories
          </Heading>
          <Heading as="h2" variant="heading-default-xl" onBackground="neutral-weak">
            Explore my open source projects and contributions
          </Heading>
        </Column>

        <Column fillWidth gap="40" paddingY="24">
          <Repositories username="AmanSurushe" showFilters={true} />
        </Column>
      </Column>
    </Column>
  );
}