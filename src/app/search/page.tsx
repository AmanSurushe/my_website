'use client';

import { Column, Heading, Text, Meta, Schema } from "@once-ui-system/core";
import { SearchBox } from '@/components/SearchBox';
import { baseURL, person } from "@/resources";

const search = {
  path: "/search",
  label: "Search",
  title: `Search – ${person.name}`,
  description: `Search through projects and blog posts by ${person.name}`,
};

export default function SearchPage() {
  return (
    <Column maxWidth="s" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={search.path}
        title={search.title}
        description={search.description}
        image={`/api/og/generate?title=${encodeURIComponent(search.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s" gap="12">
          <Heading as="h1" variant="display-strong-l">
            Search
          </Heading>
          <Text variant="heading-default-xl" onBackground="neutral-weak">
            Find projects, blog posts, and content across my portfolio
          </Text>
        </Column>

        <Column fillWidth paddingY="24">
          <SearchBox />
        </Column>

        <Column fillWidth gap="16" paddingTop="24">
          <Text variant="heading-strong-s" onBackground="neutral-strong">
            Search Tips:
          </Text>
          <Column gap="8">
            <Text variant="body-default-m" onBackground="neutral-medium">
              • Try searching for technologies: "React", "Node.js", "TypeScript"
            </Text>
            <Text variant="body-default-m" onBackground="neutral-medium">
              • Look for project types: "API", "management system", "platform"
            </Text>
            <Text variant="body-default-m" onBackground="neutral-medium">
              • Search topics: "best practices", "scalable", "development"
            </Text>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}