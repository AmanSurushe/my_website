import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text, Tag, Icon, SmartLink } from "@once-ui-system/core";
import { baseURL, about, person, blog } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
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

  const posts = getPosts(["src", "app", "blog", "posts"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${blog.path}/${post.slug}`,
  });
}

export default async function BlogPost({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  try {
    const routeParams = await params;
    const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

    console.log('Processing blog slug:', slugPath);

    let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slugPath);

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

    // Calculate reading time
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Get all posts for navigation
    const allPosts = getPosts(["src", "app", "blog", "posts"]).sort((a, b) => 
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    );
    
    const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
    const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

    return (
      <Column as="section" maxWidth="m" horizontal="center" gap="l">
        <Schema
          as="blogPosting"
          baseURL={baseURL}
          path={`${blog.path}/${post.slug}`}
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
          <Button data-border="rounded" href="/blog" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
            Blog
          </Button>
          <Heading variant="display-strong-s">{post.metadata.title}</Heading>
        </Column>
        {post.metadata.image && (
          <Media
            priority
            aspectRatio="16 / 9"
            radius="m"
            alt="image"
            src={post.metadata.image}
          />
        )}
        <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
          <Flex gap="12" marginBottom="24" vertical="center" wrap>
            {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {readingTime} min read
            </Text>
            {post.metadata.tag && (
              <Tag label={post.metadata.tag} variant="neutral" />
            )}
          </Flex>
          <CustomMDX source={post.content} />
          
          {/* Social Sharing */}
          <Flex gap="12" paddingTop="32" paddingBottom="16" wrap>
            <Text variant="body-default-s" onBackground="neutral-medium">Share this post:</Text>
            <SmartLink 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.metadata.title)}&url=${encodeURIComponent(`${baseURL}${blog.path}/${post.slug}`)}`}
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <Flex gap="8" padding="8" radius="s" background="neutral-alpha-weak" vertical="center">
                <Icon name="twitter" size="s" />
                <Text variant="label-default-s">Twitter</Text>
              </Flex>
            </SmartLink>
            <SmartLink 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${baseURL}${blog.path}/${post.slug}`)}`}
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <Flex gap="8" padding="8" radius="s" background="neutral-alpha-weak" vertical="center">
                <Icon name="linkedin" size="s" />
                <Text variant="label-default-s">LinkedIn</Text>
              </Flex>
            </SmartLink>
          </Flex>
        </Column>
        
        {/* Post Navigation */}
        {(previousPost || nextPost) && (
          <Column maxWidth="xs" gap="16" paddingTop="32">
            <Text variant="heading-strong-s">More Posts</Text>
            <Flex gap="16" direction="column">
              {nextPost && (
                <SmartLink href={`/blog/${nextPost.slug}`} style={{ textDecoration: 'none' }}>
                  <Flex gap="12" padding="16" radius="m" border="neutral-alpha-weak" vertical="center" className="hover-lift">
                    <Icon name="chevronLeft" size="s" />
                    <Column gap="4" flex={1}>
                      <Text variant="body-default-s" onBackground="neutral-medium">Next</Text>
                      <Text variant="body-strong-s">{nextPost.metadata.title}</Text>
                    </Column>
                  </Flex>
                </SmartLink>
              )}
              {previousPost && (
                <SmartLink href={`/blog/${previousPost.slug}`} style={{ textDecoration: 'none' }}>
                  <Flex gap="12" padding="16" radius="m" border="neutral-alpha-weak" vertical="center" className="hover-lift">
                    <Column gap="4" flex={1}>
                      <Text variant="body-default-s" onBackground="neutral-medium">Previous</Text>
                      <Text variant="body-strong-s">{previousPost.metadata.title}</Text>
                    </Column>
                    <Icon name="chevronRight" size="s" />
                  </Flex>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
        
        <ScrollToHash />
      </Column>
    );
  } catch (error) {
    console.error('Error in BlogPost component:', error);
    return (
      <Column as="section" maxWidth="m" horizontal="center" gap="l">
        <div style={{ 
          padding: '20px', 
          border: '1px solid red', 
          borderRadius: '5px', 
          background: '#ffe6e6' 
        }}>
          <h2>Blog Loading Error</h2>
          <p>There was an error loading this blog post.</p>
          <pre style={{ fontSize: '12px', color: '#666' }}>
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </Column>
    );
  }
}