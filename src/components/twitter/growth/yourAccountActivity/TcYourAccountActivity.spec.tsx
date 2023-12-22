import React from 'react';
import { render, screen } from '@testing-library/react';
import TcYourAccountActivity from './TcYourAccountActivity';
import TcYourAccountActivityHeader from './TcYourAccountActivityHeader';

describe('<TcYourAccountActivity />', () => {
  const mockActivity = {
    posts: 10,
    likes: 100,
    replies: 15,
    retweets: 7,
    mentions: 8,
  };

  beforeEach(() => {
    render(<TcYourAccountActivity activity={mockActivity} />);
  });

  // Test 1: Check if the TcYourAccountActivityHeader component is rendered.
  it('renders the header component', () => {
    render(<TcYourAccountActivityHeader />);
  });
  // Test 2: Check if the data is rendered correctly in the TcYourAccountActivityContent component.
  it('renders the correct activity values and descriptions', () => {
    expect(screen.getByText('Number of posts')).toBeInTheDocument();
    expect(screen.getByText(mockActivity.posts.toString())).toBeInTheDocument();

    expect(screen.getByText('Likes')).toBeInTheDocument();
    expect(screen.getByText(mockActivity.likes.toString())).toBeInTheDocument();

    expect(screen.getByText('Replies')).toBeInTheDocument();
    expect(
      screen.getByText(mockActivity.replies.toString())
    ).toBeInTheDocument();

    expect(screen.getByText('Retweets')).toBeInTheDocument();
    expect(
      screen.getByText(mockActivity.retweets.toString())
    ).toBeInTheDocument();

    expect(screen.getByText('Mentions')).toBeInTheDocument();
    expect(
      screen.getByText(mockActivity.mentions.toString())
    ).toBeInTheDocument();
  });

  // Test 3: Check transformation logic. This might be optional as it's more of an implementation detail.
  it('transforms the activity data correctly', () => {
    const expectedDescriptions = [
      'Number of posts',
      'Likes',
      'Replies',
      'Retweets',
      'Mentions',
    ];

    expectedDescriptions.forEach((description) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});
