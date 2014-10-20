// Generated by CoffeeScript 1.8.0
(function() {
  var LIVERELOAD_PORT, lrSnippet;

  LIVERELOAD_PORT = 35729;

  lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
  });

  module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      watch: {
        coffee: {
          files: ['src/*.coffee', '*.coffee'],
          tasks: ['coffee']
        },
        livereload: {
          options: {
            livereload: LIVERELOAD_PORT
          },
          files: ['*.html', 'lib/*.js', 'lib/*.css']
        }
      },
      open: {
        dev: {
          path: 'http://localhost:1337',
          options: {
            openOn: 'connect.livereload.listening'
          }
        }
      },
      coffee: {
        glob_to_multiple: {
          expand: true,
          cwd: 'src',
          src: ['*.coffee'],
          dest: 'lib',
          ext: '.js'
        }
      },
      coffeelint: {
        options: {
          no_empty_param_list: {
            level: 'error'
          },
          max_line_length: {
            level: 'ignore'
          }
        },
        src: ['src/*.coffee'],
        test: ['spec/*.coffee'],
        gruntfile: ['Gruntfile.coffee']
      },
      connect: {
        livereload: {
          options: {
            port: 1337,
            hostname: 'localhost',
            livereload: LIVERELOAD_PORT,
            middleware: function(connect) {
              connect["static"].mime.define({
                'image/svg+xml': ['svg'],
                'application/x-font-ttf': ['ttf'],
                'application/x-font-opentype': ['otf'],
                'application/x-font-woff': ['woff'],
                'application/vnd.ms-fontobject': ['eof'],
                'text/coffeescript': ['coffee']
              });
              return [lrSnippet, connect["static"](require('path').resolve(__dirname))];
            }
          }
        }
      }
    });
    grunt.registerTask('clean', function() {
      var rm;
      rm = function(pathToDelete) {
        if (grunt.file.exists(pathToDelete)) {
          return grunt.file["delete"](pathToDelete);
        }
      };
      return rm('lib');
    });
    grunt.registerTask('lint', ['coffeelint']);
    grunt.registerTask('start', ['default', 'open:dev', 'connect:livereload', 'watch']);
    return grunt.registerTask('default', ['coffee', 'lint']);
  };

}).call(this);
