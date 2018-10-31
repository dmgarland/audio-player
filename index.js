import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      audioCurrentTime: 0,
      currentTrack: null,
    };

    this.trackListings = [
      'http://www.noiseaddicts.com/samples_1w72b820/50.mp3',
      'http://www.noiseaddicts.com/samples_1w72b820/51.mp3',
      'http://www.noiseaddicts.com/samples_1w72b820/52.mp3',
      'http://www.noiseaddicts.com/samples_1w72b820/53.mp3',
      'http://www.noiseaddicts.com/samples_1w72b820/54.mp3',
      'http://www.noiseaddicts.com/samples_1w72b820/55.mp3',
      'http://www.noiseaddicts.com/samples_1w72b820/56.mp3',
      'http://www.noiseaddicts.com/samples_1w72b820/57.mp3',
      'http://www.noiseaddicts.com/samples_1w72b820/58.mp3',
      'http://www.noiseaddicts.com/samples_1w72b820/59.mp3',
      'http://www.noiseaddicts.com/samples_1w72b820/60.mp3',
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    nextState.audioCurrentTime !== this.state.audioCurrentTime;
  }

  componentDidMount() {
    this.audioPlayer = document.querySelector('.audio-player');

    this.audioPlayer.addEventListener('timeupdate', () => {
      this.setState({ audioCurrentTime: this.audioPlayer.currentTime });
    })
  }

  createTrackListing = () => {
    const trackListings = [];

    for (let i = 0; i <= this.trackListings.length - 1; i++) {
      trackListings.push(
        <ul>
          <li key={"track-"+i}>
            <button
              onClick={() => {
                this.setState({ currentTrack: this.trackListings[i] })
                this.audioPlayer.src=this.trackListings[i];
              }}
            >
              #{(i + 1)}: select track
            </button>
          </li>
        </ul>
      )
    }

    return trackListings;
  }

  render() {
    return (
      <div className="App">
        <h1>Awesome Audio App 🎧</h1>
        <p>
          Audio is {(this.state.isPlaying && 'playing') || 'paused'}:{' '}
          {this.state.currentTrack}
        </p>
        <p>{this.state.audioCurrentTime}</p>
        <button
          onClick={() => {
            this.audioPlayer.play()
            console.info('audio playing')
            this.setState({
              isPlaying: true
            })
          }}
        >
          Play
        </button>
        <button
          onClick={() => {
            this.audioPlayer.pause()
            console.info('audio paused')
            this.setState({
              isPlaying: false
            })
          }}
        >
          Pause
        </button>
        <div>
          <h3>Track Listings:</h3>

          {this.createTrackListing()}
        </div>
        <audio className="audio-player" src="" />
      </div>
    )
  }
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
