import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

/* `VideoBlot` is class that extend `BlockEmbed` and is used to create a video
 element in the editor */
export class VideoBlot extends BlockEmbed {
  static create(value: any) {
    const node = super.create('video')
    node.setAttribute('src', value.url)
    node.setAttribute('controls', value.controls)
    node.setAttribute('width', value.width)
    node.setAttribute('height', value.height)
    node.setAttribute('webkit-playsinline', true)
    node.setAttribute('playsinline', true)
    node.setAttribute('x5-playsinline', true)
    return node
  }

  static value(node: any) {
    return {
      url: node.getAttribute('src'),
      controls: node.getAttribute('controls'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height'),
    }
  }
}

VideoBlot.blotName = 'video'
VideoBlot.tagName = 'video'

/* `AudioBlot` is class that extend `BlockEmbed` and is used to create a 
audio element in the editor */
export class AudioBlot extends BlockEmbed {
  static create(value: any) {
    const node = super.create('audio')
    node.setAttribute('src', value.url)
    node.setAttribute('controls', value.controls)
    node.setAttribute('width', value.width)
    node.setAttribute('height', value.height)
    node.setAttribute('webkit-playsinline', true)
    node.setAttribute('playsinline', true)
    node.setAttribute('x5-playsinline', true)
    return node
  }

  static value(node: any) {
    return {
      url: node.getAttribute('src'),
      controls: node.getAttribute('controls'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height'),
    }
  }
}

AudioBlot.blotName = 'audio'
AudioBlot.tagName = 'audio'

Quill.register(VideoBlot)
Quill.register(AudioBlot)
