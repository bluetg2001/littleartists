import React from 'react';
// native-base
import {Box, Text, Divider} from 'native-base';

const AttendanceInfo = () => {
  return (
    <Box>
      <Box flexDirection={'row'}>
        <Text fontSize={'sm'} color={'dark.100'} textAlign={'center'} flex={1}>
          2022-02-01
        </Text>
        <Text fontSize={'sm'} color={'dark.100'} textAlign={'center'} flex={1}>
          오전 08:27
        </Text>
        <Text fontSize={'sm'} color={'dark.100'} textAlign={'center'} flex={1}>
          오전 11:33
        </Text>
      </Box>
      <Divider my={4} color={'dark.100'} />
    </Box>
  );
};

export default AttendanceInfo;
