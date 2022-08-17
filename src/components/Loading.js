import React from 'react';
import {Spinner, HStack, Heading, Center} from 'native-base';

function Loading() {
  return (
    <Center flex={1}>
      <HStack mt={4} space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" color="primary.500" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </Center>
  );
}

export default Loading;
