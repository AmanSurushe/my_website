import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(["src", "app", "work", "projects"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  try {
    const routeParams = await params;
    const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

    console.log('Processing project slug:', slugPath);

    let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

    if (!post) {
      console.log('Post not found for slug:', slugPath);
      notFound();
    }

    console.log('Found post:', post.metadata.title);

    const avatars =
      post.metadata.team?.map((person) => ({
        src: person.avatar,
      })) || [];

    console.log('Team avatars prepared:', avatars.length);

    return (
      <Column as="section" maxWidth="m" horizontal="center" gap="l">
        <Schema
          as="blogPosting"
          baseURL={baseURL}
          path={`${work.path}/${post.slug}`}
          title={post.metadata.title}
          description={post.metadata.summary}
          datePublished={post.metadata.publishedAt}
          dateModified={post.metadata.publishedAt}
          image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Column maxWidth="xs" gap="16">
          <Button data-border="rounded" href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
            Projects
          </Button>
          <Heading variant="display-strong-s">{post.metadata.title}</Heading>
        </Column>
        {post.metadata.images.length > 0 && (
          <Media
            priority
            aspectRatio="16 / 9"
            radius="m"
            alt="image"
            src={post.metadata.images[0]}
          />
        )}
        <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
          <Flex gap="12" marginBottom="24" vertical="center">
            {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
          </Flex>
          <CustomMDX source={post.content} />
        </Column>
        <ScrollToHash />
      </Column>
    );
  } catch (error) {
    console.error('Error in Project component:', error);
    return (
      <Column as="section" maxWidth="m" horizontal="center" gap="l">
        <div style={{ 
          padding: '20px', 
          border: '1px solid red', 
          borderRadius: '5px', 
          background: '#ffe6e6' 
        }}>
          <h2>Project Loading Error</h2>
          <p>There was an error loading this project.</p>
          <pre style={{ fontSize: '12px', color: '#666' }}>
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </Column>
    );
  }
}
