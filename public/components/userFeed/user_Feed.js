import React from 'react';
import axios from 'axios';
import SocialMediaFeed from './socialMediaFeed.js';
import { Timeline } from 'react-twitter-widgets';
// import ParklandsUserFeed from './parklandsUserFeed.js';
import Post from './../userTimeline/post.js';

export default class UserFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allFeed: []
    };
  }

  componentWillMount() {
    var context = this;
    axios.get('/api/userfeed')
    .then(function (res) {
      context.setState({
        allFeed: res.data
      });
      // console.log('res from userFeed is ', context.state.allFeed);
    });
  }

  convertDate(date) {
    var converted = new Date(date).toString();
    return converted.slice(4, 10) + ', ' + converted.slice(11, 16);
  }

  render () {
    return (
      <div id="user-feed-container">
        <div id="social-media-feed">
        <Timeline 
        dataSource={{
          sourceType: 'list',
          ownerScreenName: 'jackieNPS',
          slug: 'National-Parks'
        }}
        options={{
          username: 'jackieNPS',
          height: '800'
        }}
        onLoad={() => console.log('Timeline is loaded!')}
        />
        </div>
        {/*<ParklandsUserFeed
          allFeed={context.state.allFeed}
        />*/}
        <div id="all-feed">
          {
            this.state.allFeed.map(feed =>
              <Post
                key={feed.id}
                photoData={feed.filePath}
                datePosted={this.convertDate(feed.createdAt)}
              />
            )
          }
        </div>
      </div>
    );
  }
}
