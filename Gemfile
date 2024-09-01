source "https://rubygems.org"

# Install all gh-pages allowed gems. (full list: https://pages.github.com/versions/)
gem "github-pages"

# WEBrick is an HTTP server toolkit that can be configured as an HTTPS server
gem "webrick"

# Plugins of this site loaded only if configured correctly.
gem "wdm", "~> 0.1.0" if Gem.win_platform?  # Windows Directory Monitor (WDM) 

# Gems loaded irrespective of site configuration.
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-paginate"
  gem "jekyll-seo-tag"  # Add metadata for search engines and social networks
  gem "jekyll-sitemap"
end
