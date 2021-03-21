module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Aquí creamos las tareas

    // the plugin
    concat: { 
      // this is a task for css files
      css: { 
        // defining the list of files, it supports glob (this may change according to your file structure)
        src: [ "styles/*.css" ],
        // defines the build path
        dest: "css/style.bundled.css" 
      }
    },

    sonarRunner: {
      analysis: {
        options: {
          debug: true,
          separator: '\n',
          dryRun: false,
          sonar: {
            host: {
              url: 'http://localhost:9000'
            },
            jdbc: {
              url: 'jdbc:mysql://localhost:3306/sonar',
              username: 'sonar',
              password: 'sonar'
            },
            projectKey: 'sonar:grunt-sonar-runner:0.1.0',
            projectName: 'Grunt Sonar Runner',
            projectVersion: '0.10',
            sources: ['test'].join(','),
            language: 'js',
            sourceEncoding: 'UTF-8'
          }
        }
      }
    },
    clean: {
      build: ['css/*.css']
    }
  });

  // log something
  grunt.log.write('Cargamos los plugins de grunt!!\n');

  // Cargamos los plugins de grunt
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-watch');  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-sonar-runner');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // way to register task
  grunt.registerTask("clean", "Cleaning", () => {
    console.log("Starting the cleaning task");
  });

  grunt.registerTask("begin", "Greeting The Developer", () => {
    console.log("Starting the task runner");
  });

  grunt.registerTask("end", "Goodbye The Developer", () => {
    console.log("Ending the task runner");
  });

  // way to register task to run all other pre register tasks and which are listed as the second parameter
  //grunt.registerTask("all", ["begin", "end"]);
  grunt.registerTask("default", ["begin","clean","concat:css","end"]);
  grunt.registerTask("all", ["begin","clean","concat:css","end"]);

};