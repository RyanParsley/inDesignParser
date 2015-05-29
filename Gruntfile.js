module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['copy/**/*.html'],
        tasks: ['default'],
        options: {
          options: {
            reload: true
          },
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
        command: 'node indesignToHTML.js'
      }
    },
    hbs:
      {
      all:
        {
        options:
          {
          layout: 'src/default.hbs',
          partials:
            {
            'header': 'src/partials/header.html',
            'aside': 'copy/fragments/about-sidebar.html'
          }
        },
        files:
          {
          'index.html': {
            source: 'copy/fragments/index.html',
            context: { aside: false }
          },
          'about.html':
            {
            source: 'copy/fragments/about.html',
            context: { aside: true }
          },
          'pricing.html':
            {
            source: 'copy/fragments/pricing.html',
            context: { aside: true }
          }
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['shell:parse', 'hbs']);

};
