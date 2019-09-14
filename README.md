<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby icon" src="https://www.gatsbyjs.org/monogram.svg" height="60" />
  </a>
  <img aria-hidden="true" src="https://res.cloudinary.com/chancedigital/image/upload/c_scale,h_150/v1559751463/hrt.png" alt="heart icon" height="60">
  <a href="https://www.gatsbyjs.org">
    <img alt="Simplecast icon" src="https://svgshare.com/i/Exk.svg" width="60" height="60" />
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
        token: 'abcdefghijklmnopqrstuvwxyz1234567890',
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
              <h2>
                Episode {node.number}: {node.title}
              </h2>
              <p>Published {node.publishedAt}</p>
              <hr />
              <p>{node.description}</p>
              <a href={`/podcasts/${node.slug}`}>Listen</a>
              <a href={node.enclosureUrl}>Download</a>
            </article>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const pageQuery = graphql`
  query PodcastPageQuery {
    allSimplecastPodcastEpisode {
      edges {
        node {
          id
          slug
          enclosureUrl
          number
          publishedAt(formatString: "MMMM D, Y")
          title
          description
        }
      }
    }
  }
`;

export default PodcastPage;
```

### Options API

| Option     | Type                | Description                                                                                                                                    | Default |
| :--------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| token      | `string` (required) | Simplecast API key. See the [Simplecast API documentation](https://help.simplecast.com/en/articles/2724796-simplecast-2-0-api) for details.    |         |
| podcastId  | `string` (required) | The ID of the podcast you want to fetch. The podcast ID can be found in the URL from your Simplecast dashboard under podcast episode settings. |         |
| fetchLimit | `number`            | The maximum number of episodes retrieved.                                                                                                      | `99`    |
