"use client";

import { Column, Flex, Heading, Media, SmartLink, Tag, Text } from '@once-ui-system/core';
import styles from './Posts.module.scss';
import { formatDate } from '@/utils/formatDate';
import { calculateReadingTime } from '@/utils/readingTime';

interface PostProps {
    post: any;
    thumbnail: boolean;
    direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
    const readingTime = calculateReadingTime(post.content);
    
    return (
        <SmartLink
            fillWidth
            unstyled
            style={{ borderRadius: 'var(--radius-l)' }}
            key={post.slug}
            href={`/blog/${post.slug}`}>
            <Flex
                position="relative"
                transition="medium"
                direction={direction}
                radius="l"
                className={styles.hover}
                fillWidth>
                {post.metadata.image && thumbnail && (
                    <Media
                        priority
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 640px"
                        border="neutral-alpha-weak"
                        cursor="interactive"
                        radius="l"
                        src={post.metadata.image}
                        alt={'Thumbnail of ' + post.metadata.title}
                        aspectRatio="16 / 9"
                    />
                )}
                <Column
                    position="relative"
                    fillWidth 
                    gap="12"
                    paddingX="s"
                    paddingTop="12"
                    paddingBottom="24">
                    <Heading
                        as="h2"
                        variant="heading-strong-xl"
                        wrap="balance">
                        {post.metadata.title}
                    </Heading>
                    {post.metadata.summary && (
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-weak"
                            wrap="balance">
                            {post.metadata.summary}
                        </Text>
                    )}
                    <Flex gap="16" wrap>
                        <Text
                            variant="label-default-s"
                            onBackground="neutral-weak">
                            {formatDate(post.metadata.publishedAt, false)}
                        </Text>
                        <Text
                            variant="label-default-s"
                            onBackground="neutral-weak">
                            {readingTime} min read
                        </Text>
                        {post.metadata.tag && (
                            <Tag
                                label={post.metadata.tag}
                                variant="neutral" />
                        )}
                    </Flex>
                </Column>
            </Flex>
        </SmartLink>
    );
}