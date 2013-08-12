module.exports = function (grunt) {

  grunt.initConfig({

    clean: {
      main: 'public/**'
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['lib/**', 'font/**', 'favicon.*'], dest: 'public/'}
        ]
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'app/sass',
          cssDir: 'public/css',
          environment: 'production'
        }
      }
    },

    concat: {
      main: {
        src: ['app/js/index.js', 'app/js/**/*.js'],
        dest: 'public/js/app.js'
      }
    },

    karma: {
      unit: {
        background: true,
        configFile: 'karma.conf.js'
      },
      continuous: {
        singleRun: true,
        configFile: 'karma.conf.js'
      },
      e2e: {
        background: true,
        configFile: 'karma-e2e.conf.js'
      },
      continuous_e2e: {
        configFile: 'karma-e2e.conf.js',
        singleRun: true
      }
    },

    jade: {
      debug: {
        options: {
          pretty: true
        },
        files: {
          "public/index.html": "app/views/index.jade"
        }
      }
    },

    watch: {

      main: {
        files: ['package.json', 'Gruntfile.js', 'karma.conf.js', 'app/**', 'test/**'],
        tasks: ['deploy', 'karma:unit:run', 'karma:e2e:run']
      }

    },

    execute: {
      target: {
        src: ['server.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('server', ['execute']);

  grunt.registerTask('deploy', ['clean', 'copy', 'concat', 'compass', 'jade']);

  grunt.registerTask('test-unit', ['deploy', 'karma:continuous']);
  grunt.registerTask('test-e2e', ['deploy', 'karma:continuous_e2e']);
  grunt.registerTask('test', ['deploy', 'test-unit', 'test-e2e']);

  return grunt.registerTask('default', ['deploy', 'karma:unit', 'karma:e2e', 'watch']);
}
