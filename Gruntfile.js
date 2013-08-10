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

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public',
          keepalive: true
        }
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        background: true
      },
      continuous: {
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
        tasks: ['deploy', 'karma:unit:run']
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
  grunt.registerTask('test', ['deploy', 'karma:continuous']);

  return grunt.registerTask('default', ['deploy', 'karma:unit', 'watch']);
}
