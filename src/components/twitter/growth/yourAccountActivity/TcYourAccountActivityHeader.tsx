import React from 'react';
import TcText from '../../shared/TcText';

function TcYourAccountActivityHeader() {
  return (
    <>
      <TcText text="Your account activity" variant="h6" fontWeight="bold" />
      <TcText
        text="How much you engage with others"
        variant="caption"
        fontWeight="medium"
      />
    </>
  );
}

export default TcYourAccountActivityHeader;
