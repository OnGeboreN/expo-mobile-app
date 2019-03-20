import React from 'react'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class FeedPage extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.location.key !== nextProps.location.key) {
            this.props.feedQuery.refetch()
        }
    }

    render() {
        if (this.props.feedQuery.loading) {
            return (
                <div className="flex w-100 h-100 items-center justify-center pt7">
                    <div>Loading ...</div>
                </div>
            )
        }

        return (
            <React.Fragment>
                <h1>Feed</h1>
                {this.props.feedQuery.feed &&
                this.props.feedQuery.feed.map(hotel => (
                    <Hotel
                        key={hotel.id}
                        hotel={hotel}
                        refresh={() => this.props.feedQuery.refetch()}
                    />
                ))}
                {this.props.children}
            </React.Fragment>
        )
    }
}

const FEED_QUERY = gql`
  query {
    hotels {
      id
      name
      phone
      photos {
        url
      }
    }
  }
`;

export default graphql(FEED_QUERY, {
    name: 'feedQuery',
    options: {
        fetchPolicy: 'network-only',
    },
})(FeedPage)
