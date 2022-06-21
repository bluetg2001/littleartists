import React from 'react';
// native-base
import {VStack, ScrollView, Text, Box} from 'native-base';
// renderHtml
import RenderHtml from 'react-native-render-html';
import WebView from 'react-native-webview';
import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
// react-native components
import {useWindowDimensions} from 'react-native';
// web view style
import {boardsTagsStyles} from '../../utils/boardsTagsStyles';

function NoticeDetail({route}) {
  const {width} = useWindowDimensions();
  const title = route.params.title;
  const contents = route.params.contents;

  const newContents = contents.replace(/<img>/gi, '');

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };

  const source = {
    html: `
      ${newContents}
    `,
  };

  return (
    <VStack bgColor={'white'} alignItems="center" flex={1}>
      <VStack width="90%" flex={1}>
        <Box flex={1}>
          <Text
            mt={8}
            textAlign="left"
            color="dark.50"
            fontSize="lg"
            fontWeight="semibold">
            {title}
          </Text>
          {/* <Text mt={4} color="dark.100" textAlign="right">
            3시간 전
          </Text> */}
        </Box>
        <Box flex={5}>
          <ScrollView>
            <RenderHtml
              tagsStyles={boardsTagsStyles}
              renderers={renderers}
              WebView={WebView}
              // classesStyles={tagStyles}
              customHTMLElementModels={customHTMLElementModels}
              source={source}
              contentWidth={width}
              renderersProps={{
                iframe: {
                  scalesPageToFit: true,
                  webViewProps: {
                    /* Any prop you want to pass to iframe WebViews */
                  },
                },
              }}
            />
          </ScrollView>
        </Box>
      </VStack>
    </VStack>
  );
}

export default NoticeDetail;
