'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'index.html': [
               'js/angular.js',
               'js/**/{angular.**,angular-**,*}.js',
               '{app,router}.js',
               '{components,controller}/**/!(*.spec|*.mock).js'
            ],
        }
      },
    },
    watch: {
      injectJS: {
            files: [
              '{controller,components,js}/**/!(*.spec|*.mock).js'
            ],
            tasks: ['injector:scripts']
          },
    }
  })

  //载入插件

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-injector');

  //注册任务

  grunt.registerTask('default', ['watch']);
}
