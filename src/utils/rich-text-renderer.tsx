import { Blockquote } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { StoryblokRichtext, render } from 'storyblok-rich-text-react-renderer';

export function richTextRenderer(document: StoryblokRichtext) {
  return render(document, {
    markResolvers: {},
    nodeResolvers: {
      blockquote: (children) => {
        return <Blockquote>{children}</Blockquote>;
      },
      code_block: (children, props) => {
        const toString = children?.toString();
        return (
          <Prism
            className="w-full"
            language={props.class === 'language-bash' ? 'bash' : 'tsx'}
          >
            {toString as string}
          </Prism>
        );
      },
    },
  });
}
