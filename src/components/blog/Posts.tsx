import { getPosts } from '@/utils/utils';
import { Grid, Column } from '@once-ui-system/core';
import Post from './Post';

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
    thumbnail?: boolean;
    direction?: 'row' | 'column';
}

export function Posts({
    range,
    columns = '1',
    thumbnail = false,
    direction
}: PostsProps) {
    let allBlogs = getPosts(['src', 'app', 'blog', 'posts']);

    const sortedBlogs = allBlogs.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedBlogs = range
        ? sortedBlogs.slice(
              range[0] - 1,
              range.length === 2 ? range[1] : sortedBlogs.length 
          )
        : sortedBlogs;

    // For single blog, use full-width column layout like Projects
    if (displayedBlogs.length === 1) {
        return (
            <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
                {displayedBlogs.map((post) => (
                    <Post
                        key={post.slug}
                        post={post}
                        thumbnail={thumbnail}
                        direction={direction}
                    />
                ))}
            </Column>
        );
    }

    return (
        <>
            {displayedBlogs.length > 0 && (
                <Grid
                    columns={columns}
                    fillWidth 
                    marginBottom="40" 
                    gap="l">
                    {displayedBlogs.map((post) => (
                        <Post
                            key={post.slug}
                            post={post}
                            thumbnail={thumbnail}
                            direction={direction}
                        />
                    ))}
                </Grid>
            )}
        </>
    );
}