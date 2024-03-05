import type { FC } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface IProps {
  title?: string;
  titleTemplate?: string;
  description?: string;
}

const SEO: FC<IProps> = ({
  title,
  titleTemplate,
  description,
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

SEO.defaultProps = {
  title: 'TogetherCrew',
  titleTemplate: 'Community Insights',
  description: 'TogetherCrew',
};

export default SEO;
