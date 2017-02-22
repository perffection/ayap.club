"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ayap/app', ['exports', 'ember', 'ayap/resolver', 'ember-load-initializers', 'ayap/config/environment'], function (exports, _ember, _ayapResolver, _emberLoadInitializers, _ayapConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _ayapConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ayapConfigEnvironment['default'].podModulePrefix,
    Resolver: _ayapResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _ayapConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ayap/helpers/app-version', ['exports', 'ember', 'ayap/config/environment'], function (exports, _ember, _ayapConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _ayapConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('ayap/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ayap/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ayap/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ayap/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _ayapConfigEnvironment) {
  var _config$APP = _ayapConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('ayap/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ayap/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ayap/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ayap/initializers/export-application-global', ['exports', 'ember', 'ayap/config/environment'], function (exports, _ember, _ayapConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_ayapConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _ayapConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_ayapConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ayap/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ayap/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ayap/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("ayap/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ayap/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ayap/router', ['exports', 'ember', 'ayap/config/environment'], function (exports, _ember, _ayapConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _ayapConfigEnvironment['default'].locationType,
    rootURL: _ayapConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('index-aleluya');
    this.route('aboutus-aleluya');
    this.route('ourneeds-aleluya');
    this.route('blog-aleluya');
    this.route('media-aleluya');
  });

  exports['default'] = Router;
});
define('ayap/routes/aboutus-aleluya', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ayap/routes/blog-aleluya', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ayap/routes/index-aleluya', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ayap/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this._super.apply(this, arguments);
      this.replaceWith('index-aleluya');
    }
  });
});
//Hallelujah
define('ayap/routes/media-aleluya', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ayap/routes/ourneeds-aleluya', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ayap/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("ayap/templates/aboutus-aleluya", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kljcFq+G", "block": "{\"statements\":[[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"post\"],[\"static-attr\",\"class\",\"wrapper\"],[\"static-attr\",\"data-bg\",\"banner2.jpg\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inner\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"box\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"How Did AYAP Begin?\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"updated: 12.02.2017\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"We happened to create the association on December 4th, 2015 as everyone knows that Haiti is a poor country. Most of people have many problems (economic, housing, clothing, food and water). When the Earthquake came in Haiti, there were many broken homes. There are many events that passed before this too, such as hurricanes that destroyed many of the crops. My staff and I decided to start this organization in hopes of helping people who are in physical, emotional and spiritual needs. Since the earthquake we have known to help people though we have always had projects for such an association. In spite of all difficulties we have met in our way, we do not give up because our mission is to help people who are in these deep needs such as kids who cannot eat. We see the organization is on the way to success by the grace of God, and we believe with God all will be okay. \"],[\"comment\",\" praise Jesus Christ \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n\\n    \"],[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"box\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"What do We Hope to do in the Lord and How?\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"updated: 16.02.2017\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"We hope to build a church to praise God and give him glory which He is worthy of all the Glory, for people particularly children can come to know about Jesus Christ, and to accept Him as their Savior and the Lord. Woodly: I know God will provide the organization though I must be patient. God will never give me up cause I do great things. He sees that i have compassion for people who are in needs, and try to help them with all of my heart. God will grow my organization to keep doing more for them..Hallelujah,Amen..you are Almighty God..\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Our Plans include:\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Our plan are to have our own local to make kids that we help live better in the way we want to teach them and for the elderly\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"every fourthnight we want to pass to put products in their homes like this it will make them live better.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"AYAP would like to have school to educate the kids where education is one of the most important thing in a country.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Church to let the kids know how important God is in everyone's life\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"A clinic to take care of them when they are sick.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"We have thirty kids to take care and eighteen elderly from sixteen to X....\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\\n    \"],[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"box\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Our Team- Hallelujah\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Updated 2017-01-28\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n      \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"name\",\"team-aleluya\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"static-attr\",\"style\",\"background:#353535;padding:8px;border-radius:3px;\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#woodly-aleluya\"],[\"flush-element\"],[\"text\",\"Woodly Baptiste\"],[\"close-element\"],[\"text\",\": Co-Founder +50931975109\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#rilphene-aleluya\"],[\"flush-element\"],[\"text\",\"Rilphene pierretil\"],[\"close-element\"],[\"text\",\": Assistant Co-Founder +50942346186\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#angeline-aleluya\"],[\"flush-element\"],[\"text\",\"Angeline Osias\"],[\"close-element\"],[\"text\",\": Treasurer +50944911085\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#chelove-aleluya\"],[\"flush-element\"],[\"text\",\"Chelove Pierretil\"],[\"close-element\"],[\"text\",\": Administrator +50934124647\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#youri-aleluya\"],[\"flush-element\"],[\"text\",\"Youri Augustin\"],[\"close-element\"],[\"text\",\": Assistant Administrator +50946285047 \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#wandy-aleluya\"],[\"flush-element\"],[\"text\",\"Wandy Baptiste\"],[\"close-element\"],[\"text\",\": Counsellor Leader +50936769722\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#junior-aleluya\"],[\"flush-element\"],[\"text\",\"Junior Buthon\"],[\"close-element\"],[\"text\",\": Counsellor. +50931668473\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n              \\n            \\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"name\",\"woodly-aleluya\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Woodly Baptiste - Cofounder: \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"mailto:woodly@ayap.club\"],[\"flush-element\"],[\"text\",\"woodly@ayap.club\"],[\"close-element\"],[\"text\",\" +50931975109 \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"style\",\"margin-top:-8px\"],[\"flush-element\"],[\"open-element\",\"b\",[]],[\"flush-element\"],[\"text\",\"Matthew 5:16\\nIn the same way your light must shine before people,so that they will see the good things you do and praise your father in heaven\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\nMr Woodly Baptiste was born on may 2,1997 in Nazon. He grew up in a christian family and his grandfather was a pastor. He used to sing in the church, he says he loves God with  all of his heart and he loves to talk to people about God. He had a passion of helping people since he was at school and he likes to share with kids who did not have enough resources in the school where he was. He likes to play soccer with children. God calls him as a helper. His plan is to take people to repentence. His parents moved in Titanyen, which is where he is creating the organization.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"name\",\"angeline-aleluya\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"teammember-aleluya\"],[\"static-attr\",\"src\",\"/imgAleluya/teamAleluya/angeline-aleluya.jpg\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Mrs Angeline Osias - Treasurer: \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"mailto:angeline@ayap.club\"],[\"flush-element\"],[\"text\",\"angeline@ayap.club\"],[\"close-element\"],[\"text\",\" +50944911085 \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"style\",\"margin-top:-8px\"],[\"flush-element\"],[\"open-element\",\"b\",[]],[\"flush-element\"],[\"text\",\"Ephesians1:3 let us give thanks to God and Father our Lord Jesus Christ! For in our union with christ he has blessed us by giving us every spiritual blessing in the heavenly world.\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\nMrs. Angeline Osias was born July 23,1977 in Marchand Dessalines. She grew up in a Christian family and her father was a pastor and she has participated in the gospel group. She moved to port-au-prince where she has kept up this practice. She is a brave woman who believes in God and cares for people. She never get discouraged. Her parents had six children, though two of them died. She like reading the Bible and talking to people about how God is exciting to serve. She did not finish high school but she is very intelligent.\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"open-element\",\"b\",[]],[\"flush-element\"],[\"text\",\"Woodly Baptiste\"],[\"close-element\"],[\"text\",\"\\nI'm so glad to write under Mrs Angeline. Angeline believes in work, and she has great potential in the Lord. Her ways amaze me, she is very serious, i'm happy to call her into my organization and she is a very sensible individual to everyone.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"clear:both\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"name\",\"wandy-aleluya\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"teammember-aleluya\"],[\"static-attr\",\"src\",\"/imgAleluya/teamAleluya/wandy-aleluya.jpg\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Wandy Baptiste - Counsellor Leader: \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"mailto:wandy@ayap.club\"],[\"flush-element\"],[\"text\",\"wandy@ayap.club\"],[\"close-element\"],[\"text\",\" +50936769722\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"style\",\"margin-top:-8px\"],[\"flush-element\"],[\"open-element\",\"b\",[]],[\"flush-element\"],[\"text\",\"Ephesians 1:3 let us give thanks to God and Father our Lord Jesus Christ! For in our union with christ he has blessed us by giving us every spiritual blessing in the heavenly world.\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n \\nI was born on June 16,1974. I did not grow up in a Christian family but i had a passion for children and for God. After my father died, i decided to accept Christ as my Savior. I became a new man, because Jesus washes my sins away. I see the situation of some people and I decided to help any way i could. Mr Woodly called me and he said: \\\"Do you agree to be part of AYAP?\\\" I said yes cause i saw In Woodly a lot of good things and I thank God for that. I think AYAP will move forward because the staff does a lot for people with a pure heart.\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"clear:both\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"name\",\"youri-aleluya\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Youri Augustin - Assistant Administrator: \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"mailto:youri@ayap.club\"],[\"flush-element\"],[\"text\",\"youri@ayap.club\"],[\"close-element\"],[\"text\",\" +50946285047\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"style\",\"margin-top:-8px\"],[\"flush-element\"],[\"open-element\",\"b\",[]],[\"flush-element\"],[\"text\",\"1 John 3:13: Do not be surprised, brothers, that the world hates you. -esv\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\nI'm Youri Augustin, I was born on September 1991, in Thomassique. I grew up in a Christian family, and i began to sing in in the Choir when i was 13 years old. My dream is to help people who haven't an opportunity to live: kids in the street, those who can't to go to school, eat, even elderly who live in bad situation. I thank to God cause i start to realize and thanks to Him once again for wisdom and love He puts in my heart. I feel happy because i'm part of AYAP and God will bless us to keep the work together.\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"name\",\"junior-aleluya\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Junior Buthon - Counsellor: \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"mailto:youri@ayap.club\"],[\"flush-element\"],[\"text\",\"youri@ayap.club\"],[\"close-element\"],[\"text\",\" :+50931668473\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"style\",\"margin-top:-8px\"],[\"flush-element\"],[\"comment\",\"<b style=\\\"font-size:12px\\\">1John 3:13 .</b><br/>\"],[\"text\",\"\\n\\n\\n\\nI was born on October 5,1994. I grew up in a Christian family and my mother died when i was 17 years old. I was happy when Mr Woodly called into the organization and Mr Woodly is a brave man, he shows caring in all he does. He love kids. I believe together we will be able to fight against poverty.\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"name\",\"chelove-aleluya\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Chelove Pierretil- Adminisrator: \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"mailto:chelove@ayap.club\"],[\"flush-element\"],[\"text\",\"chelove@ayap.club\"],[\"close-element\"],[\"text\",\" +50934124647\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"style\",\"margin-top:-8px\"],[\"flush-element\"],[\"open-element\",\"b\",[]],[\"flush-element\"],[\"text\",\"2 Corinthians 9:6 Remember that person who plants few seeds,will have a small crop.the one who plants many seeds will have a large crop.\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\nI grew up in a Christian family, my father was a pastor at Baptiste Maranatha church in Gonaives. I liked music when i was 12 years old. and I made my first song tittled: \\\"love for kids\\\" because i had a passion for children. I stopped because of my high school studies and i'm glad to be part of AYAP to keep on doing the good work that is to help unfortunate people.\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"name\",\"rilphene-aleluya\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Rilphene Pierretil - Assistant Co-Founder: \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"mailto:rilphene@ayap.club\"],[\"flush-element\"],[\"text\",\"rilphene@ayap.club\"],[\"close-element\"],[\"text\",\" +50942346186\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"style\",\"margin-top:-8px\"],[\"flush-element\"],[\"open-element\",\"b\",[]],[\"flush-element\"],[\"text\",\"Proverbs 19:17 when you give to the poor,it's like lending to the Lord,and the Lord will pay you back\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\nI'm Rilphene Pierretil,born on March 13,1983 in Artibonite, Gonaives city. I was born in a Christian family as well as my parents but i did not understand well sense of God words. On January 12,2010 I learned a great lesson through the Bible. I happened to understand that God is the king of kings through a catastrophe that killed more than 8 thousands people. If my family and I are alive, it's thanks to God. It's there i would go to help people who were unable because after this catastrophe, most of them slept in the street. There even some who couldn't eat because of lack of opportunity. My mind was upset about it. I shared with people who were next to me because i didn't have much to go around to help with, but today i'm part of AYAP and the staff who have the same aims. We think the work will move forward more and it will please God. \"],[\"comment\",\" in Jesus name \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"footer\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"actions\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"button alt icon fa-chevron-left\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Previous\"],[\"close-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"button alt icon fa-chevron-right\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Next\"],[\"close-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"box\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"How is the website developed?\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"01.01.2017\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n          The website front end is open source and available at \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/perffection/ayap.club\"],[\"flush-element\"],[\"text\",\"https://github.com/perffection/ayap.club\"],[\"close-element\"],[\"text\",\" if you have changes feel free to fork the project.\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n          The front end is using \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://emberjs.com\"],[\"flush-element\"],[\"text\",\"EmberJS\"],[\"close-element\"],[\"text\",\" and based off a template from \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://templated.co\"],[\"flush-element\"],[\"text\",\"Templated\"],[\"close-element\"],[\"text\",\" the backend api is built using \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://phoenixframework.org\"],[\"flush-element\"],[\"text\",\"Phoenix/Elixir\"],[\"close-element\"],[\"text\",\". It is deployed automatically to a plesk server provided in Jesus name. \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ayap/templates/aboutus-aleluya.hbs" } });
});
define("ayap/templates/blog-aleluya", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "OQPqZU7b", "block": "{\"statements\":[[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Blog Page\"],[\"close-element\"],[\"text\",\"\\nComing soon God willing...\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ayap/templates/blog-aleluya.hbs" } });
});
define("ayap/templates/index-aleluya", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ivlBNgv9", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"comment\",\" Banner \"],[\"text\",\"\\n    \"],[\"comment\",\"\\n      Note: To show a background image, set the \\\"data-bg\\\" attribute below\\n      to the full filename of your image. This is used in each section to set\\n      the background image.\\n    \"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"banner\"],[\"static-attr\",\"class\",\"bg-img\"],[\"static-attr\",\"data-bg\",\"banner.jpg\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inner\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"AYAP\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" in Jesus name\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Association of Young Against Poverty\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#one\"],[\"static-attr\",\"class\",\"more\"],[\"flush-element\"],[\"text\",\"Learn More\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"comment\",\" One \"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"one\"],[\"static-attr\",\"class\",\"wrapper post bg-img\"],[\"static-attr\",\"data-bg\",\"banner2.jpg\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inner\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"box\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"How Did AYAP Begin?\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"updated: 12.02.2017\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"We happened to create the association on December 4th, 2015 as everyone knows that Haiti is a poor country. Most of people have many problems (economic, housing, clothing, food and water). When the Earthquake came in Haiti, there were many broken homes. There are many events that passed before this too, such as hurricanes that destroyed many of the crops. My staff and I decided to start this organization in hopes of helping people who are in physical, emotional and spiritual needs. Since the earthquake we have known to help people though we have always had projects for such an association. In spite of all difficulties we have met in our way, we do not give up because our mission is to help people who are in these deep needs such as kids who cannot eat. We see the organization is on the way to success by the grace of God, and we believe with God all will be okay. \"],[\"comment\",\" praise Jesus Christ \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"footer\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/aboutus-aleluya\"],[\"static-attr\",\"class\",\"button alt\"],[\"flush-element\"],[\"text\",\"Learn More\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#two\"],[\"static-attr\",\"class\",\"more\"],[\"flush-element\"],[\"text\",\"Learn More\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"name\",\"#our-needs-aleluya\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"comment\",\" Two \"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"two\"],[\"static-attr\",\"class\",\"wrapper post bg-img\"],[\"static-attr\",\"data-bg\",\"banner5.jpg\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inner\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"box\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Needs and Plans\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"16.02.2017\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"static-attr\",\"align\",\"left\"],[\"flush-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"We need food first to feed kids and the elderly\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"clothes\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Hygiene Products: Soap, Toothpaste, Toothbrushes.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"A car to deliver the things to them, though we have an old motorcycle when we are going to deliver things.it can't take much and two of us can't go on it.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Our plan are to have our own local to make kids that we help live better in the way we want to teach them and for the elderly\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"every fourthnight we want to pass to put products in their homes like this it will make them live better.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"AYAP would like to have school to educate the kids where education is one of the most important thing in a country.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Church to let the kids know how important God is in everyone's life\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"A clinic to take care of them when they are sick.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"We have thirty kids to take care and eighteen elderly from sixteen to X....\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"We are currently raising funds through \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://www.gofundme.com/assistance-for-titanyenhaiti-kids\"],[\"flush-element\"],[\"text\",\"our Gofundme fundraiser\"],[\"close-element\"],[\"text\",\" and plan to work with a certified 503c ministry such as \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://thecrosslovesyou.org\"],[\"flush-element\"],[\"text\",\"The Cross Loves you\"],[\"close-element\"],[\"text\",\" which is working on this God willing and if we live in Jesus name. \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"footer\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/ourneeds-aleluya\"],[\"static-attr\",\"class\",\"button alt\"],[\"flush-element\"],[\"text\",\"Learn More\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#three\"],[\"static-attr\",\"class\",\"more\"],[\"flush-element\"],[\"text\",\"Learn More\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"comment\",\" Three \"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"three\"],[\"static-attr\",\"class\",\"wrapper post bg-img\"],[\"static-attr\",\"data-bg\",\"banner4.jpg\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inner\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"box\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Media\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"02.16.2017\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"align\",\"center\"],[\"static-attr\",\"style\",\"position:relative;height:0;padding-bottom:75.0%;padding-left:75px;padding-right:75px\"],[\"flush-element\"],[\"open-element\",\"iframe\",[]],[\"static-attr\",\"src\",\"https://www.youtube.com/embed/5kSG_NCFHcI?ecver=2\"],[\"static-attr\",\"width\",\"400\"],[\"static-attr\",\"height\",\"300\"],[\"static-attr\",\"frameborder\",\"0\"],[\"static-attr\",\"style\",\"position:absolute;width:85%;height:85%;left:7.5%\"],[\"static-attr\",\"allowfullscreen\",\"\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"footer\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/aboutus-aleluya\"],[\"static-attr\",\"class\",\"button alt\"],[\"flush-element\"],[\"text\",\"Learn More\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#four\"],[\"static-attr\",\"class\",\"more\"],[\"flush-element\"],[\"text\",\"Learn More\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"comment\",\" Four \"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"four\"],[\"static-attr\",\"class\",\"wrapper post bg-img\"],[\"static-attr\",\"data-bg\",\"banner3.jpg\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inner\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"box\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Who is Involved?\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"2017-01-26\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"style\",\"text-align:left\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Woodly Baptiste:Co-Founder\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Rilphene Pierretil: Assistant Co-Founder\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Angeline Osias:Treasurer\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Chelove Pierretil:Administrator\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Youri Augustin:assistant Administrator\"],[\"close-element\"],[\"text\",\" \\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Wandy Baptiste: counsellor leader\"],[\"close-element\"],[\"text\",\" \\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Junior Buthon: counsellor.\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"footer\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/aboutus-aleluya\"],[\"static-attr\",\"class\",\"button alt\"],[\"flush-element\"],[\"text\",\"Learn More\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"name\",\"contact-us-aleluya\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"footer\",[]],[\"static-attr\",\"id\",\"footer\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inner\"],[\"flush-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Contact Ayap\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"action\",\"/mailer-aleluya.php\"],[\"static-attr\",\"method\",\"post\"],[\"flush-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"field half first\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"name\"],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"name\",\"name\"],[\"static-attr\",\"id\",\"name\"],[\"static-attr\",\"type\",\"text\"],[\"static-attr\",\"placeholder\",\"Name\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"field half\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"name\",\"email\"],[\"static-attr\",\"id\",\"email\"],[\"static-attr\",\"type\",\"email\"],[\"static-attr\",\"placeholder\",\"Email\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"field\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"message\"],[\"flush-element\"],[\"text\",\"Message\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"name\",\"message\"],[\"static-attr\",\"id\",\"message\"],[\"static-attr\",\"rows\",\"6\"],[\"static-attr\",\"placeholder\",\"Message\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"actions\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"value\",\"Send Message\"],[\"static-attr\",\"class\",\"button alt\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"icons\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://www.twitter.com/ayap_club\"],[\"static-attr\",\"class\",\"icon round fa-twitter\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Twitter\"],[\"close-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://www.facebook.com/groups/1027850727343804/\"],[\"static-attr\",\"class\",\"icon round fa-facebook\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Facebook\"],[\"close-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://www.instagram.com/ayap_club/\"],[\"static-attr\",\"class\",\"icon round fa-instagram\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Instagram\"],[\"close-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://www.youtube.com/channel/UC_2uez-iVqJJPUGgNgOtgIA\"],[\"static-attr\",\"class\",\"icon round fa-youtube\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"YouTube\"],[\"close-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"copyright\"],[\"flush-element\"],[\"text\",\"\\n      © 2017 AYAP.\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ayap/templates/index-aleluya.hbs" } });
});
define("ayap/templates/media-aleluya", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "eQFW005k", "block": "{\"statements\":[[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Media Page\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"More soon God willing, for now you may see our \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://www.youtube.com/channel/UC_2uez-iVqJJPUGgNgOtgIA\"],[\"flush-element\"],[\"text\",\"Youtube Channel\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"align\",\"center\"],[\"static-attr\",\"style\",\"position:relative;height:0;padding-bottom:75.0%;padding-left:75px;padding-right:75px\"],[\"flush-element\"],[\"open-element\",\"iframe\",[]],[\"static-attr\",\"src\",\"https://www.youtube.com/embed/5kSG_NCFHcI?ecver=2\"],[\"static-attr\",\"width\",\"400\"],[\"static-attr\",\"height\",\"300\"],[\"static-attr\",\"frameborder\",\"0\"],[\"static-attr\",\"style\",\"position:absolute;width:85%;height:85%;left:7.5%\"],[\"static-attr\",\"allowfullscreen\",\"\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"position:relative;height:0;padding-bottom:75.0%\"],[\"flush-element\"],[\"open-element\",\"iframe\",[]],[\"static-attr\",\"src\",\"https://www.youtube.com/embed/2yYzfdTUPTg?ecver=2\"],[\"static-attr\",\"width\",\"480\"],[\"static-attr\",\"height\",\"360\"],[\"static-attr\",\"frameborder\",\"0\"],[\"static-attr\",\"style\",\"position:absolute;width:100%;height:100%;left:0\"],[\"static-attr\",\"allowfullscreen\",\"\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"position:relative;height:0;padding-bottom:75.0%\"],[\"flush-element\"],[\"open-element\",\"iframe\",[]],[\"static-attr\",\"src\",\"https://www.youtube.com/embed/Je8Xj3ManPQ?ecver=2\"],[\"static-attr\",\"width\",\"480\"],[\"static-attr\",\"height\",\"360\"],[\"static-attr\",\"frameborder\",\"0\"],[\"static-attr\",\"style\",\"position:absolute;width:100%;height:100%;left:0\"],[\"static-attr\",\"allowfullscreen\",\"\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ayap/templates/media-aleluya.hbs" } });
});
define("ayap/templates/ourneeds-aleluya", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UP0dthkA", "block": "{\"statements\":[[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"post\"],[\"static-attr\",\"class\",\"wrapper\"],[\"static-attr\",\"data-bg\",\"banner2.jpg\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inner\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"box\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"What are our current needs and plans?\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"12.21.2016\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"content\"],[\"flush-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Needs\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"We need food first to feed kids and the elderly\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"clothes\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Hygiene Products: Soap, Toothpaste, Toothbrushes.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"A car to deliver the things to them, though we have an old motorcycle when we are going to deliver things.it can't take much and two of us can't go on it.\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Plans\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Our plan are to have our own local to make kids that we help live better in the way we want to teach them and for the elderly\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"every fourthnight we want to pass to put products in their homes like this it will make them live better.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"AYAP would like to have school to educate the kids where education is one of the most important thing in a country.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"Church to let the kids know how important God is in everyone's life\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"A clinic to take care of them when they are sick.\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"We have thirty kids to take care and eighteen elderly from sixteen to X....\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"We are currently raising funds through \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://www.gofundme.com/assistance-for-titanyenhaiti-kids\"],[\"flush-element\"],[\"text\",\"our Gofundme fundraiser\"],[\"close-element\"],[\"text\",\" and plan to work with a certified 503c ministry such as \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://thecrosslovesyou.org\"],[\"flush-element\"],[\"text\",\"The Cross Loves you\"],[\"close-element\"],[\"text\",\" which is working on this God willing and if we live in Jesus name. \"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"footer\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/ourneeds-aleluya\"],[\"static-attr\",\"class\",\"button alt\"],[\"flush-element\"],[\"text\",\"Learn More\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ayap/templates/ourneeds-aleluya.hbs" } });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ayap/config/environment', ['ember'], function(Ember) {
  var prefix = 'ayap';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ayap/app")["default"].create({"name":"ayap","version":"0.0.0+8434a1be"});
}

/* jshint ignore:end */
//# sourceMappingURL=ayap.map
