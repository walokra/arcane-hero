'use strict';

var _ = require('lodash'),
    Heroku = require('heroku-client'),
	Q = require('q');

module.exports = {
	getAppInfo: function (herokuApiKey, herokuApp, callback) {
		var deferred = Q.defer();

		var heroku;
        if(!herokuApiKey) {
			deferred.reject('Heroku API key missing');
        } else if(!herokuApp) {
			deferred.reject('Heroku app not specified');
        } else {
            heroku = new Heroku({ token: herokuApiKey });
            var app = heroku.apps(herokuApp);
            app.info(function(err, info) {
                if (err) {
					deferred.reject(err);
                }
				deferred.resolve(info);
            });
        }

		// if passed a callback nodeify will register it.
		// callback is an optional parameter.
		deferred.promise.nodeify(callback);
		return deferred.promise;
    },

    getRelease: function (herokuApiKey, herokuApp, callback) {
		var deferred = Q.defer();

		var heroku;
        if(!herokuApiKey) {
            deferred.reject('Heroku API key missing');
        } else if(!herokuApp) {
            deferred.reject('Heroku app not specified');
        } else {
            heroku = new Heroku({ token: herokuApiKey });
            var app = heroku.apps(herokuApp);
            app.info(function(err, info) {
                if (err) {
                    deferred.reject(err);
                }
				app.releases().list( function(err, releases) {
	    			if(err) {
	    				deferred.reject(err);
	    			} else {
	    				// var release = _.chain(releases)
	    				//  .filter(function(release) { return release.description.indexOf('Deploy') === 0; })
	    				//  .sortBy('version')
	    				//  .last()
	    				//  .value();

						deferred.resolve(releases);
	    			}
	    		});
            });
        }

		// if passed a callback nodeify will register it.
		// callback is an optional parameter.
		deferred.promise.nodeify(callback);
		return deferred.promise;
    },
};
