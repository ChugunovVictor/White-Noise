import { Component } from '@angular/core';

class Noise {
  static audioContext = new window.AudioContext;
  static fadeOutTimer: any;

  // https://noisehack.com/generate-noise-web-audio-api/
  static createNoise(track: any) {

    const bufferSize = 2 * Noise.audioContext.sampleRate;
    const noiseBuffer = Noise.audioContext.createBuffer(1, bufferSize, Noise.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    track.audioSource.buffer = noiseBuffer;
  }

  static stopNoise(track: any) {
    if (track.audioSource) {
      clearTimeout(Noise.fadeOutTimer);
      track.audioSource.stop();
    }
  }

  static fadeNoise(track: any) {

    if (track.fadeOut) {
      track.fadeOut = (track.fadeOut >= 0) ? track.fadeOut : 0.5;
    } else {
      track.fadeOut = 0.5;
    }

    if (track.canFade) {
      track.gainNode.gain.linearRampToValueAtTime(0, Noise.audioContext.currentTime + track.fadeOut);
      track.canFade = false;

      Noise.fadeOutTimer = setTimeout(() => {
        Noise.stopNoise(track);
      }, track.fadeOut * 1000);

    } else {
      Noise.stopNoise(track);
    }
  }

  static buildTrack(track: any) {
    track.audioSource = Noise.audioContext.createBufferSource();
    track.gainNode = Noise.audioContext.createGain();
    track.audioSource.connect(track.gainNode);
    track.gainNode.connect(Noise.audioContext.destination);
    track.canFade = true; // used to prevent fadeOut firing twice
  }

  static setGain(track: any) {

    track.volume = (track.volume >= 0) ? track.volume : 0.5;

    if (track.fadeIn) {
      track.fadeIn = (track.fadeIn >= 0) ? track.fadeIn : 0.5;
    } else {
      track.fadeIn = 0.5;
    }

    track.gainNode.gain.setValueAtTime(0, Noise.audioContext.currentTime);

    track.gainNode.gain.linearRampToValueAtTime(track.volume / 4, Noise.audioContext.currentTime + track.fadeIn / 2);

    track.gainNode.gain.linearRampToValueAtTime(track.volume, Noise.audioContext.currentTime + track.fadeIn);

  }

  static playNoise(track: any) {
    Noise.stopNoise(track);
    Noise.buildTrack(track);
    Noise.createNoise(track);
    Noise.setGain(track);
    track.audioSource.loop = true;
    track.audioSource.start();
  }
}

var noise = {
  volume: 0.05, // 0 - 1
  fadeIn: 2.5, // time in seconds
  fadeOut: 1.3, // time in seconds
}


@Component({
  selector: 'app-root',
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" (click)="perform()">
    <rect *ngIf="play; else elseBlock" fill="#000000" x="2" y="2" width="6" height="6"></rect>  
    <ng-template #elseBlock>
      <path fill="#000000" d="M 2,2 L 8,5 2,8 Z"></path>
    </ng-template>
  </svg>
  `,
  styles: []
})
export class AppComponent {
  title = 'White Noise';

  play = false

  perform() {
    if (this.play) {
      Noise.stopNoise(noise)
    } else {
      Noise.playNoise(noise)
    }
    this.play = !this.play;
  }
}
