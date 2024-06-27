<template>
  <div style="display: flex;align-items: center;justify-content: center;flex-direction: column; width: 95%;">
    <video id="videoPlayer" controls>
      <source src="@/ai-center/video/a.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div id="videoControls">
      <button class="videoButton" @click="changeVideo('src/ai-center/video/a.mp4')">监控一</button>
      <button class="videoButton" @click="changeVideo('src/ai-center/video/b.mp4')">监控二</button>
      <button class="videoButton" @click="changeVideo('src/ai-center/video/c.mp4')">监控三</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeVideo(videoFile) {
      const videoPlayer = document.getElementById('videoPlayer');
      videoPlayer.src = videoFile;
      videoPlayer.load();
      videoPlayer.play();
    }
  }
}
</script>

<style scoped>
#videoPlayer {
    width: 98%;
    height: 90%;
}

#videoControls{
  width: 98%;
  height: 8%;
}

.videoButton {
    height: 100%;
    width: 70px;
    margin-right: 10px;
    border: none;
    background-color: transparent;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.videoButton:hover {
    background-color: #1a8bc2
}
</style>