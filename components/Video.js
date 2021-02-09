import { ScrollView, StyleSheet } from 'react-native'
import { Video } from 'expo-av'
import React from 'react'
import VideoPlayer from 'expo-video-player'

const App = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    
    <VideoPlayer
      videoProps={{
        shouldPlay: true,
        resizeMode: Video.RESIZE_MODE_CONTAIN,
        source: {
          uri: 'https://firebasestorage.googleapis.com/v0/b/aulapdm2020-8da7d.appspot.com/o/xanxere.mp4?alt=media&token=a4f14e96-6876-4225-81e2-c87af3f0a484',
        },
      }}
      inFullscreen={true}
    />
  </ScrollView>
)
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
