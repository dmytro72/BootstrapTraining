'use strict';
module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing builds times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });
  // Define the configuration for all the tasks
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          "css/styles.css": "css/styles.scss"
        }
      }
    },
    copy: {
      html: {
        files: [{
          // for html
          expand: true,
          dot: true,
          cwd: "./",
          src: ["*.html"],
          dest: 'dist'
        }]
      },
      font: {
        files: [{
          // for font-awesome
          expand: true,
          dot: true,
          cwd: "node_modules/font-awesome",
          src: ["ronts/*.*"],
          dest: 'dist'
        }]
      }
    },
    clean: {
      build: {
        src: ["dist/"]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: "./",
          src: ["img/*.(png,jpg,gif)"],
          dest: "dist/"
        }]
      }
    },
    useminPrepare: {
      foo: {
        dest: "dist",
        src: ["concatus.html", "aboutus.html", "index.html"]
      },
      options: {
        flow: {
          steps: {
            css: ['cssmin'],
            js: ['uglify']
          },
          post: {
            css: [{
              name: 'cssmin',
              createConfig: function (context, block) {
                var generated = context.options.generated;
                generated.options = {
                  keepSpecialComments: 0, rebase: false
                };
              }
            }]
          }
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {}
    },
    uglify: {
      // dist configuration is provied by useminPrepare
      dist: {}
    },
    cssmin: {
      dist: {}
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
      release: {
        // filerev:release hashes(md5) assets (images, js and css)
        // in dist directiory
        files: [{
          src: [
            "dist/js/*.js",
            "dist/css/*.css",
          ]
        }]
      }
    },
    usemin: {
      html: ["dist/contactus.html", "dist/aboutus.html", "dist/index.html"],
      options: {
        assetsDirs: ["dist", "dist/css", "dist/js"]
      }
    },
    watch: {
      files: "css/*.scss",
      tasks: ['sass']
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            "css/*.css",
            "*.html",
            "js/*.js"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./"
          }
        }
      }
    }
  });

  grunt.registerTask('css', ['sass']);
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'imagemin',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ])
};