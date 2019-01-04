module.exports = {
  siteMetadata: {
    title: "CjK's SmartHome App",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'cjk-smart-home-app',
        short_name: 'smt-home-app',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/smarthome-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-remove-serviceworker',
    `gatsby-plugin-flow`,
  ],
}
