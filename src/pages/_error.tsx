import { NextPageContext, NextComponentType } from 'next';
import Image from 'next/image';
import notFounded from '../assets/svg/404.svg';
import tcLogo from '../assets/svg/tc-logo.svg';
import CustomButton from '../components/global/CustomButton';
import { useRouter } from 'next/router';

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage: NextComponentType<
  NextPageContext,
  ErrorPageProps,
  ErrorPageProps
> = () => {
  const router = useRouter();

  return (
    <div className="container">
      <div className="flex w-10/12 py-4 md:w-8/12 md:py-4 mx-auto">
        <Image alt="Image Alt" src={tcLogo} />
      </div>{' '}
      <div className="flex flex-col md:flex-row justify-center space-x-8 items-center md:mt-8">
        <div className="block md:relative md:w-[248px] md:h-[214px]">
          <Image
            alt="Image Alt"
            src={notFounded}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">
            Oops! We’re sorry, we couldn’t find <br /> the page you’re looking
            for.{' '}
          </h1>
          <div className="space-y-3">
            <p className="font-bold text-md">What could have caused this?</p>
            <div className="space-y-2">
              <p className="text-base">
                The link you clicked might be old and does not work anymore.
              </p>
              <p className="text-sm">
                Or you might have accidentally typed the wrong URL in the
                address bar.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-md">What you can do</p>
            <p className="text-sm">
              You might retype the URL or try some helpful links instead:
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <CustomButton
              onClick={() => router.push('/')}
              classes={'text-black'}
              variant="outlined"
              label={'Community Insights'}
            />
            <CustomButton
              onClick={() => router.push('/tryNow')}
              classes={'text-black'}
              variant="outlined"
              label={'Connect your community'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorPageProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
