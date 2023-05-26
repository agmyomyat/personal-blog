// 1. Import the Storyblok client
import StoryblokClient from 'storyblok-js-client';

// 2. Initialize the client with the preview token
// from your space dashboard at https://app.storyblok.com
export const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
});
