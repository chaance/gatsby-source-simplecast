<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby icon" src="https://www.gatsbyjs.org/monogram.svg" height="60" />
  </a>
  <img aria-hidden="true" src="https://res.cloudinary.com/chancedigital/image/upload/c_scale,h_150/v1559751463/hrt.png" alt="heart icon" height="60">
  <a href="https://www.gatsbyjs.org">
    <img alt="Simplecast icon" src="icon.svg" width="60" height="60" />
  </a>
</p>

<h1 align="center">
  gatsby-source-simplecast
</h1>

A Gatsby plugin to load podcast episodes from the [Simplecast API](https://help.simplecast.com/en/articles/2724796-simplecast-2-0-api).

## Installation

```bash
$ npm i gatsby-source-simplecast
```

OR

```bash
$ yarn add gatsby-source-simplecast
```

## Usage

In your `gatsby-config.js` file, load in the plugin along with the parameters of which podcast episodes to load:

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-simplecast',
      options: {
        // You will need to generate an access token and get the podcast ID from your account
        // https://help.simplecast.com/en/articles/2724796-simplecast-2-0-api
        token: 'abcdefghijklmnopqrstuvwxyz1234567890',
        // The podcast ID can be found in the URL from your podcast episode settings.
        podcastId: 'abc123de-456f-gh78-90ij-klmn1234opqr',
      },
    },
  ],
};
```

In your page, construct a query to get the data you need from the API.

```js
import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';

// Data from the pageQuery below is available as props to your page component!
const PodcastPage = ({
  data: {
    allSimplecastPodcastEpisode: { edges: episodes },
  },
}) => {
  return (
    <Layout>
      <h1>My Podcast Episodes</h1>
      <ul>
        {episodes.map(({ node }) => (
          <li key={node.id}>
            <article>
              <h2>{node.title}</h2>
              <p>Published {node.published_at}</p>
              <hr />
              <p>{node.description}</p>
              <a href={`/podcasts/${node.slug}`}>Listen</a>
              <a href={node.enclosure_url}>Download</a>
            </article>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const pageQuery = graphql`
  query HomePageQuery {
    allSimplecastPodcastEpisode {
      edges {
        node {
          id
          slug
          enclosure_url
          number
          published_at(formatString: "MMMM D, Y")
          title
          description
        }
      }
    }
  }
`;

export default PodcastPage;
```
