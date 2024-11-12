import type { FC } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface IProps {
  title?: string;
  titleTemplate?: string;
  description?: string;
}

const SEO: FC<IProps> = ({
  title = 'TogetherCrew',
  titleTemplate = 'Community Insights',
  description = 'TogetherCrew',
}): JSX.Element => (
  <HelmetProvider>
    <Helmet>
      <meta charSet='utf-8' />
      <title>
        {titleTemplate} | {title}
      </title>
      <meta name='description' content={description} />
    </Helmet>
  </HelmetProvider>
);

export default SEO;
