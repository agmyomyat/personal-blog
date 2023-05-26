import { humanizeDate } from '@/utils/humanize-date';
import { Card, Image, Text, Badge, Group, AspectRatio } from '@mantine/core';
import Link from 'next/link';
import { ISbStoryData } from 'storyblok-js-client';

export function StoryCard({ story }: { story: ISbStoryData }) {
  return (
    <Card w={'700px'} maw={'100%'} className="p-0" radius="md">
      <Link href={`/blog/${story.full_slug}`} className="no-underline">
        <div className="flex flex-row items-center justify-between">
          <div>
            <Text weight={500} className="sm:text-3xl text-lg" color="#000000">
              {story.content.headline}
            </Text>
            <Group position="apart" mb="xs">
              <Badge color="pink" variant="light">
                blog
              </Badge>
            </Group>
            <Text size="sm" color="dimmed" italic>
              {humanizeDate(story.published_at!)}
            </Text>
            <Text size="sm" color="#000000" className="sm:block hidden">
              {story.content.sub_headline}
            </Text>
          </div>
          <AspectRatio ratio={16 / 9} maw={300} m={'auto'} w={150}>
            <Image
              src={story.content.cover_image.filename}
              alt={story.content.cover_image.alt}
            />
          </AspectRatio>
        </div>
      </Link>
    </Card>
  );
}
