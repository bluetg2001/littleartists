import React from 'react';
// native-base
import {Box, Text, Divider} from 'native-base';

const AttendanceInfo = props => {
  const {arrivedAt, leftAt, date} = props;

  return (
    <Box>
      <Box flexDirection={'row'}>
        <Text fontSize={'sm'} color={'dark.100'} textAlign={'center'} flex={1}>
          {/* 2022-02-01 */}
          {date}
        </Text>
        {arrivedAt === '' ? (
          <Text
            fontSize={'sm'}
            color={'dark.100'}
            textAlign={'center'}
            flex={1}>
            미입력
          </Text>
        ) : (
          <Text
            fontSize={'sm'}
            color={'dark.100'}
            textAlign={'center'}
            flex={1}>
            {arrivedAt}
          </Text>
        )}

        {leftAt === '' ? (
          <Text
            fontSize={'sm'}
            color={'dark.100'}
            textAlign={'center'}
            flex={1}>
            {/* 오전 08:27 */}
            미입력
          </Text>
        ) : (
          <Text
            fontSize={'sm'}
            color={'dark.100'}
            textAlign={'center'}
            flex={1}>
            {/* 오전 08:27 */}
            {leftAt}
          </Text>
        )}
      </Box>
      <Divider my={4} color={'dark.100'} />
    </Box>
  );
};

export default AttendanceInfo;
