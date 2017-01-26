import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index-aleluya');
  this.route('aboutus-aleluya');
  this.route('ourneeds-aleluya');
  this.route('blog-aleluya');
  this.route('media-aleluya');
});

export default Router;
