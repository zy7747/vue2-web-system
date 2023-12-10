var speech = new SpeechSynthesisUtterance();

// 播放
export function speak(text) {
  speech.pitch = 21; // 获取并设置话语的音调(值越大越尖锐,越低越低沉)
  speech.rate = 1.5; // 获取并设置说话的速度(值越大语速越快,越小语速越慢)
  //   speech.voice = 10; // 获取并设置说话的声音
  // speech.volume = 1 // 获取并设置说话的音量
  speech.lang = speechSynthesis.getVoices()[0]; // 设置播放语言，测试没效果
  // speech.cancel() // 删除队列中所有的语音.如果正在播放,则直接停止
  speech.text = text; // 获取并设置说话时的文本
  speechSynthesis.speak(speech);
}

//暂停
export function pause() {
  speechSynthesis.pause();
}

// 继续播放
export function resume() {
  speechSynthesis.resume();
}

// 取消播放
export function cancel() {
  speechSynthesis.cancel();
}
