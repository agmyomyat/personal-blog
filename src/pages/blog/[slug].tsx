import { Storyblok } from '@/lib/storyblok-client';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { ISbStoriesParams, ISbStoryData } from 'storyblok-js-client';
import { Image } from '@mantine/core';
import { richTextRenderer } from '@/utils/rich-text-renderer';
import { humanizeDate } from '@/utils/humanize-date';
function Blog({ story }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!story) return null;
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold">{story.content.headline}</h1>
      <p className="text-lg italic">{humanizeDate(story.published_at!)}</p>
      <Image
        w={'100%'}
        src={story.content.cover_image.filename}
        alt="testing"
      ></Image>
      {story?.content.body ? richTextRenderer(story.content.body) : null}
    </div>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
type GetStaticPropsReturn = {
  story: ISbStoryData | false;
  key: string | false;
};
export const getStaticProps: GetStaticProps<GetStaticPropsReturn> = async ({
  params,
}) => {
  let sbParams = {
    version: 'published', // or 'published'
    content_type: 'blog',
  } satisfies ISbStoriesParams;
  let { data } = await Storyblok.get(`cdn/stories/${params?.slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    } satisfies GetStaticPropsReturn,
    revalidate: 86400,
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const { data }: { data: { stories: ISbStoryData[] } } = await Storyblok.get(
    'cdn/stories',
    {
      version: 'published',
      per_page: 15,
      sort_by: 'published_at:desc',
      content_type: 'blog',
    }
  );

  // Get the paths we want to pre-render based on posts
  const paths = data.stories.map((story) => ({
    params: { slug: story.full_slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export default Blog;
