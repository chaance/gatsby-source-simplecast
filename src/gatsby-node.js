const createNodeHelpers = require('gatsby-node-helpers').default;
const Simplecast = require('./lib/Simplecast');
const { createNodeFactory } = createNodeHelpers({ typePrefix: `Simplecast` });
const PodcastEpisodeNode = createNodeFactory('PodcastEpisode', node => {
  return node;
});
const PodcastEpisodePageNode = createNodeFactory('PodcastEpisodePage', node => {
  return node;
});

const PLUGIN_NAME = 'gatsby-source-simplecast';
const DEFAULTS = {
  fetchLimit: 99
};

exports.sourceNodes = async (
  { actions: { createNode, setPluginStatus } },
  { token, podcastId, fetchLimit = DEFAULTS.fetchLimit }
) => {
  const errorAboutGatsbyPlugins =
    'To learn more about configuring Gatsby plugins, visit at https://www.gatsbyjs.org/docs/using-a-plugin-in-your-site/.';
  const errorAboutSimplecastAuth =
    'To learn more about Simplecast authentication, visit https://help.simplecast.com/en/articles/2724796-simplecast-2-0-api.';
  const errorAboutPodcastId = `To get your podcast ID, login to Simplecast, click 'Show Settings' from your account dashboard.`;

  if (!token)
    throw new Error(
      `It looks like you forgot your Simplecast Auth token! Make sure to pass your token into '${PLUGIN_NAME}' options in 'gatsby-config.js'. \n${errorAboutSimplecastAuth} \n${errorAboutGatsbyPlugins}`
    );
  if (!podcastId)
    throw new Error(
      `It looks like you forgot your Simplecast Podcast ID! Make sure to pass the ID into '${PLUGIN_NAME}' options in 'gatsby-config.js'. \n${errorAboutPodcastId} \n${errorAboutGatsbyPlugins}`
    );

  try {
    const sc = new Simplecast({ token, podcastId });
    const episodes = await sc.getEpisodes(fetchLimit);

    const episodesPageIds = episodes.map(episode => episode.id)
    const episodePages = await Promise.all(episodesPageIds.map(pageId => sc.getEpisode(pageId)))


    episodes
      .map(episode => PodcastEpisodeNode(episode))
      .forEach(node => createNode(node));

    episodePages
      .map(episodePage => PodcastEpisodePageNode(episodePage))
      .forEach(node => createNode(node))

    setPluginStatus({ lastFetched: Date.now() });
  } catch (err) {
    console.error('FAIL:', err);
  }
};
