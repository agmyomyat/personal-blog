import { Playfair_Display } from 'next/font/google';
import { Avatar, Text, clsx } from '@mantine/core';
import { Storyblok } from '@/lib/storyblok-client';
import type { ISbStoriesParams, ISbStoryData } from 'storyblok-js-client';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { StoryCard } from '@/components/home/story-card';

const playFair = Playfair_Display({ subsets: ['latin'], weight: 'variable' });

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const stories = props.stories;
  if (!stories) return null;
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Avatar
          className="rounded-full"
          src="me.jpg"
          size={'lg'}
          alt="it's me"
        />
        <h2 className={clsx('text-xl font-normal', playFair.className)}>
          A blog about javascript,react and me &#128540;
        </h2>
      </div>
      <ul className="p-0 m-0 mt-5">
        {stories.map((story) => (
          <StoryCard story={story} key={story.id} />
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  stories: ISbStoryData[];
}> = async () => {
  // home is the default slug for the homepage in Storyblok
  // load the draft version
  let sbParams = {
    version: 'published', // or 'published'
    per_page: 15,
    sort_by: 'published_at:desc',
    content_type: 'blog',
  } satisfies ISbStoriesParams;

  let { data } = await Storyblok.get(`cdn/stories`, sbParams);
  return {
    props: {
      stories: data.stories,
    },
    revalidate: 86400, // revalidate every day
  };
};
