import { render } from '@testing-library/react';
import HeaderSection from './HeaderSection';

describe('HeaderSection', () => {
  test('renders header section with correct content', () => {
    // Render the component
    const { getByText, getByAltText } = render(<HeaderSection />);

    // Assert that the title is rendered correctly
    const titleElement = getByText('When is your community healthy?');
    expect(titleElement).toBeInTheDocument();

    // Assert that the paragraphs are rendered correctly
    const firstParagraph = getByText(
      'Here you will find health indicators based on our'
    );
    const secondParagraph = getByText(
      'We recommend a monthly review to prioritize areas for improvement,'
    );
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();

    // Assert that the image is rendered correctly
    const imageElement = getByAltText('communityhealth');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.tagName).toBe('IMG');
  });
});
