import { FACEBOOK_LINK, GITHUB_LINK } from '@/constants';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};
export function Layout({ children }: Props) {
  return (
    <div className="flex mx-5 justify-center">
      <div className="w-[700px] max-w-full">
        <Link href="/" className="no-underline">
          <h1 className="text-red-400 mb-5">Aung Myo Myat</h1>
        </Link>
        {children}
        <div className="relative bottom-0 mb-14">
          <div className="flex gap-3">
            <Link
              href={GITHUB_LINK}
              className="text-red-400 text-xl"
              target="_blank"
            >
              Github
            </Link>
            <Link
              href={FACEBOOK_LINK}
              className="text-red-400 text-xl"
              target="_blank"
            >
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
