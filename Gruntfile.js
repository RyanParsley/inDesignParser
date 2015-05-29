module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      all: {
        files: ['copy/**/*.html', 'sass/**/*.scss', '**/*.hbs', 'src/**/*.html'],
        tasks: ['default'],
        options: {
          livereload: true,
          spawn: false,
          atBegin: true
        },
      }
    },
    shell: {
      options: {
        stderr: false
      },
      parse: {
        command: 'node copy/indesignToHTML.js'
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'images',
          src: ['**'],
          dest: 'dist/images'
        }],
      },
    },
    imagemin: {                          // Task
      all: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'images',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/images'                  // Destination path prefix
        }]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/style.css': 'sass/style.scss'
        }
      }
    },
    hbs:
      {
      all:{
        options: {
          layout: 'src/default.hbs',
          partials:
            {
            'header': 'src/partials/header.html',
            'aside': 'copy/fragments/about-sidebar.html'
          }
        },
        files:
          {
          'dist/index.html': {
            source: 'copy/fragments/index.html',
            context: { aside: false }
          },
          'dist/about.html':
            {
            source: 'copy/fragments/about.html',
            context: { aside: true }
          },
          'dist/pricing.html':
            {
            source: 'copy/fragments/pricing.html',
            context: { aside: true }
          }
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['shell:parse', 'sass', 'copy', 'hbs']);

};
